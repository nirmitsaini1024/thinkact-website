"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

type Tier = "FREE" | "SILVER" | "GOLD" | "PLATINUM" | "ENTERPRISE";

const TIERS: { value: Tier; label: string; blurb: string }[] = [
  { value: "FREE", label: "Free", blurb: "$0 — 250 pages & 100 chats / mo" },
  { value: "SILVER", label: "Silver", blurb: "$49.99 — 2,500 pages & 1,000 chats / mo" },
  { value: "GOLD", label: "Gold", blurb: "$89.99 — 5,000 pages & 2,500 chats / mo" },
  { value: "PLATINUM", label: "Platinum", blurb: "$125.99 — 10,000 pages & 4,000 chats / mo" },
  { value: "ENTERPRISE", label: "Enterprise", blurb: "$175.99 — 25,000 pages & 10,000 chats / mo" },
];

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

function normalizeTier(raw: string | null): Tier {
  const upper = (raw || "").toUpperCase();
  const known = TIERS.find((t) => t.value === upper);
  if (known) return known.value;
  // Map marketing names from the pricing page.
  if (upper === "BASIC" || upper === "STARTER") return "FREE";
  if (upper === "PREMIUM" || upper === "PROFESSIONAL") return "GOLD";
  return "FREE";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function SignupForm() {
  const searchParams = useSearchParams();
  const initialTier = useMemo(
    () => normalizeTier(searchParams.get("tier")),
    [searchParams],
  );

  const [form, setForm] = useState({
    organizationName: "",
    domain: "",
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminPhone: "",
    website: "",
    nmlsr: "",
    adminNmls: "",
    requestedTier: initialTier as Tier,
  });
  const [domainTouched, setDomainTouched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    email: string;
    domain: string;
    pendingUpgradeTier: string | null;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(
    () => !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    setForm((prev) => ({ ...prev, requestedTier: initialTier }));
  }, [initialTier]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const previewDomain =
    (domainTouched ? form.domain : slugify(form.organizationName)) || "your-org";

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.organizationName.trim()) next.organizationName = "Organization name is required";
    if (!form.adminFirstName.trim()) next.adminFirstName = "First name is required";
    if (!form.adminLastName.trim()) next.adminLastName = "Last name is required";
    if (!form.adminEmail.trim()) next.adminEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.adminEmail))
      next.adminEmail = "Enter a valid email address";
    if (!form.nmlsr.trim()) next.nmlsr = "Organization NMLS ID is required";
    if (!form.adminNmls.trim()) next.adminNmls = "Admin NMLS number is required";
    if (form.domain && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.domain))
      next.domain = "Use lowercase letters, numbers and hyphens only";
    if (form.website && !/^https?:\/\/.+/i.test(form.website))
      next.website = "Website must start with http:// or https://";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let recaptchaValue: string | null = null;
    if (recaptchaSiteKey) {
      if (!recaptchaReady || !recaptchaRef.current) {
        setServerError(
          "reCAPTCHA is still loading. Please wait a moment and try again.",
        );
        return;
      }
      recaptchaValue = await recaptchaRef.current.executeAsync();
      if (!recaptchaValue) {
        setServerError("reCAPTCHA verification failed. Please try again.");
        return;
      }
    }

    setSubmitting(true);
    setServerError(null);
    try {
      const payload = {
        organizationName: form.organizationName.trim(),
        domain: (domainTouched ? form.domain : slugify(form.organizationName)) || undefined,
        adminFirstName: form.adminFirstName.trim(),
        adminLastName: form.adminLastName.trim(),
        adminEmail: form.adminEmail.trim().toLowerCase(),
        adminPhone: form.adminPhone.trim() || undefined,
        website: form.website.trim() || undefined,
        nmlsr: form.nmlsr.trim(),
        adminNmls: form.adminNmls.trim(),
        requestedTier: form.requestedTier,
        recaptchaToken: recaptchaValue ?? undefined,
      };
      const res = await fetch(`${API_BASE}/api/onboard-orgs/self-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.status === false) {
        throw new Error(data?.message || "Signup failed. Please try again.");
      }
      setSuccess({
        email: data?.data?.adminEmail || payload.adminEmail,
        domain: data?.data?.domain || previewDomain,
        pendingUpgradeTier: data?.data?.pendingUpgradeTier ?? null,
      });
      recaptchaRef.current?.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Signup failed");
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 border border-gray-100 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">You&apos;re all set!</h2>
        <p className="text-gray-600 mb-2">
          Your organization workspace{" "}
          <span className="font-semibold text-gray-900">{success.domain}</span> has been
          created on the <span className="font-semibold">Free</span> plan.
        </p>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a link to{" "}
          <span className="font-semibold text-gray-900">{success.email}</span> to set your
          password. Check your inbox (and spam folder) to finish signing in.
        </p>
        {success.pendingUpgradeTier ? (
          <p className="text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
            You selected the {success.pendingUpgradeTier} plan. After signing in, head to
            the <strong>Plans</strong> page in your dashboard to complete the upgrade.
          </p>
        ) : null}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-medium transition hover:from-blue-700 hover:to-blue-800"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form
      className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Organization details</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us about your company.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organization name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.organizationName}
          onChange={(e) => update("organizationName", e.target.value)}
          placeholder="Enter your organization's legal name"
          className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.organizationName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.organizationName && (
          <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Workspace address
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={domainTouched ? form.domain : slugify(form.organizationName)}
            onChange={(e) => {
              setDomainTouched(true);
              update("domain", e.target.value.toLowerCase());
            }}
            placeholder="your-organization"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.domain ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Your team will sign in at{" "}
          <span className="font-medium text-gray-700">{previewDomain}</span>. Leave as-is to
          use the suggestion.
        </p>
        {errors.domain && <p className="mt-1 text-sm text-red-600">{errors.domain}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization NMLS ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nmlsr}
            onChange={(e) => update("nmlsr", e.target.value)}
            placeholder="e.g. 1234567"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.nmlsr ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nmlsr && <p className="mt-1 text-sm text-red-600">{errors.nmlsr}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://www.yourcompany.com"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.website ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
        </div>
      </div>

      <div className="border-b border-t border-gray-200 py-4">
        <h2 className="text-xl font-bold text-gray-900">Admin account</h2>
        <p className="text-sm text-gray-500 mt-1">
          This person becomes the Organization Admin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.adminFirstName}
            onChange={(e) => update("adminFirstName", e.target.value)}
            placeholder="First name"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.adminFirstName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.adminFirstName && (
            <p className="mt-1 text-sm text-red-600">{errors.adminFirstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.adminLastName}
            onChange={(e) => update("adminLastName", e.target.value)}
            placeholder="Last name"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.adminLastName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.adminLastName && (
            <p className="mt-1 text-sm text-red-600">{errors.adminLastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.adminEmail}
            onChange={(e) => update("adminEmail", e.target.value)}
            placeholder="you@yourcompany.com"
            className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
              errors.adminEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.adminEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="tel"
            value={form.adminPhone}
            onChange={(e) => update("adminPhone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin NMLS number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.adminNmls}
          onChange={(e) => update("adminNmls", e.target.value)}
          placeholder="e.g. 7654321"
          className={`w-full px-4 py-3 border rounded-lg outline-none transition focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
            errors.adminNmls ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.adminNmls && (
          <p className="mt-1 text-sm text-red-600">{errors.adminNmls}</p>
        )}
      </div>

      {form.requestedTier !== "FREE" ? (
        <p className="text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-lg p-3">
          You selected the{" "}
          <span className="font-semibold">
            {TIERS.find((t) => t.value === form.requestedTier)?.label}
          </span>{" "}
          plan. You&apos;ll start on the Free plan — after signing in, complete the
          upgrade from your dashboard&apos;s Plans page.
        </p>
      ) : null}

      {serverError ? (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
          {serverError}
        </div>
      ) : null}

      {recaptchaSiteKey ? (
        <div className="flex flex-col items-center gap-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            badge="inline"
            sitekey={recaptchaSiteKey}
            asyncScriptOnLoad={() => setRecaptchaReady(true)}
          />
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting || (!!recaptchaSiteKey && !recaptchaReady)}
        className={`w-full py-3 px-6 text-white font-medium rounded-lg transition focus:outline-none focus:ring-4 focus:ring-blue-300 inline-flex items-center justify-center gap-2 ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Creating your workspace...
          </>
        ) : (
          "Create my organization"
        )}
      </button>

      <p className="text-sm text-gray-500 text-center">
        By signing up you agree to our{" "}
        <a href="/terms-conditions" className="text-blue-600 hover:underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center my-12 pt-8 md:pt-16">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Get started free
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Create your organization
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full" />
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Spin up your TAMI workspace in minutes. Start on the Free plan — no credit card
          required.
        </p>
      </div>

      <section className="mb-16">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </section>
    </div>
  );
}
