import { DefaultTheme } from "styled-components";

export const color = {
  bg: "#F6F4F5",
  white: "#FFFFFF",
  black: "#000000",

  primary50: "#EFE5FD",
  primary100: "#D4BFF9",
  primary200: "#B894F6",
  primary500: "#6002EE",
  primary800: "#3D24AD",

  secondary50: "#E5F9F7",
  secondary100: "#92E9DC",
  secondary200: "#03DAC5"
};

export const media = {
  atSmall: "@media(min-width: 450px)",
  atMedium: "@media(min-width: 768px)",
  atLarge: "@media(min-width: 992px)"
};

export const spacing = {
  halfSpace: "2px",
  space: "4px",
  space2: "8px",
  space3: "12px",
  space4: "16px",
  space5: "20px",
  space6: "24px",
  space7: "28px",
  space8: "32px",
  space9: "36px",
  space10: "40px",
  space11: "44px",
  space12: "48px",
  space14: "56px",
  space16: "64px",
  space18: "72px"
};

export const fontSize = {
  xs: "8px",
  s: "16px",
  m: "24px",
  l: "32px",
  xl: "48px",
  xxl: "64px"
};

const theme: DefaultTheme = {
  color,
  media,
  spacing,
  fontSize
};

export default theme;
