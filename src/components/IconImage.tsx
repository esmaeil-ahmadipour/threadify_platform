import Image from "next/image";
import { ReactNode } from "react";

interface IconImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  priority?: boolean;
  showText?: boolean;
  text?: string;
  textClassName?: string;
  children?: ReactNode;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  rounded?: boolean;
  roundedSize?: string;
  containerSize?: number;
  fitToSquare?: boolean;
  noBorder?: boolean;
  extraSpace?: boolean;
  loading?: "lazy" | "eager";
}

export default function IconImage({
  src = "/logo.png",
  alt = "Icon",
  width = 48,
  height = 48,
  imageClassName = "",
  priority = false,
  showText = false,
  text = "",
  textClassName = "",
  children,
  fill = false,
  sizes,
  quality,
  rounded = false,
  roundedSize = "full",
  containerSize,
  fitToSquare = false,
  noBorder = true,
  extraSpace = false,
  loading,
}: IconImageProps) {
  // Determine container classes
  const containerClasses = [
    "flex items-center gap-2",
    noBorder && "border-0",
    extraSpace && "p-2",
    rounded && `rounded-${roundedSize}`,
    fitToSquare && "aspect-square justify-center items-center",
    containerSize && `w-[${containerSize}px] h-[${containerSize}px]`,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine image classes
  const imageClasses = [
    "object-contain",
    rounded && `rounded-${roundedSize}`,
    fitToSquare && "w-full h-full",
    imageClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Inline style for dynamic container size
  const containerStyle = containerSize
    ? { width: `${containerSize}px`, height: `${containerSize}px` }
    : undefined;

  // Determine if the image should use fill mode
  const shouldFill = fill || fitToSquare;

  // Set default sizes if missing when fill is true
  const defaultSizes = shouldFill && !sizes ? "100vw" : sizes;

  return (
    <div className={containerClasses} style={containerStyle}>
      {children ? (
        children
      ) : (
        <div className={fitToSquare ? "relative w-full h-full" : ""}>
          <Image
            src={src}
            alt={alt}
            width={!shouldFill ? width : undefined}
            height={!shouldFill ? height : undefined}
            priority={priority}
            className={imageClasses}
            fill={shouldFill}
            sizes={defaultSizes}
            quality={quality}
            loading={loading}
          />
        </div>
      )}
      {showText && text && (
        <span
          className={`font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${textClassName}`}
        >
          {text}
        </span>
      )}
    </div>
  );
}
