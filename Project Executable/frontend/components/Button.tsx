import { Button as MUIButton, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
export const Button = ({
  isLoading,
  sx,
  disabled,
  label,
  onClick,
  icon,
  color,
  variant,
  fullWidth = false,
}: ButtonProps) => {
  return (
    <MUIButton
      sx={{
        textTransform: "none",
        fontWeight: 600,
        fontSize: "16px",
        height: "40px",
        ...sx,
      }}
      variant={variant || "outlined"}
      startIcon={icon}
      onClick={onClick}
      color={color || "primary"}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {label}
      {isLoading && (
        <CircularProgress color="inherit" sx={{ ml: 1 }} size={12} />
      )}
    </MUIButton>
  );
};

interface ButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  sx?: any;
  disabled?: boolean;
  icon?: ReactNode;
  color?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning";
  label: string;
  variant?: "outlined" | "contained" | "text";
  fullWidth?: boolean;
}
