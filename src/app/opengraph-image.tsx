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
          backgroundColor: "#0F1B2D",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#D4A837",
          }}
        >
          ClauseIt
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            color: "#FAF9F6",
            marginTop: 16,
          }}
        >
          Read the clauses, not the fine print.
        </div>
      </div>
    ),
    size
  );
}
