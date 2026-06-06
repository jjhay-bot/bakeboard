import { createTheme } from "@mui/material/styles";

const appFontFamily = `"Baloo 2", sans-serif`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7f8f",
    },
    secondary: {
      main: "#6e3f2f",
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
      styleOverrides: {
        root: {
          borderRadius: "16px",
          textTransform: "none",
        },
        "&.Mui-disabled": {
          backgroundColor: "#F7F7FC",
          color: "#F7F7FC",
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(38, 35, 56, 0.40)",
        },
      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: `8px`,
    //       border: "white 1px solid",
    //       "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    //         display: "none",
    //       },
    //       "& input[type=number]": {
    //         MozAppearance: "textfield",
    //       },
    //       "& input:-internal-autofill-selected": {
    //         background: "none",
    //       },
    //       "&.Mui-focused fieldset": {
    //         border: "1px #fff !important",
    //       },
    //     },
    //   },
    // },
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
