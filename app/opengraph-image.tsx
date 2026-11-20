import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE, NEXT_WEEKEND } from "@/lib/site";

export const alt = `${SITE.legalName}, ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card in the dark brand language. */
export default async function Image() {
  const grotesk = await readFile(
    join(process.cwd(), "assets/space-grotesk-latin-700-normal.woff"),
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
          padding: "68px 76px",
          backgroundColor: "#151011",
          backgroundImage:
            "radial-gradient(90% 80% at 14% 4%, #5A1725 0%, #151011 62%)",
          color: "#F8F6F3",
          fontFamily: "Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 2, backgroundColor: "#C85767" }} />
          <div
            style={{
              fontSize: 19,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#C85767",
            }}
          >
            Mississippi State University
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.88,
              letterSpacing: -5,
              textTransform: "uppercase",
            }}
          >
            Black
          </div>
          <div
            style={{
              fontSize: 118,
              lineHeight: 0.88,
              letterSpacing: -5,
              textTransform: "uppercase",
            }}
          >
            Alumni
          </div>
          <div
            style={{
              fontSize: 42,
              marginTop: 10,
              letterSpacing: 2,
              color: "#D8CFC8",
            }}
          >
            Weekend
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(248,246,243,0.18)",
            paddingTop: 26,
            fontSize: 25,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: "#C85767", fontSize: 17, letterSpacing: 4 }}>
              NEXT REUNION
            </div>
            <div>{`${NEXT_WEEKEND.hashtag}, ${NEXT_WEEKEND.dateDisplay}`}</div>
          </div>
          <div style={{ color: "#9A8F88" }}>msubaw.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Grotesk", data: grotesk, style: "normal", weight: 700 }],
    },
  );
}
