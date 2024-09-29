import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion"
import { Link } from "react-router-dom";
  
interface AccordionWrapperProps{
    title: string;
    description:string[]
}
export function AccordionWrapper({description, title}:AccordionWrapperProps) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="ml-2">{title}</AccordionTrigger>
          <AccordionContent className="ml-5">
            {
                description.map((item, index)=>(
                  <div className="flex flex-col">
                  <Link to={"/"} key={index} className="mt-2 hover:bg-[#686666] w-full p-1">   
                        {item}
                  </Link>
                  </div>  
              ))
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
}
  