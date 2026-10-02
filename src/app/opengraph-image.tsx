import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#FFFFFF",
          backgroundColor: "#060B22",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(37,99,255,0.55), transparent 45%), radial-gradient(circle at 95% 95%, rgba(166,51,255,0.5), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            We Build Ideas
          </div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1.05 }}>
            Into Companies.
          </div>
          <div style={{ marginTop: 36, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
