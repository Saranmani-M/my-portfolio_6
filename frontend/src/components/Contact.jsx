import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { PROFILE, SOCIALS } from "../lib/data";

// EmailJS placeholder credentials — user will replace these later.
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const isPlaceholder =
        EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
        EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY";

      if (isPlaceholder) {
        await new Promise((r) => setTimeout(r, 900));
        toast.success(
          "Message captured. Add EmailJS credentials to enable real delivery.",
        );
      } else {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
        toast.success("Message sent. I'll be in touch shortly.");
      }
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Couldn't send right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-20 md:py-28 px-6 md:px-12"
    >
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0D0D0D",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
          },
        }}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10 md:gap-16">
        {/* Left header */}
        <div className="col-span-12 md:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45 mb-6">
              (Get in touch)
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-white leading-[0.95] text-balance">
              Let&rsquo;s <em className="italic">build</em>
              <br /> something thoughtful.
            </h2>
            <p className="mt-8 text-[15px] leading-relaxed text-white/60 max-w-md">
              I&rsquo;m open to internships, junior roles and quiet
              collaborations in cloud, storage and security. The fastest way to
              reach me is the form — I read every message.
            </p>

            <div className="mt-12 space-y-5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-4 text-white/85 hover:text-white transition-colors group"
                data-testid="contact-email"
              >
                <span className="w-9 h-9 rounded-full border border-white/15 grid place-items-center">
                  <Mail size={14} />
                </span>
                <span className="link-underline text-[15px]">
                  {PROFILE.email}
                </span>
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/85 hover:text-white transition-colors"
                data-testid="contact-linkedin"
              >
                <span className="w-9 h-9 rounded-full border border-white/15 grid place-items-center">
                  <Linkedin size={14} />
                </span>
                <span className="link-underline text-[15px]">
                  linkedin.com/in/saranmani-m
                </span>
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/85 hover:text-white transition-colors"
                data-testid="contact-github"
              >
                <span className="w-9 h-9 rounded-full border border-white/15 grid place-items-center">
                  <Github size={14} />
                </span>
                <span className="link-underline text-[15px]">
                  github.com/Saranmani-M
                </span>
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 text-white/85 hover:text-white transition-colors"
                data-testid="contact-phone"
              >
                <span className="w-9 h-9 rounded-full border border-white/15 grid place-items-center">
                  <Phone size={14} />
                </span>
                <span className="link-underline text-[15px]">
                  {PROFILE.phone}
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-7 relative rounded-3xl border border-white/10 bg-[#0D0D0D]/60 backdrop-blur-sm p-8 md:p-12"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Name"
              name="name"
              value={form.name}
              onChange={onChange}
              testId="input-name"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              testId="input-email"
            />
            <Field
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={onChange}
              testId="input-subject"
              full
            />
            <TextArea
              label="Message"
              name="message"
              value={form.message}
              onChange={onChange}
              testId="input-message"
            />
          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
            <p className="text-[12px] text-white/40 max-w-xs">
              Your message lands in my inbox — no marketing, no list, just a
              reply from me.
            </p>
            <button
              type="submit"
              disabled={loading}
              data-testid="submit-contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-[13px] tracking-wide hover:bg-white/90 transition-all disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send message"}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

const Field = ({ label, name, value, onChange, type = "text", full, testId }) => (
  <label className={`block ${full ? "md:col-span-2" : ""}`}>
    <span className="text-[10px] tracking-[0.28em] uppercase text-white/40">
      {label}
    </span>
    <input
      data-testid={testId}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-white/60 outline-none py-3 text-white placeholder-white/30 transition-colors text-[15px]"
    />
  </label>
);

const TextArea = ({ label, name, value, onChange, testId }) => (
  <label className="block md:col-span-2">
    <span className="text-[10px] tracking-[0.28em] uppercase text-white/40">
      {label}
    </span>
    <textarea
      data-testid={testId}
      name={name}
      value={value}
      onChange={onChange}
      rows={5}
      className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-white/60 outline-none py-3 text-white placeholder-white/30 transition-colors text-[15px] resize-none"
    />
  </label>
);
