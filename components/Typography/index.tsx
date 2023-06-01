import { typographyConfig } from "../../config/typography";

type TypographyProps = {
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "body" | "caption";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "caption" | "span" | "a";
  color?: "primary" | "secondary" | "black";
  children?: React.ReactNode | React.ReactNode[];
};

const Typography: React.FC<TypographyProps> = ({
  className,
  variant = "body",
  tag = "p",
  color = "black",
  children,
}) => {
  const HTMLTag = `${tag}` as keyof JSX.IntrinsicElements;

  return (
    <HTMLTag
      className={`${typographyConfig.font[variant]} ${typographyConfig.color[color]} ${className}`}
    >
      {children}
    </HTMLTag>
  );
};

export default Typography;
