import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const SelectField = (props: any) => {
  const { field, label, options, value, handleChange, disabled } = props;

  return (
    <FormControl sx={{ m: 1, width: "57%" }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent) =>
          handleChange({ [field]: e.target.value })
        }
        disabled={disabled}
      >
        {options.map(({ key, value }: { key: string; value: string }) => {
          return <MenuItem value={key}>{value}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectField;
