

export interface DynamixOptions {
  buttonPresets?: {
    defaultSize?: string;
    defaultRounded?: boolean;
    severityMap?: {
      base?: Record<string, string>;
      outlined?: Record<string, string>;
      text?: Record<string, string>;
    };
  };

  tabPresets?: {
    classMap?: {
      base?: string;
      active?: string;
      disabled?: string;
    }
  };
  tabsPresets?: {
    scrollbar: {
      thumbRadius?: number;
      thumbBorder?: string;
      trackColor?: string;
      thumbColor?: string;
      trackHoverColor?: string;
      thumbHoverColor?: string;
    }
  };

  [key: string]: any;
}
