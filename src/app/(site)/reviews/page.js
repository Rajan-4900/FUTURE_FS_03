import TestimonialCarousel from "@/components/reviews/TestimonialCarousel";

export default function ReviewsPage() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">Member Feedback</span>
        <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white mb-12">What EVRE Drivers Say</h1>
        <TestimonialCarousel />
      </div>
    </section>
  );
}
