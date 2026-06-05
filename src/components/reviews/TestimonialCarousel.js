"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";

export default function TestimonialCarousel() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const current = TESTIMONIALS[activeTestimonial];

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative rounded-2xl border border-[#2E3A4E] bg-[#172033]/40 p-8 sm:p-12 backdrop-blur-md text-left min-h-[300px] flex flex-col justify-between">
        <div className="absolute top-4 right-6 text-slate-600 font-serif text-8xl pointer-events-none select-none">
          &ldquo;
        </div>

        <div className="mb-6">
          <div className="flex gap-1 text-amber-400 mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="h-4.5 w-4.5 fill-current" />
            ))}
          </div>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic">
            &ldquo;{current.quote}&rdquo;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[#2E3A4E] pt-6 gap-4">
          <div className="flex items-center gap-4">
            <img
              src={current.avatar}
              alt={current.name}
              className="h-12 w-12 rounded-full border border-[#2E3A4E]"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">{current.name}</h2>
              <p className="text-xs text-slate-400">{current.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-bold text-[#34D399] bg-[#34D399]/10 px-3 py-1 rounded-full">
              {current.ecoBadge}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2E3A4E] hover:border-[#34D399] hover:bg-[#172033] text-slate-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2E3A4E] hover:border-[#34D399] hover:bg-[#172033] text-slate-300 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeTestimonial ? "w-6 bg-[#34D399]" : "w-2 bg-[#2E3A4E]"
            }`}
            aria-label={`View testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </>
  );
}
