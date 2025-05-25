export type ButtonSize = "xs" | "sm" | "base" | "lg" | "xl";
export type IconPosition = "left" | "right";

export interface ButtonProps {
  as?: "button" | "a" | "router-link" | "nuxt-link";
  label?: string;
  href?: string;
  icon?: string;
  text?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  iconPosition?: IconPosition;
  severity?: string;
  severityClass?: string;
  size?: ButtonSize;
  loading?: boolean;
  ripple?: boolean | string | undefined;
}
