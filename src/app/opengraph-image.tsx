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
          backgroundColor: "#0A1A34",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#FBF9F4",
          }}
        >
          Clause
          <span style={{ color: "#C79A3E" }}>It</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#E0B75A",
            marginTop: 16,
            letterSpacing: 2,
          }}
        >
          READ THE CLAUSES, NOT THE FINE PRINT.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#D8CFB8",
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
