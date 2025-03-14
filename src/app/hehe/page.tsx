"use client";

import { TestFrame } from "@/app/hehe/h";
import { ParentElement } from "@/app/hehe/parent";
import { Button } from "@/components/ui/button";
import { Kanban } from "lucide-react";
import { useState } from "react";

export default function HehePage() {
  let text = "123123";

  const hanleOnClick = () => {
    console.log(text);
    text = "123";
    setH(!h);
  };

  const [h, setH] = useState(true);

  return (
    <div className="flex-1 flex flex-col">
      <ParentElement button={<Kanban className="size-5" />}>
        <TestFrame></TestFrame>
      </ParentElement>
      <Kanban className="size-5" />
      <Button onClick={hanleOnClick}>{text}</Button>
    </div>
  );
}
