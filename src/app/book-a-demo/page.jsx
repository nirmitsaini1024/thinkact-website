/** @format */
"use client";

import React, { useLayoutEffect, useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function BookADemo() {
  const [isRibbonClosed, setIsRibbonClosed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const recaptchaRef = useRef(null);

  useLayoutEffect(() => {
    const ribbonClosed = localStorage.getItem("ribbon") === "true";
    setIsRibbonClosed(ribbonClosed);
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    if (formData.phoneNumber && !/^\+?[0-9\s\-()]{8,20}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.preferredDate) {
      errors.preferredDate = 'Preferred date is required';
    }
    
    if (!formData.preferredTime) {
      errors.preferredTime = 'Preferred time is required';
    }

    // Validate that the preferred date is in the future
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to beginning of day
      
      if (selectedDate < today) {
        errors.preferredDate = 'Please select a future date';
      }
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Execute reCAPTCHA
    const recaptchaValue = await recaptchaRef.current.executeAsync();
    if (!recaptchaValue) {
      setSubmitStatus({
        type: 'error',
        message: 'reCAPTCHA verification failed. Please try again.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaValue
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your demo request has been scheduled successfully! We\'ll confirm the details shortly.'
        });
        // Reset form
        setFormData({
          fullName: '',
          companyName: '',
          phoneNumber: '',
          email: '',
          message: '',
          preferredDate: '',
          preferredTime: '',
          alternateDate: '',
          alternateTime: '',
        });
        // Reset reCAPTCHA
        recaptchaRef.current.reset();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to schedule your demo. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute of date inputs
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Page heading with gradient underline */}
        <div className="text-center my-12 pt-8 md:pt-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Book a Demo
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Schedule a personalized demo to see how our solution can help your business grow.
          </p>
        </div>

        <section className="my-10 max-w-3xl mx-auto">
          {/* Demo Booking Form */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="h-8 w-2 bg-blue-600 rounded mr-3"></div>
              Schedule Your Demo
            </h2>
            <p className="text-gray-600 mb-6">
              Please fill out the form below to schedule a demo. Our team will reach out to confirm your appointment.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                
                {/* Full Name */}
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                  )}
                </div>
                
                {/* Company Name */}
                <div className="mb-6">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  />
                </div>
                
                {/* Email and Phone in a row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                        formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Demo Scheduling Section */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Your Demo</h3>
                
                {/* Preferred Date and Time */}
                <div className="mb-6">
                  <h4 className="text-base font-medium text-gray-700 mb-3">Preferred Date & Time <span className="text-red-500">*</span></h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        min={today}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.preferredDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.preferredDate && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.preferredDate}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                          formErrors.preferredTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.preferredTime && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.preferredTime}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Please select your preferred date and time for the demo (in your local timezone).</p>
                </div>
                
                {/* Alternate Date and Time */}
                <div>
                  <h4 className="text-base font-medium text-gray-700 mb-3">Alternate Date & Time (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="alternateDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="alternateDate"
                        name="alternateDate"
                        min={today}
                        value={formData.alternateDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="alternateTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        id="alternateTime"
                        name="alternateTime"
                        value={formData.alternateTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">In case your preferred time doesn't work, please provide an alternative.</p>
                </div>
              </div>
              
              {/* Additional Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Specific requirements or questions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please let us know if you have any specific requirements, questions, or areas you'd like the demo to focus on."
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>
              </div>
              
              {/* Hidden reCAPTCHA */}
              {/* <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              /> */}
              
              {/* Status Message */}
              {submitStatus && (
                <div 
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white font-medium rounded-lg transition focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Demo'}
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting this form, you agree to our <a href="/terms-conditions" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}