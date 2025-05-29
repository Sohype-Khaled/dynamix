export interface ButtonPreset {
  defaultSize?: string;
  defaultRounded?: boolean;
  severityMap?: {
    base?: Record<string, string>;
    outlined?: Record<string, string>;
    text?: Record<string, string>;
  };
}

export interface TabPreset {
  classMap?: {
    base?: string;
    active?: string;
    disabled?: string;
  }
}

export interface TabsPreset {
  scrollbar: {
    thumbRadius?: number;
    thumbBorder?: string;
    trackColor?: string;
    thumbColor?: string;
    trackHoverColor?: string;
    thumbHoverColor?: string;
  }
}

export interface ScrollbarPreset {
  thumbRadius?: number;
  trackColor?: string;
  thumbColor?: string;
  thumbHoverColor?: string;
  trackHoverColor?: string;
  thumbBorder?: string;
}

export interface DynamixOptions {
  buttonPresets?: ButtonPreset;
  tabPresets?: TabPreset;
  tabsPresets?: TabsPreset;
  scrollbarPresets?: ScrollbarPreset;

  [key: string]: any;
}
