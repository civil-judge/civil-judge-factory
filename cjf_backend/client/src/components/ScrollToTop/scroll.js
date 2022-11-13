import { ArrowUpward } from "@material-ui/icons";
import React from "react";

export const Scroll = () => {
  const pathname = window.location.pathname;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(pathname);

  if (
    pathname == "/admin" ||
    pathname == "/dashboard" ||
    pathname == "/mocktest" ||
    pathname == "/comingsoon" ||
    pathname == "/profile"
  )
    return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 38,
        width: 38,
        borderRadius: "50%",
        backgroundColor: "#2a5884",
        cursor: "pointer",
        boxShadow: ["0px 2px 4px 0px rgba(0, 0, 0, 0.2)"],
      }}
      onClick={scrollTop}
    >
      <ArrowUpward />
    </div>
  );
};
