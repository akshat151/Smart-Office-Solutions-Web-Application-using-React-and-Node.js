import { TextField } from "@mui/material";

const TextFieldComponent = (props: any) => {
  const { field, handleChange, label, value, disabled = false } = props;

  return (
    <TextField
      sx={{ m: 1, my: 2, width: 300 }}
      size="small"
      label={label}
      variant="outlined"
      value={value}
      disabled={disabled}
      onChange={(e) => handleChange({ [field]: e.target.value })}
      {...props}
    />
  );
};

export default TextFieldComponent;
