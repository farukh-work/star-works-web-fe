"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// The toast container previously mounted globally in the root layout, shipping
// react-toastify + its CSS on every route. Toasts only fire from this form, so
// we lazily load the container here (client-only) — it's the only place a toast
// can appear, and it stays out of every other page's bundle.
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false },
);
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  initFieldAnimation,
  initFieldMagnetic,
  animateFieldError,
  animateFieldSuccess,
  clearFieldValidation,
} from "@/animations/contactFormAnimation";

// ==========================================
// WARNING ICON
// ==========================================
const WarningIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ==========================================
// PREMIUM CONTACT FIELD COMPONENT
// ==========================================
const ContactField = ({
  type = "text",
  name,
  placeholder,
  required = false,
  rows,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const borderLineRef = useRef(null);
  const errorBorderLineRef = useRef(null);
  const tooltipRef = useRef(null);
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const prevErrorRef = useRef("");

  const isTextArea = type === "textarea";

  // Label Floating & Border Line Animation
  useGSAP(
    () => {
      const cleanup = initFieldAnimation(
        wrapperRef.current,
        inputRef.current,
        labelRef.current,
        borderLineRef.current,
        isTextArea,
        focused,
        value
      );
      return cleanup;
    },
    { dependencies: [focused, value], scope: wrapperRef }
  );

  // Magnetic Input Hover Effect (Subtle, Desktop only)
  useGSAP(
    () => {
      const cleanup = initFieldMagnetic(wrapperRef.current, contentRef.current);
      return cleanup;
    },
    { scope: wrapperRef }
  );

  // Custom Validation GSAP Animations
  useGSAP(
    () => {
      if (error) {
        setErrorMsg(error);
        animateFieldError(
          wrapperRef.current,
          borderLineRef.current,
          errorBorderLineRef.current,
          tooltipRef.current
        );
      } else if (prevErrorRef.current) {
        // Run success green pulse animation if transitioning from error to valid
        animateFieldSuccess(
          wrapperRef.current,
          borderLineRef.current,
          errorBorderLineRef.current,
          tooltipRef.current,
          focused
        );
        const timer = setTimeout(() => setErrorMsg(""), 350);
        return () => clearTimeout(timer);
      } else {
        // Quiet validation clean/reset state
        clearFieldValidation(
          wrapperRef.current,
          borderLineRef.current,
          errorBorderLineRef.current,
          tooltipRef.current,
          focused
        );
      }
      prevErrorRef.current = error;
    },
    { dependencies: [error], scope: wrapperRef }
  );

  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div
      ref={wrapperRef}
      className="contact-field w-full relative py-2 will-change-transform"
    >
      <div ref={contentRef} className="w-full relative will-change-transform">
        {isTextArea ? (
          <textarea
            ref={inputRef}
            name={name}
            rows={rows || 5}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            required={required}
            placeholder=" "
            className="w-full pt-8 pb-2 px-3 sm:px-4 bg-transparent outline-none border-none text-white sm:text-2xl min-h-24 sm:min-h-34 resize-none transition-colors duration-300 placeholder-transparent z-10 relative"
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={handleBlur}
            required={required}
            placeholder=" "
            className="w-full h-16 sm:h-20 pt-8 pb-2 px-3 sm:px-4 bg-transparent autofill:bg-transparent outline-none border-none text-white sm:text-2xl transition-colors duration-300 placeholder-transparent z-10 relative"
          />
        )}

        <label
          ref={labelRef}
          className={`absolute left-3 sm:left-4 pointer-events-none z-20 text-antiflash font-switzer text-base sm:text-lg lg:text-xl select-none will-change-[transform,opacity] ${isTextArea ? "top-6" : "top-1/2 -translate-y-1/2"
            }`}
        >
          {placeholder}
        </label>

        {/* Custom luxury border lines */}
        <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
        <span
          ref={borderLineRef}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 will-change-transform z-10"
          style={{
            boxShadow:
              "0 0 10px rgba(38, 240, 119, 0.8), 0 0 2px rgba(38, 240, 119, 0.4)",
          }}
        ></span>

        {/* Error bottom line */}
        <span
          ref={errorBorderLineRef}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 will-change-transform z-10"
          style={{
            boxShadow:
              "0 0 10px rgba(255, 51, 102, 0.8), 0 0 2px rgba(255, 51, 102, 0.4)",
          }}
        ></span>

        {/* Custom luxury validation tooltip */}
        <div
          ref={tooltipRef}
          className="absolute right-3 sm:right-4 top-[calc(100%+6px)] bg-black/85 backdrop-blur-md border border-white/10 border-l-2 border-l-primary text-white text-xs sm:text-sm py-1.5 px-3 rounded-md flex items-center gap-2 pointer-events-none z-20 shadow-[0_8px_25px_rgba(0,0,0,0.6)] max-w-[calc(100%-24px)] md:max-w-md"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          <WarningIcon className="w-4 h-4 text-primary shrink-0 animate-pulse" />
          <span className="font-switzer font-medium tracking-wide text-white/90">
            {errorMsg}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PREMIUM LIQUID SUBMIT BUTTON COMPONENT
// ==========================================
const PremiumButton = ({ isLoading, isSuccess, type = "submit" }) => {
  return (
    <button
      disabled={isLoading || isSuccess}
      type={type}
      className="relative overflow-hidden w-full flex items-center justify-center border border-primary/40 rounded-full h-16 sm:h-20 mt-6.5 text-lg font-bold transition-all duration-300 bg-primary/5 text-primary hover:bg-primary hover:text-black hover:border-primary hover:shadow-[0_0_25px_rgba(38,240,119,0.5)] disabled:opacity-60 disabled:pointer-events-none"
    >
      {/* Button content */}
      <span
        className="relative z-10 flex items-center gap-2 text-inherit font-switzer uppercase tracking-widest text-base sm:text-lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            <span className="text-primary">Sending...</span>
          </div>
        ) : isSuccess ? (
          <span className="text-primary">Message Sent!</span>
        ) : (
          <>
            Get In Touch
            <svg
              className="w-5 h-5 ml-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </>
        )}
      </span>
    </button>
  );
};

// ==========================================
// CONTACT FORM CONTAINER
// ==========================================
const ContactForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    projectDetails: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    whatsapp: "",
    projectDetails: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    whatsapp: false,
    projectDetails: false,
  });

  const validateField = (name, value) => {
    if (name === "name") {
      if (!value.trim()) return "Please enter your name";
      return "";
    }
    if (name === "email") {
      if (!value.trim()) return "Please enter your email";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return "";
    }
    if (name === "whatsapp") {
      return "";
    }
    if (name === "projectDetails") {
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Run full validation check
    const newErrors = {
      name: validateField("name", formValues.name),
      email: validateField("email", formValues.email),
      whatsapp: validateField("whatsapp", formValues.whatsapp),
      projectDetails: validateField("projectDetails", formValues.projectDetails),
    };

    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    if (hasErrors) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        whatsapp: true,
        projectDetails: true,
      });

      // Focus the first invalid field for accessibility
      const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key] !== "");
      if (firstErrorField) {
        const inputElement = e.target.querySelector(`[name="${firstErrorField}"]`);
        if (inputElement) {
          inputElement.focus();
        }
      }
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("whatsapp", formValues.whatsapp);
    formData.append("projectDetails", formValues.projectDetails);
    if (pdfFile) {
      formData.append("pdfFile", pdfFile);
    }

    fetch("/api/send-email", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to send the message.");
        }
        setLoading(false);
        setSuccess(true);
        toast.success("Message sent successfully!");
        setPdfFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTimeout(() => setSuccess(false), 3500);
        setFormValues({
          name: "",
          email: "",
          whatsapp: "",
          projectDetails: "",
        });
        setErrors({
          name: "",
          email: "",
          whatsapp: "",
          projectDetails: "",
        });
        setTouched({
          name: false,
          email: false,
          whatsapp: false,
          projectDetails: false,
        });
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        setLoading(false);
        toast.error(err.message || "Failed to send the message.");
      });
  };

  return (
    <>
      <div className="max-w-198 w-full mx-auto">
        <form onSubmit={sendEmail} noValidate className="space-y-3 sm:space-y-6 pb-10 xl:pb-16">
          <div className="w-full sm:flex sm:space-x-5">
            <div className="w-full mb-3 sm:mb-0">
              <ContactField
                placeholder="Enter your name"
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                required
              />
            </div>
            <div className="w-full">
              <ContactField
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                required
              />
            </div>
          </div>
          <div>
            <ContactField
              placeholder="Enter your WhatsApp number"
              type="text"
              name="whatsapp"
              value={formValues.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.whatsapp}
            />
          </div>
          <div>
            <ContactField
              placeholder="Tell us about your project"
              type="textarea"
              name="projectDetails"
              value={formValues.projectDetails}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.projectDetails}
              rows={5}
            />
          </div>

          {/* PDF Upload */}
          <div className="contact-field w-full relative py-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    toast.error("File size must be under 10MB");
                    return;
                  }
                  setPdfFile(file);
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-dashed border-white/20 hover:border-primary/50 bg-white/2 hover:bg-primary/5 transition-all duration-300 w-full"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </span>
              <span className="flex flex-col items-start">
                <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
                  {pdfFile ? pdfFile.name : "Upload project brief (PDF)"}
                </span>
                <span className="text-white/30 text-xs">
                  {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB` : "Max 10MB"}
                </span>
              </span>
              {pdfFile && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPdfFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="ml-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          </div>
          <PremiumButton isLoading={isLoading} isSuccess={isSuccess} />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
