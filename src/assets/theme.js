import { alpha, createTheme } from "@mui/material/styles";

const appFontFamily = `"Baloo 2", sans-serif`;
const boardCanvas = "#fffaf6";
const boardPaper = "#fffdf8";
const boardTextPrimary = "#6e3f2f";
const boardTextSecondary = "#8a6a5c";
const boardAction = "#ed5a29";

const boardPanelStyles = {
  borderRadius: "18px",
  backgroundColor: boardPaper,
  border: `1px dashed ${"#e5c9b9"}`,
};

const primaryColor = "#ff7f8f";
const secondaryColor = "#6e3f2f";

const boardNoteStyles = {
  padding: "16px",
  borderRadius: "9px",
  border: `1px solid ${alpha(boardTextPrimary, 0.08)}`,
  boxShadow: `0 10px 20px ${alpha(boardTextPrimary, 0.08)}`,
  position: "relative",
};

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: "#ff8d63",
      dark: "#d84d1f",
      contrastText: "#fffaf6",
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: boardCanvas,
      paper: boardPaper,
    },
    text: {
      primary: boardTextPrimary,
      secondary: boardTextSecondary,
    },
  },
  typography: {
    fontFamily: appFontFamily,
    title: {
      fontFamily: appFontFamily,
      fontSize: "24px",
      fontWeight: 700,
      letterSpacing: "1px",
      color: "#000",
    },
    label: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 600,
      color: "#4E4B66",
      letterSpacing: "0.25px",
    },
    description: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 400,
      color: "#4E4B66",
    },
    icon: {
      color: "#ED5A29",
    },
    header: {
      fontSize: "17px",
      fontWeight: 700,
      letterSpacing: "0.75px",
      color: "#000",
    },
    modal_description: {
      fontSize: "15px",
      fontWeight: 300,
      letterSpacing: "0.75px",
      color: "#4E4B66",
    },
    name: {
      fontFamily: appFontFamily,
      fontSize: "15px",
      fontWeight: 700,
      letterSpacing: "0.75px",
      color: "#000",
    },
    amount: {
      fontFamily: appFontFamily,
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#262338",
    },
    subtitle2: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#4E4B66",
    },
    subtitle1: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 600,
      letterSpacing: "0.25px",
      color: "#4E4B66",
    },

    body1: {
      fontSize: "15px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#6E7191",
    },
    body2: {
      fontSize: "15px",
      fontWeight: 500,
      letterSpacing: "0.75px",
      color: "#262338",
    },
    body3: {
      fontSize: "13px",
      fontWeight: 400,
      color: "#262338",
      letterSpacing: "0.25px",
    },
    body4: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 600,
      color: "#262338",
      letterSpacing: "0.25px",
    },
  },
  shape: {
    borderRadius: 16,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      custom: 425,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "8px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "16px",
          textTransform: "none",
          fontWeight: 700,
        },
        "&.Mui-disabled": {
          backgroundColor: "#F7F7FC",
          color: "#F7F7FC",
        },
      },
      variants: [
        {
          props: { variant: "boardPrimary" },
          style: {
            backgroundColor: boardAction,
            color: "#fffaf6",
            boxShadow: `0 10px 20px ${alpha(boardAction, 0.18)}`,
            "&:hover": {
              backgroundColor: "#d84d1f",
            },
          },
        },
        {
          props: { variant: "boardSecondary" },
          style: {
            color: boardTextSecondary,
            backgroundColor: "#f8eee7",
            "&:hover": {
              backgroundColor: "#f1e3d9",
            },
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "boardAction" },
          style: {
            backgroundColor: primaryColor,
            color: "#fffaf6",
            boxShadow: `0 10px 20px ${alpha(boardAction, 0.22)}`,
            "&:hover": {
              backgroundColor: primaryColor,
              filter: "brightness(1.1)",
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "boardPanel" },
          style: boardPanelStyles,
        },
        {
          props: { variant: "boardNote" },
          style: boardNoteStyles,
        },
      ],
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(38, 35, 56, 0.40)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "24px",
          backgroundColor: boardCanvas,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-sizeSmall": {
            transform: "translate(14px, 10px) scale(1)",
          },
          "&.MuiInputLabel-sizeSmall.MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9DBE9",
              borderRadius: "16px",
            },
            "&:hover fieldset": {
              borderColor: "#D9DBE9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9DBE9",
            },
            "&.MuiInputBase-sizeSmall": {
              alignItems: "center",
              "& fieldset": {
                borderRadius: "16px",
                borderColor: alpha("#D9DBE9", 0.72),
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: alpha("#D9DBE9", 0.88),
              },
              "&.Mui-focused fieldset": {
                borderColor: alpha("#D9DBE9", 0.92),
              },
              "& input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
                // padding: "12px 14px",
                transform: "translateY(1px)",
              },
              "& textarea.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "15px",
            fontFamily: appFontFamily,
            color: "#262338",
            letterSpacing: "0.75px",
          },
        },
      },
    },
  },
});

export const themeInput = createTheme({
  typography: {
    fontFamily: appFontFamily,
    label: {
      fontFamily: appFontFamily,
      fontSize: "13px",
      fontWeight: 600,
      color: "#4E4B66",
      letterSpacing: "0.25px",
    },
  },
  palette: {
    primary: {
      main: "#242424",
    },
    secondary: {
      main: "#d5d5d5",
    },
  },
  components: {
    typography: {
      fontFamily: appFontFamily,
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          display: "transparent !importareacnt",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          paddingTop: ".6rem !important",
          paddingBottom: "0.6rem !important",
          fontSize: "14px", // Adjust the font size as needed
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9DBE9",
              borderRadius: "16px",
            },
            "&:hover fieldset": {
              borderColor: "#D9DBE9",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D9DBE9",
            },
            "& .MuiInputLabel-shrink": {
              display: "transparent",
              width: 0,
            },
            "& .MuiOutlinedInput-input": {
              // fontSize: "0.95rem", // Adjust the font size as needed
              fontSize: "15px",
              fontFamily: appFontFamily,
              color: "#262338",
              letterSpacing: "0.75px",
            },
          },
        },
      },
    },
  },
});

export const themeNudge = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14.5px",
          fontWeight: 400,
          color: "#fff",
          backgroundColor: "#07a69c",
          maxWidth: 180,
          fontFamily: appFontFamily,
          borderRadius: "12px",
          padding: "12px 16px",
          left: "10px",
        },
        arrow: {
          "&:before": {
            border: "1px solid #E6E8ED",
          },
          color: "#07a69c",
          marginLeft: "-10px",
        },
      },
    },
  },
});

export default theme;
