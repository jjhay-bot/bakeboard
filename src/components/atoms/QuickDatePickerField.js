import { useState } from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { format, isValid, parseISO } from "date-fns";
import { IconButton, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectablePill from "./SelectablePill";

const hiddenTextFieldSx = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: 1,
  height: 1,
  overflow: "hidden",
};

const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  const parsedDate = parseISO(value);

  return isValid(parsedDate) ? parsedDate : null;
};

/**
 * @typedef {{ value: string, label: string }} QuickDatePickerOption
 */

/**
 * @typedef {import("@mui/x-date-pickers/DatePicker").DatePickerProps<Date>} MuiDatePickerProps
 */

/**
 * Small wrapper around MUI `DatePicker` that adds optional preset date pills
 * and a calendar icon trigger while keeping the form value as `yyyy-MM-dd`.
 *
 * The component forwards normal MUI `DatePicker` props so editor autocomplete
 * remains useful from JS call sites.
 *
 * @param {MuiDatePickerProps & {
 *   label: string,
 *   value: string,
 *   onChange: (value: string) => void,
 *   presetOptions?: QuickDatePickerOption[],
 *   openPickerAriaLabel?: string,
 *   labelProps?: import("@mui/material").TypographyProps,
 * }} props
 */
const QuickDatePickerField = ({
  label,
  value,
  onChange,
  presetOptions = [],
  openPickerAriaLabel,
  labelProps,
  slotProps,
  ...datePickerProps
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateValue = parseDateValue(value);
  const textFieldSlotProps = value
    ? {
        fullWidth: true,
        ...slotProps?.textField,
      }
    : {
        ...slotProps?.textField,
        sx: [hiddenTextFieldSx, slotProps?.textField?.sx],
        tabIndex: -1,
      };

  return (
    <Stack spacing={0.5}>
      <Typography
        color="secondary.main"
        fontSize={13}
        fontWeight={700}
        {...labelProps}
      >
        {label}
      </Typography>

      {!value ? (
        <Stack direction="row" flexWrap="wrap" gap={0.75} alignItems="center">
          {presetOptions.map((option) => (
            <SelectablePill
              key={option.value}
              label={option.label}
              selected={value === option.value}
              onClick={() => {
                setIsDatePickerOpen(false);
                onChange(option.value);
              }}
            />
          ))}

          <IconButton
            type="button"
            aria-label={openPickerAriaLabel || `Pick ${label.toLowerCase()}`}
            onClick={() => setIsDatePickerOpen(true)}
            sx={{
              p: 0,
              mx: 1,
              borderRadius: "999px",
              bgcolor: "#fff6f0",
              color: "secondary.main",
              flexShrink: 0,
            }}
          >
            <CalendarMonthRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Stack>
      ) : null}

      <Stack pt={value ? 1 : 0}>
        <DatePicker
          {...datePickerProps}
          label={label}
          open={isDatePickerOpen}
          onOpen={() => setIsDatePickerOpen(true)}
          onClose={() => setIsDatePickerOpen(false)}
          value={dateValue}
          onChange={(nextValue) => {
            setIsDatePickerOpen(false);
            onChange(nextValue ? format(nextValue, "yyyy-MM-dd") : "");
          }}
          slotProps={{
            ...slotProps,
            textField: textFieldSlotProps,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default QuickDatePickerField;
