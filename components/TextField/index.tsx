import { useId, forwardRef } from "react";

type TextFieldProps = {
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  rightSideRender?: JSX.Element;
};

const TextField = forwardRef<any, TextFieldProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      required,
      error,
      rightSideRender,
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className="w-full">
        <label htmlFor={id} className="flex justify-between text-body">
          <div>
            {label}
            {required ? <span className="text-primary">*</span> : ""}
          </div>
          <div>{rightSideRender}</div>
        </label>
        {type === "text" && (
          <input
            {...props}
            ref={ref}
            className={`border border-primary text-subtitle pl-4 py-4 w-full mt-1 placeholder:text-[#BBC8D4] placeholder:text-subtitle focus:outline-none transition-colors ${
              error ? "border-[#E73502]" : ""
            }`}
            placeholder={placeholder}
            id={id}
            type="text"
          />
        )}

        {type === "textarea" && (
          <textarea
            {...props}
            ref={ref}
            className="border border-primary text-subtitle pl-4 py-4 w-full mt-1 min-h-[200px] placeholder:text-[#BBC8D4] placeholder:text-subtitle focus:outline-none transition-colors"
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
