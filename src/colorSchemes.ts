/**
 * Color Scheme System
 * 
 * Defines popular color schemes for markdown-renderer.
 * Each scheme provides CSS variables for consistent theming.
 * 
 * Included Schemes:
 * - one-dark / one-light: VS Code One themes
 * - catppuccin-latte / catppuccin-frappe: Catppuccin color palette
 * - doom-one: Doom Emacs theme
 * - nord: Arctic north-bluish palette
 * - dracula: Popular dark theme
 * - gruvbox-light / gruvbox-dark: Retro groove colors
 */

export type ColorSchemeName =
  | "one-dark"
  | "one-light"
  | "catppuccin-latte"
  | "catppuccin-frappe"
  | "doom-one"
  | "nord"
  | "dracula"
  | "gruvbox-light"
  | "gruvbox-dark";

export interface ColorScheme {
  name: ColorSchemeName;
  label: string;
  isDark: boolean;
  variables: Record<string, string>;
}

export const colorSchemes: Record<ColorSchemeName, ColorScheme> = {
  "one-dark": {
    name: "one-dark",
    label: "One Dark",
    isDark: true,
    variables: {
      "--background": "#282c34",
      "--surface": "#21252b",
      "--surface-muted": "#2c313a",
      "--text": "#abb2bf",
      "--muted": "#7f848e",
      "--border": "#3e4451",
      "--accent1": "#61afef",
      "--accent2": "#c678dd",
      "--accent3": "#e06c75",
      "--accent4": "#98c379",
      "--shadow": "rgba(0, 0, 0, 0.28)",
    },
  },
  "one-light": {
    name: "one-light",
    label: "One Light",
    isDark: false,
    variables: {
      "--background": "#fafafa",
      "--surface": "#ffffff",
      "--surface-muted": "#f0f1f2",
      "--text": "#282c34",
      "--muted": "#68717d",
      "--border": "#d7d9dc",
      "--accent1": "#4078f2",
      "--accent2": "#a626a4",
      "--accent3": "#e45649",
      "--accent4": "#50a14f",
      "--shadow": "rgba(40, 44, 52, 0.12)",
    },
  },
  "catppuccin-latte": {
    name: "catppuccin-latte",
    label: "Catppuccin Latte",
    isDark: false,
    variables: {
      "--background": "#eff1f5",
      "--surface": "#ffffff",
      "--surface-muted": "#f2f4f8",
      "--text": "#4c4f69",
      "--muted": "#8c8fa1",
      "--border": "#d7d9dc",
      "--accent1": "#1e66f5",
      "--accent2": "#ea76cb",
      "--accent3": "#d20f39",
      "--accent4": "#40a02b",
      "--shadow": "rgba(76, 79, 105, 0.12)",
    },
  },
  "catppuccin-frappe": {
    name: "catppuccin-frappe",
    label: "Catppuccin Frappé",
    isDark: true,
    variables: {
      "--background": "#303446",
      "--surface": "#292c3c",
      "--surface-muted": "#414559",
      "--text": "#c6d0f5",
      "--muted": "#949bb9",
      "--border": "#51576d",
      "--accent1": "#8caaee",
      "--accent2": "#f494fd",
      "--accent3": "#e78284",
      "--accent4": "#a6d189",
      "--shadow": "rgba(0, 0, 0, 0.28)",
    },
  },
  "doom-one": {
    name: "doom-one",
    label: "Doom One",
    isDark: true,
    variables: {
      "--background": "#1e1e1e",
      "--surface": "#2e2e2e",
      "--surface-muted": "#3a3a3a",
      "--text": "#bdbdbd",
      "--muted": "#808080",
      "--border": "#464646",
      "--accent1": "#51afef",
      "--accent2": "#c678dd",
      "--accent3": "#ff6c6b",
      "--accent4": "#98be65",
      "--shadow": "rgba(0, 0, 0, 0.5)",
    },
  },
  nord: {
    name: "nord",
    label: "Nord",
    isDark: true,
    variables: {
      "--background": "#2e3440",
      "--surface": "#3b4252",
      "--surface-muted": "#434c5e",
      "--text": "#eceff4",
      "--muted": "#d8dee9",
      "--border": "#4c566a",
      "--accent1": "#88c0d0",
      "--accent2": "#b48ead",
      "--accent3": "#bf616a",
      "--accent4": "#a3be8c",
      "--shadow": "rgba(0, 0, 0, 0.36)",
    },
  },
  dracula: {
    name: "dracula",
    label: "Dracula",
    isDark: true,
    variables: {
      "--background": "#282a36",
      "--surface": "#21222c",
      "--surface-muted": "#44475a",
      "--text": "#f8f8f2",
      "--muted": "#6272a4",
      "--border": "#44475a",
      "--accent1": "#8be9fd",
      "--accent2": "#ff79c6",
      "--accent3": "#ff5555",
      "--accent4": "#50fa7b",
      "--shadow": "rgba(0, 0, 0, 0.4)",
    },
  },
  "gruvbox-light": {
    name: "gruvbox-light",
    label: "Gruvbox Light",
    isDark: false,
    variables: {
      "--background": "#fbf1c7",
      "--surface": "#f9f5d9",
      "--surface-muted": "#ebdbb2",
      "--text": "#3c3836",
      "--muted": "#7c6f64",
      "--border": "#d5c4a1",
      "--accent1": "#0184bc",
      "--accent2": "#8f3f71",
      "--accent3": "#cc241d",
      "--accent4": "#427b58",
      "--shadow": "rgba(60, 56, 54, 0.12)",
    },
  },
  "gruvbox-dark": {
    name: "gruvbox-dark",
    label: "Gruvbox Dark",
    isDark: true,
    variables: {
      "--background": "#282828",
      "--surface": "#3c3836",
      "--surface-muted": "#504945",
      "--text": "#ebdbb2",
      "--muted": "#a89984",
      "--border": "#665c54",
      "--accent1": "#83a598",
      "--accent2": "#d3869b",
      "--accent3": "#fb4934",
      "--accent4": "#b8bb26",
      "--shadow": "rgba(0, 0, 0, 0.36)",
    },
  },
};

/**
 * Get a color scheme by name
 */
export function getColorScheme(name: ColorSchemeName): ColorScheme {
  return colorSchemes[name];
}

/**
 * Get all available color schemes
 */
export function getAllColorSchemes(): ColorScheme[] {
  return Object.values(colorSchemes);
}

/**
 * Apply color scheme to DOM root element (client-side only)
 */
export function applyColorScheme(scheme: ColorScheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  Object.entries(scheme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.setAttribute("data-color-scheme", scheme.name);
  root.style.setProperty("color-scheme", scheme.isDark ? "dark" : "light");
}

/**
 * Get currently applied color scheme
 */
export function getCurrentColorScheme(): ColorSchemeName | null {
  if (typeof document === "undefined") return null;
  return (document.documentElement.getAttribute("data-color-scheme") as ColorSchemeName) || null;
}

/**
 * Generate CSS variables from a color scheme
 * Useful for server-side rendering or static generation
 */
export function generateColorSchemeCSSVariables(scheme: ColorScheme): string {
  return Object.entries(scheme.variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n  ");
}
