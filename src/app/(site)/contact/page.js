import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#34D399] mb-3 block">Get In Touch</span>
              <h1 className="font-outfit text-3xl sm:text-4xl font-bold text-white">How Can We Help?</h1>
              <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                Have questions about custom commercial fleet programs, becoming a charging host partner, or user support? Send our customer team an enquiry.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-[#34D399] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Corporate Enquiries</h2>
                  <p className="text-xs text-slate-400 mt-1">partnerships@evrehub.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-[#34D399] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Urgent Station Support</h2>
                  <p className="text-xs text-slate-400 mt-1">1-800-EVRE-HELP (24/7 Hotline)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-[#34D399] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Headquarters Office</h2>
                  <p className="text-xs text-slate-400 mt-1">400 Howard St, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="rounded-2xl border border-[#2E3A4E] bg-[#172033]/40 p-8 shadow-xl backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
