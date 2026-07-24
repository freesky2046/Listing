"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const faqs = [
  {
    question: "How does the AI generate my Amazon listing?",
    answer:
      "Our AI analyzes the product details you provide — title, category, and description — and generates a complete listing optimized for Amazon's A9 ranking algorithm. It creates a keyword-rich title, five persuasive bullet points, a detailed product description, and backend search terms, all in under 60 seconds.",
  },
  {
    question: "Is the generated content optimized for Amazon SEO?",
    answer:
      "Yes. Every listing is built with Amazon's search algorithm in mind. The AI intelligently places high-volume keywords in the title, bullets, and backend search terms while keeping the copy natural and conversion-focused for human shoppers.",
  },
  {
    question: "Can I edit the generated listing before publishing?",
    answer:
      "Absolutely. The generated listing is yours to review, edit, and refine. You can tweak copy, swap keywords, or regenerate sections individually. Once you're satisfied, copy the content directly to Amazon Seller Central.",
  },
  {
    question: "Which Amazon marketplaces do you support?",
    answer:
      "We support all major Amazon marketplaces including US, UK, Canada, Germany, France, Italy, Spain, Japan, and Australia. Each marketplace gets locale-specific keyword optimization and culturally appropriate phrasing.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes. Our free plan includes 5 listing generations per month with full access to title, bullet points, description, and search terms generation. No credit card required to get started.",
  },
  {
    question: "How is this different from using ChatGPT or other AI tools?",
    answer:
      "ListGen is purpose-built for Amazon listings. Unlike general-purpose AI tools, it understands Amazon's specific formatting rules, character limits, keyword placement strategies, and what actually converts on the platform. It's trained on successful Amazon listings, not generic web content.",
  },
  {
    question: "Do you store my product data?",
    answer:
      "We process your product data to generate listings but never share it with third parties. You can delete your data at any time from your account settings. See our Privacy Policy for full details.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <div className="reveal-item text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
              Frequently asked{" "}
              <span className="text-primary">questions</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty]">
              Everything you need to know about ListGen.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal staggerDelay={80}>
          <div className="mt-12 divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="reveal-item py-1">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-200"
                  style={{ gridTemplateRows: openIndex === index ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
