const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const primary = {
  white: "#fffcf2",
  lightgrey: "#ccc5b9",
  darkgrey: "#403d39",
  orange: "#eb5e28",
  dark: "#252422",
};

export default {
  light: {
    primary: primary.orange,
    grey: primary.darkgrey,
    text: "#000",
    background: "#fff",
    backgroundContainer: "#FDFFFF",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    borderColor: "#ABABAB",
  },
  dark: {
    primary: primary.dark,
    text: "#fff",
    background: "#000",
    backgroundContainer: "#FDFFFF",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    borderColor: "#ABABAB",
  },
};
