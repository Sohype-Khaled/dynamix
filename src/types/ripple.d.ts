export type RippleElement = HTMLElement & {
  _rippleHandler?: (event: MouseEvent) => void;
};