import { useId } from "react";

export default function CheckboxField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>我同意並且了解滿意茶政策</label>
      <input id={id} type="checkbox" />
    </div>
  );
}
