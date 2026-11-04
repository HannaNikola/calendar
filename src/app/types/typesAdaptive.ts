export type TypesAdaptive = "mobail" | "tablet" | "tabletWide"| "desktop";

export type AdaptiveProps = {
  type?: TypesAdaptive;
  position?: "top" | "bottom";
  onSettingsClick?: () => void;
  isSettingsOpen?: boolean;
};







