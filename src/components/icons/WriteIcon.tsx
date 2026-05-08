import type { IconProps } from "../../utils/icon-props";
import { DEFAULT_ICON_PROPS } from "../../utils/icon-props";

export function WriteIcon({
  size = DEFAULT_ICON_PROPS.SIZE,
  strokeWidth = DEFAULT_ICON_PROPS.STROKE_WIDTH,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 3l4 4-7 7H10v-4l7-7z" />
      <path d="M4 20h16" />
    </svg>
  );
}
