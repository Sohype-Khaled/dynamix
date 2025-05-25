

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

  [key: string]: any;
}
