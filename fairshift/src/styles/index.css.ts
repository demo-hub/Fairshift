import { style } from "@vanilla-extract/css";

export const title = style({
  margin: 0,
  lineHeight: 1,
  fontSize: "3rem",
  fontWeight: 800,
  color: "white",
  letterSpacing: "-0.025em",

  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "5rem",
    },
  },
});

export const pinkSpan = style({
  color: "#da627d",
});

export const cardRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  gap: "1rem",

  "@media": {
    "screen and (min-width: 768px)": {
      gap: "2rem",
    },
  },
});

export const card = style({
  backgroundColor: "rgb(255 255 255 / 0.1)",
  padding: "1rem",
  borderRadius: "0.75rem",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  cursor: "pointer",
  maxWidth: "20rem",

  ":hover": {
    backgroundColor: "rgb(255 255 255 / 0.2)",
    transition: "background-color 150ms cubic-bezier(0.5, 0, 0.2, 1)",
  },
});

export const cardTitle = style({
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: 700,
  lineHeight: 2,
});

export const cardText = style({
  fontSize: "1.125rem",
  lineHeight: 1.75,
});

export const showcaseContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
});

export const showcaseText = style({
  color: "white",
  fontSize: "1.5rem",
  textAlign: "center",
  lineHeight: 2,
});
