import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE, NEXT_WEEKEND } from "@/lib/site";

export const alt = `${SITE.name}, ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card, set in the same letterpress language as the site. */
export default async function Image() {
  const besley = await readFile(
    join(process.cwd(), "assets/besley-latin-600-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#3b0d12",
          backgroundImage:
            "radial-gradient(120% 90% at 10% 0%, #5c1620 0%, #3b0d12 60%)",
          color: "#faf6f0",
          fontFamily: "Besley",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 2, backgroundColor: "#e0b367" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#e0b367",
            }}
          >
            Mississippi State University
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -2 }}>
            Celebrating
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#e0b367",
              fontStyle: "italic",
            }}
          >
            Black Accomplishment
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(250,246,240,0.22)",
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: "#e0b367", fontSize: 19, letterSpacing: 4 }}>
              NEXT REUNION
            </div>
            <div>{`${NEXT_WEEKEND.label}, ${NEXT_WEEKEND.dateDisplay}`}</div>
          </div>
          <div style={{ color: "#dec9b8" }}>msubaw.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Besley", data: besley, style: "normal", weight: 600 }],
    },
  );
}
