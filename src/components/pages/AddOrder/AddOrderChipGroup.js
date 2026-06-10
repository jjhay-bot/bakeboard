import { Stack, Typography } from "@mui/material";
import SelectablePill from "../../atoms/SelectablePill";

const AddOrderChipGroup = ({ title, options, value, onChange }) => {
  return (
    <Stack spacing={0.5}>
      <Typography color="secondary.main" fontSize={13} fontWeight={700}>
        {title}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {options.map((option) => (
          <SelectablePill
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default AddOrderChipGroup;
