import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const DEFAULT_ICON_PROPS = {
  SIZE: 16,
  STROKE_WIDTH: 2,
}  ;
