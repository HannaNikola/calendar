export type TypesAdaptive = "mobail" | "tablet" | "desktop";

export type AdaptiveProps = {
  type?: TypesAdaptive;
  position?: "top" | "bottom";
  onSettingsClick?: () => void;
};
