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
          backgroundColor: "#0F172A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            background: "linear-gradient(to right, #0052FF, #4D7CFF)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ClauseIt
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#FAFAFA",
            marginTop: 16,
          }}
        >
          Read the clauses, not the fine print.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#64748B",
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
