import { Separator } from "@/components/ui/separator";
import { LucideCloudAlert } from "lucide-react";
import { cloneElement } from "react";
type PlacerHolderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<unknown>;
};

export default function PlaceHolder({
  label,
  icon = <LucideCloudAlert />,
  button = <div></div>,
}: PlacerHolderProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1">
        {cloneElement(icon, {
          className: "w-16 h-16",
        })}
        <h2>{label}</h2>
        <Separator className="w-[200] my-5"></Separator>
        {button && button}
      </div>
    </>
  );
}
