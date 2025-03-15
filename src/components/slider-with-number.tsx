import { Slider } from "@/components/ui/slider";
import { forwardRef, useImperativeHandle, useState } from "react";

type SliderWithShownNumberProps = {
  step: number;
  max: number;
  defaultValue?: number;
};

export type SliderHandle = {
  getValue: () => number;
};

export const SliderWithShownNumber = forwardRef<
  SliderHandle,
  SliderWithShownNumberProps
>(({ step, max, defaultValue = 0 }, ref) => {
  const [value, setValue] = useState([defaultValue]);

  // Expose getValue method through the ref
  useImperativeHandle(ref, () => ({
    getValue: () => value[0],
  }));

  return (
    <div>
      <Slider
        defaultValue={[defaultValue]}
        max={max}
        value={value}
        step={step}
        onValueChange={setValue}
      />
      <div className="mt-1 flex justify-between text-xs font-medium text-muted-foreground">
        <span>{value[0]}</span>
        <span>{max}</span>
      </div>
    </div>
  );
});

SliderWithShownNumber.displayName = "SliderWithShownNumber";
