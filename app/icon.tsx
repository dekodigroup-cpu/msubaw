import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: maroon ground, brass "M". */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4a0f14",
          color: "#e0b367",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          letterSpacing: -1,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
