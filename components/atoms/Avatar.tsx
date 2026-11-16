import Image from "next/image";
import type { StaticImageData } from "next/image";

type AvatarSize = "sm" | "md";

interface AvatarProps {
  src: StaticImageData | string;
  alt: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

const SIZES: Record<AvatarSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
};

const DOT_SIZES: Record<AvatarSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
};

export default function Avatar({
  src,
  alt,
  size = "sm",
  online = false,
  className,
}: AvatarProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 ${SIZES[size]} ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="h-full w-full rounded-full object-cover"
      />
      {online && (
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-success ring-2 ring-surface ${DOT_SIZES[size]}`}
        />
      )}
    </span>
  );
}
