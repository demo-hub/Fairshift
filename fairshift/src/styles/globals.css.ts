import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("*", {
  boxSizing: "border-box",
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundImage: "linear-gradient(to bottom, #2e026d, #15162c)",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "3rem",
  padding: "4rem 1rem",
  width: "100%",

  "@media": {
    "screen and (min-width: 640px)": {
      width: "640px",
    },
    "screen and (min-width: 768px)": {
      width: "768px",
    },
    "screen and (min-width: 1024px)": {
      width: "1024px",
    },
    "screen and (min-width: 1280px)": {
      width: "1280px",
    },
    "screen and (min-width: 1536px)": {
      width: "1536px",
    },
  },
});
