export function FieldError({
  error,
  textSize,
}: {
  error: string;
  textSize?: string;
}) {
  const cssConfig = `${textSize ?? "text-sm"} text-red-500`;

  return <span className={cssConfig}>{error}</span>;
}
