import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";

type OptionType = {
  id: string | number;
  value?: string;
  label?: string;
};

interface MuiSelectProps
  extends Partial<AutocompleteProps<OptionType, boolean, boolean, boolean>> {
  name?: string;
  options: OptionType[];
  value: OptionType | OptionType[] | null;
  onChange: (event: any, value: any) => void;
  multiple?: boolean;
}

const MuiSelect = ({
  options,
  value,
  onChange,
  name,
  multiple,
  ...props
}: MuiSelectProps) => {
  return (
    <Autocomplete
      fullWidth
      multiple={multiple}
      options={options ?? []}
      getOptionLabel={(option: any) => `${option?.[name]}`}
      value={value || []}
      onChange={onChange}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          placeholder={`Select ${name}`}
          slotProps={{
            inputLabel: {
              shrink: false,
            },
          }}
        />
      )}
    />
  );
};

export default MuiSelect;
