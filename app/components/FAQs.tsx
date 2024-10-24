import Container from "@shared/container";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  businessAccountFaqs,
  generalFaqs,
  personalAccountFaqs,
} from "@lib/faqs";

const FAQSection = () => {
  return (
    <div className="bg-[#FAFAFA]">
      <Container className="my-0 py-10">
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-[25px] lg:text-[40px] leading-[47px] tracking-title m-0">
            Frequently Asked Questions
          </h4>

          <Tabs defaultValue="general" className="w-full mt-5">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            {/* General */}
            <TabsContent value="general" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {generalFaqs.map((faq) => {
                  return (
                    <AccordionItem value={faq.title} key={faq.title}>
                      <AccordionTrigger className="!font-normal">
                        {faq.title}
                      </AccordionTrigger>
                      <AccordionContent>{faq.content}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>

            {/* Personal */}
            <TabsContent value="personal" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {personalAccountFaqs.map((faq) => {
                  return (
                    <AccordionItem value={faq.title} key={faq.title}>
                      <AccordionTrigger>{faq.title}</AccordionTrigger>
                      <AccordionContent>{faq.content}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
            {/* Business */}
            <TabsContent value="business" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {businessAccountFaqs.map((faq) => {
                  return (
                    <AccordionItem value={faq.title} key={faq.title}>
                      <AccordionTrigger>{faq.title}</AccordionTrigger>
                      <AccordionContent>{faq.content}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
    </div>
  );
};

export default FAQSection;
