export interface ISharedButton {
  labelKey?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  appearance?: "primary" | "default" | "dashed" | "text";
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  href?: string;
  children?: React.ReactNode;
}
