import { BASE_COLORS } from "./base";

export const primaryColors = {
  text: "rgba(234,234,241,1)",
  textOverlay: "rgba(234,234,241,0.7)",
  textInverted: "rgba(234,234,241,1)",
  reading: "rgba(16,15,40,1)",
  background: "rgba(239,239,239,1)",
  background_level1: "rgba(225,225,225,1)",
  background_level2: "rgba(200,200,200,1)",
  background_level3: "rgba(185,185,185,1)",
  background_overlay: "rgba(0,0,0,0.6)",
  button: {
    default: "rgba(242, 242, 242, 0.1)",
    hovered: "rgba(242, 242, 242, 0.3)",
    pressed: "rgba(255, 255, 255, 1.0)",
    pressedText: "rgba(0,0,0,1.0)",
    disabledText: "rgba(234,234,241,0.3)",
  },
  primary: {
    default: "#1B76FF",
    hovered: "#78AEFF",
    pressed: "#0C4294",
  },
  // secondary: primaryColors.purple[500],
  muted: "#b6b6b9",
  highlight: "hsla(205, 100%, 40%, 0.125)",

  success: "green",
  message: "blue",
  warning: "yellow",
  danger: "red",
};

export const colors = {
  ...primaryColors,
  ...BASE_COLORS,
};

export const gradients = {
  // subtle: `linear-gradient(180deg, ${colors.blue['500']} 0%, ${colors.secondary} 100%)`,
  // purple: `linear-gradient(180deg, ${colors.primary} 0%, #A000C4 100%)`,
  none: "none",
  background:
    "radial-gradient(73.75% 106.2% at 5.07% 34.92%, #F9F9F9 0%, #C9CBCC 100%)",
  glass: {
    border:
      "radial-gradient(253.85% 474.76% at 50% -83.65%, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.0) 33%, rgba(255, 255, 255, 0.16) 100%)",
  },
  blue: {
    default: `linear-gradient(90deg, #1B76FF 0%, #0C4294 36.1%);`,
    hover: `linear-gradient(90deg, #78AEFF 0%, #1B76FF 36.1%);`,
  },
  text: {
    blue: {
      default: `-webkit-linear-gradient(90deg, #1F1BD8 0%, #4845EF 36.1%);`,
      hover: `-webkit-linear-gradient(90deg, #4845EF 0%, #1F1BD8 36.1%);`,
    },
    text: {
      default: `-webkit-linear-gradient(90deg, #060613 0%, #141419 36.1%);`,
      hover: `-webkit-linear-gradient(90deg, #141419 0%, #242429 36.1%);`,
    },
    invert: {
      default: `-webkit-linear-gradient(90deg, #BBB 0%, #DDD 36.1%);`,
      hover: `-webkit-linear-gradient(90deg, #DDD 0%, #EEE 36.1%);`,
    },
  },
};

const light = {
  colors,
  gradients,
};

export default light;
