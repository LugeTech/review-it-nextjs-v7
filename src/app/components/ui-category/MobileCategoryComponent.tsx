"use client";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export default function MobileCategoryComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 px-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between">
            <h4 className="text-sm font-semibold">Real Estate</h4>
            <CaretSortIcon className="h-4 " />
            <span className="sr-only w-full">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {/* <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"> */}
      {/*   @radix-ui/primitives */}
      {/* </div> */}
      <CollapsibleContent className="space-y-2 px-6">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          Jackson's Realty company
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          Big Homes
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          Easy Condos
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
