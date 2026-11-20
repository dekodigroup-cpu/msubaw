import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: near-black ground, burgundy "B" for Black Alumni Weekend. */
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
          backgroundColor: "#151011",
          color: "#C85767",
          fontSize: 44,
          fontWeight: 700,
          fontFamily: "Helvetica, Arial, sans-serif",
          letterSpacing: -1,
        }}
      >
        B
      </div>
    ),
    size,
  );
}
