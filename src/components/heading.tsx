import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
};
function Heading({ title, description }: HeadingProps): React.ReactElement {
  return (
    <>
      <h1 className="text-5xl font-bold tracking-tighter">{title}</h1>
      {description && (
        <p className="text-sm text-pretty whitespace-break-spaces">
          {description}
        </p>
      )}
      <Separator className="mt-10" />
    </>
  );
}

export default Heading;
