import { Chip, Stack, Typography } from "@mui/material";

const AddOrderChipGroup = ({ title, options, value, onChange }) => {
  return (
    <Stack spacing={0.5}>
      <Typography color="secondary.main" fontSize={13} fontWeight={700}>
        {title}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <Chip
              key={option.value}
              label={option.label}
              size="small"
              clickable
              onClick={() => onChange(option.value)}
              sx={{
                bgcolor: isSelected ? "#ffe5dc" : "#fff6f0",
                border: "1px solid #f2d7ca",
                color: isSelected ? "#c85027" : "#8a6a5c",
                fontWeight: 700,
                "& .MuiChip-label": {
                  px: 1.1,
                  fontSize: "0.82rem",
                },
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default AddOrderChipGroup;
