import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRobot,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar";
import Footer from "../Home/sections/Footer";

const CONTACT_ITEMS = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "support@pawconnect.in",
    href: "mailto:support@pawconnect.in",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Location",
    value: "Coimbatore, Tamil Nadu, India",
    href: null,
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FaClock,
    title: "Response Time",
    value: "Usually within 24 hours",
    href: null,
    color: "bg-purple-50 text-purple-600",
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Adoption Question",
  "Report a Listing",
  "Technical Issue",
  "AI Feature Feedback",
  "Partnership",
  "Other",
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate network delay — form is demo only
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen">

        {/* ── Hero Banner ────────────────────────────────── */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
              <FaEnvelope />
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Contact Us
            </h1>
            <p className="text-orange-100 text-lg max-w-xl mx-auto">
              Questions about adoption, listings, or our AI features? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* ── AI Notice Banner ──────────────────────────── */}
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-blue-700">
            <FaRobot className="flex-shrink-0" />
            <span>
              <strong>Tip:</strong> For instant answers about pet care, try our{" "}
              <a href="/ai" className="font-semibold underline">AI Assistant</a> — it's available 24/7.
            </span>
          </div>
        </div>

        {/* ── Main Content ──────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left — Contact Info */}
            <div className="lg:col-span-1 space-y-5">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Let's Connect</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, title, value, href, color }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="text-sm" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{title}</p>
                      {href ? (
                        <a href={href} className="text-gray-800 text-sm font-medium hover:text-orange-500 transition">
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Demo disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-700 flex items-start gap-2">
                <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Demo Notice:</strong> The contact form is for demonstration purposes.
                  Messages are not currently delivered to a live inbox.
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FaCheckCircle className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                    Thank you, <strong>{form.name}</strong>. We'll review your message and get back to you
                    at <strong>{form.email}</strong> as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "General Enquiry", message: "" }); }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rahul Kumar"
                        className={`form-input ${errors.name ? "border-red-400 focus:border-red-500" : ""}`}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`form-input ${errors.email ? "border-red-400 focus:border-red-500" : ""}`}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      className={`form-textarea ${errors.message ? "border-red-400 focus:border-red-500" : ""}`}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                    <p className="text-xs text-gray-400 mt-1">{form.message.length} characters</p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;