import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="font-bold text-xl">
                  Think<span className="text-primary">Act</span>
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</Link>
                <Link href="/tami" className="text-sm font-medium text-foreground hover:text-primary transition-colors">TAMI</Link>
                <Link href="/tami/pricing" className="text-sm font-medium text-primary transition-colors">Pricing</Link>
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Platform <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Company <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/book-a-demo">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-b from-secondary/30 to-background py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-6">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Flexible Pricing
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
              Choose Your <span className="text-primary">Perfect Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transparent pricing designed to scale with your business. From startups to enterprises, TAMI adapts to your loan processing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 hover:border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Basic</h3>
                <p className="text-muted-foreground mb-6">Perfect for small lending teams getting started</p>
                
                <Button className="w-full mb-8" variant="outline">
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-2 border-primary shadow-xl hover:shadow-2xl transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1.5 shadow-lg">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Premium</h3>
                <p className="text-muted-foreground mb-6">For growing teams scaling operations</p>
                
                <Button className="w-full mb-8 bg-primary hover:bg-primary/90">
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover:border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-6">For large institutions with high volume</p>
                
                <Button className="w-full mb-8" variant="outline">
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">What happens if I exceed my monthly loan limit?</h4>
                  <p className="text-sm text-muted-foreground">You can easily upgrade to the next tier or purchase additional loan capacity at $10 per loan. We&apos;ll notify you when you&apos;re approaching your limit.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Is there a free trial available?</h4>
                  <p className="text-sm text-muted-foreground">Yes! All plans come with a 14-day free trial with full access to features. No credit card required to start.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Can I cancel anytime?</h4>
                  <p className="text-sm text-muted-foreground">Absolutely. There are no long-term contracts. You can cancel your subscription at any time, and you&apos;ll retain access until the end of your billing period.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Do you offer volume discounts?</h4>
                  <p className="text-sm text-muted-foreground">Yes! Enterprise customers processing over 500 loans/month receive custom pricing with significant volume discounts. Contact our sales team for details.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 via-white to-accent/5">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Mortgage Processing?</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start your free trial today and see how TAMI can accelerate your loan closings
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="text-base h-12 px-8">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="text-base h-12 px-8 border-2">
                    Schedule a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl">
              Think<span className="text-primary">Act</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/tami" className="text-muted-foreground hover:text-foreground transition-colors">TAMI</Link>
            <Link href="/tami/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Agentic Platform for Autonomous Workflows
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 ThinkAct. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
