import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      const response = await fetch(formElement.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 fade-up">
          Get in Touch
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 fade-up">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <a href="mailto:rajeshkadiyalaaa@gmail.com" className="hover:text-blue-400 transition-colors">
                  rajeshkadiyalaaa@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-500" />
                <a href="tel:+918688053186" className="hover:text-blue-400 transition-colors">
                  +91 8688053186
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-blue-500" />
                <span>Vijayawada, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
          
          <form 
            className="space-y-6" 
            onSubmit={handleSubmit}
            action="https://formsubmit.co/rajeshkadiyalaaa@gmail.com" 
            method="POST"
          >
            {/* FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New contact from Portfolio Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={window.location.href} />
            
            {submitStatus === 'success' && (
              <div className="bg-green-800/30 text-green-300 p-4 rounded-lg flex items-center gap-2 mb-4">
                <CheckCircle size={20} />
                <span>Your message has been sent! I'll get back to you soon.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-800/30 text-red-300 p-4 rounded-lg flex items-center gap-2 mb-4">
                <AlertCircle size={20} />
                <span>There was an error sending your message. Please try again.</span>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="your@email.com"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your message..."
                required
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={submitting}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 