import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { iReview } from "../util/Interfaces"
import DOMPurify from "dompurify";
import RatingModuleTiny from "./RatingModuleTiny";

interface AccordianComponentProps {
  review: iReview;
}

export default function AccordianComponent({ review }: AccordianComponentProps) {
  const formattedBody = review.body.replace(/<p><\/p>/g, "<br>");
  const sanitizedHTML = DOMPurify.sanitize(formattedBody);

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1 ">
          <AccordionTrigger className="text-xs md:text-base">{review.title}</AccordionTrigger>
          <AccordionContent>
            <RatingModuleTiny name={review.id!} rating={review.rating} size="rating-xs" />
            <p
              className="text-gray-600 text-sm"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
