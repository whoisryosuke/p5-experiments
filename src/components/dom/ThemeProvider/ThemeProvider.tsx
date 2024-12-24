import { useAppStore } from "@/store/app";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { base, Theme, themes } from "themes";

/**
 * "Deep merges" two objects only 1 level deep
 * (aka top level of theme like theme.colors)
 * @param objectOne
 * @param objectTwo
 * @returns
 */
const merge = (objectOne, objectTwo) => {
  const objectTwoMap = Object.keys(objectTwo);

  let mergeObj = {
    ...objectOne,
  };

  objectTwoMap.forEach((key) => {
    // Exists? Merge it
    if (key in mergeObj) {
      mergeObj[key] = {
        ...mergeObj[key],
        ...objectTwo[key],
      };
      return;
    }

    mergeObj[key] = objectTwo[key];
  });

  return mergeObj;
};

/* eslint-disable-next-line */
export interface ThemeProviderProps {
  theme?: Partial<Theme>;
}

export function ThemeProvider({
  children,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const { theme, colorMode } = useAppStore();

  const colorTheme = theme === "light" ? themes.light : themes.dark;
  const baseTheme = {
    ...base,
    ...colorTheme(colorMode),
  };

  return (
    <StyledThemeProvider theme={baseTheme}>{children}</StyledThemeProvider>
  );
}

ThemeProvider.defaultProps = {
  theme: {},
};

export default ThemeProvider;
