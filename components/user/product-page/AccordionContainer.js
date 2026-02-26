"use client";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import classes from "./AccordionContainer.module.css";
import { ChevronDown } from "lucide-react";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        <p className="font-bold">{header}</p>
        <div className={classes.chevContainer}>
          <ChevronDown className={classes.chev} size={16} />
        </div>
      </>
    }
    className={classes.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${classes.itemBtn} ${isEnter && classes.itemBtnExpanded}`,
    }}
    contentProps={{ className: classes.itemContent }}
    panelProps={{ className: classes.itemPanel }}
  />
);

const AccordionContainer = () => {
  return (
    <div className={classes.accordion}>
      {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
      <Accordion transition transitionTimeout={250}>
        <AccordionItem header="Shipping & Delivery">
          <p className="mb-8">
            Orders is being shipped within 7-10 working days (Weekends excluded)
          </p>
          يتم شحن الطلبات في خلال 7 - 10 ايام عمل (بإستثناء اجازة نهاية الاسبوع)
        </AccordionItem>

        <AccordionItem header="Return & Exchange">
          <p className="mb-8">
            You can try the piece on the spot while the courier is waiting, we
            accept exchanges and refunds only on the spot, once the courier
            leaves we wont be able to accept any exchanges or refunds. No Refund
            or Exchange when you Purchase in discount time. Delivery fees has to
            be
          </p>
          paid in all situations
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionContainer;
