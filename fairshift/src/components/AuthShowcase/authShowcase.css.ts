import { style } from "@vanilla-extract/css";

export const authContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "center",
});

export const userContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
