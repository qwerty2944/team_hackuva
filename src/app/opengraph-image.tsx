import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config";

export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #09090b 0%, #27272a 60%, #52525b 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 18,
              background:
                "linear-gradient(135deg, #fafafa 0%, #a1a1aa 100%)",
              color: "#09090b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            Q
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            qwerty2944
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            아이디어에서 라이브 서비스까지, 가능한 한 빨리.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#d4d4d8",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
