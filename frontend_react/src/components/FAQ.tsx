
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Announce?",
      answer: "Announce is an independent platform for accessing government announcements, policies, and schemes. Making government communication accessible to all citizens with AI-powered simplification and multilingual support."
    },
    {
      question: "How often are announcements updated?",
      answer: "Government announcements are updated in real-time as soon as they are published by the respective ministries and departments. Our platform ensures you get the latest information within minutes of official publication."
    },
    {
      question: "Is Announce affiliated with the Government of India?",
      answer: "Announce is an independent platform and is not affiliated with the Government of India. We aggregate publicly available information for educational and informational purposes only."
    },
    {
      question: "In which languages are announcements available?",
      answer: "Announcements are available in 10+ regional languages including English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and Punjabi. The availability depends on the original announcement from the government source."
    },
    {
      question: "How can I filter announcements by specific criteria?",
      answer: "You can filter announcements by category, ministry, target audience, language, location, and date range. Use the comprehensive filter options in the announcements section to find exactly what you're looking for."
    },
    {
      question: "Are all government announcements available on this platform?",
      answer: "We aggregate announcements from major government sources including Press Information Bureau (PIB) and various ministry websites. While we strive for comprehensive coverage, some specialized announcements may be available directly on ministry websites."
    },
    {
      question: "How do I verify the authenticity of announcements?",
      answer: "All announcements include direct links to the original government sources. We recommend verifying important information by clicking on the source link to view the original announcement on the official government website."
    },
    {
      question: "How can I search for specific announcements?",
      answer: "Use the search bar to find announcements by keywords, policy names, or specific topics. You can also combine search with filters for more precise results."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-emerald-600 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using Announce
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg border">
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-100 rounded-lg">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Still have questions? Contact our support team at{" "}
            <a href="mailto:jesikamaraj@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
              jesikamaraj@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
