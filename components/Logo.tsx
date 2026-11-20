import Image from "next/image";
import { LOGO, LOGO_FILES_PRESENT, type LogoVariant } from "@/lib/brand";

/**
 * The Black Alumni Weekend lockup.
 *
 * When the real artwork is present it is used as an image, because the
 * lockup's condensed weight and script "Weekend" cannot be reproduced with
 * web type. Until then this renders a plain, obviously-interim text lockup
 * rather than a fake that might ship by accident.
 */
export function Logo({
  variant = "white",
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 420px, 280px",
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const alt = "Mississippi State University Black Alumni Weekend";

  if (LOGO_FILES_PRESENT) {
    const file = LOGO[variant];
    return (
      <Image
        src={file.src}
        alt={alt}
        width={file.width}
        height={file.height}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  const tone =
    variant === "white"
      ? { small: "text-chalk/70", big: "text-chalk", script: "text-chalk/85" }
      : { small: "text-umber-soft", big: "text-wine", script: "text-wine/85" };

  return (
    <span className={`block ${className}`} role="img" aria-label={alt}>
      <span
        aria-hidden="true"
        className={`eyebrow block text-[0.52em] ${tone.small}`}
      >
        Mississippi State University
      </span>
      <span
        aria-hidden="true"
        className={`display-xl mt-[0.12em] block leading-[0.86] ${tone.big}`}
      >
        Black
        <br />
        Alumni
      </span>
      <span
        aria-hidden="true"
        className={`mt-[0.08em] block font-sans text-[0.4em] font-light italic tracking-[0.08em] ${tone.script}`}
      >
        Weekend
      </span>
    </span>
  );
}

/** Compact horizontal lockup for the header. */
export function LogoMark({
  variant = "white",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const alt = "Mississippi State University Black Alumni Weekend";

  if (LOGO_FILES_PRESENT) {
    const file = LOGO[variant];
    return (
      <Image
        src={file.src}
        alt={alt}
        width={file.width}
        height={file.height}
        sizes="200px"
        priority
        className={className}
      />
    );
  }

  return (
    <span
      className={`flex items-baseline gap-2.5 ${className}`}
      role="img"
      aria-label={alt}
    >
      <span
        aria-hidden="true"
        className="display-xl text-[1.1rem] leading-none text-chalk"
      >
        Black Alumni
      </span>
      <span
        aria-hidden="true"
        className="text-[0.78rem] font-light italic tracking-wide text-wine-glow"
      >
        Weekend
      </span>
    </span>
  );
}
