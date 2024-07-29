import { type ButtonProps, Button } from "./button";

export interface LinkProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const ButtonLink: React.FC<LinkProps> = ({
  href,
  children,
  target,
  rel,
  ...props
}) => {
  let finalRel = rel;

  if (target === "_blank") {
    const relValues = new Set(rel?.split(" ") || []);
    relValues.add("noreferrer");
    finalRel = Array.from(relValues).join(" ");
  }

  return (
    <Button {...props} asChild>
      <a href={href} target={target} rel={finalRel}>
        {children}
      </a>
    </Button>
  );
};

export { ButtonLink };

