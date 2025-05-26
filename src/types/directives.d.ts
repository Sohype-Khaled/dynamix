export type RippleElement = HTMLElement & {
  _rippleHandler?: (event: MouseEvent) => void;
};

export type TimeUpdateElement = HTMLElement & {
  __timeUpdateInterval?: number;
};

