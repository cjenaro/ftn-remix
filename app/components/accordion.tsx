import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";

type AccordionItemType = {
  title: string;
  description: string;
};

export default function CustomAccordion({
  items,
}: {
  items: AccordionItemType[];
}) {
  return (
    <Accordion collapsible multiple>
      {items.map((item) => (
        <AccordionItem key={item.title}>
          <h3>
            {item.title} <AccordionButton>&darr;</AccordionButton>
          </h3>
          <AccordionPanel>
            <div className="content">{item.description}</div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
