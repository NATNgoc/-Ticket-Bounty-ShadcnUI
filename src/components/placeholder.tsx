import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { LucideCloudAlert } from "lucide-react";
import { cloneElement } from "react";
type PlacerHolderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<unknown>;
  className?: string;
};

export default function PlaceHolder({
  label,
  icon = <LucideCloudAlert />,
  button = <div></div>,
  className,
}: PlacerHolderProps) {
  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center justify-center flex-1",
          className
        )}
      >
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
