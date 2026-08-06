import { ImageResponse } from "next/og";

export const alt =
  "ClauseIt — Read the clauses, not the fine print";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1E1B4B, #4C1D95)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            background: "linear-gradient(120deg, #A78BFA, #F472B6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ClauseIt
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#FBBF24",
            marginTop: 16,
            letterSpacing: 2,
            fontWeight: 600,
          }}
        >
          READ THE CLAUSES, NOT THE FINE PRINT.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#DDD6FE",
            marginTop: 20,
          }}
        >
          Loan · Insurance · Rent · Job offers — explained in plain language
        </div>
      </div>
    ),
    size
  );
}
