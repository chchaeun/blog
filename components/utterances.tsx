import React, { useEffect } from "react";

const Utterances = () => {
  useEffect(() => {
    const elem = document.querySelector("section");
    const scriptElem = document.createElement("script");
    scriptElem.src = "https://utteranc.es/client.js";
    scriptElem.async = true;
    scriptElem.setAttribute("repo", "chchaeun/blog");
    scriptElem.setAttribute("issue-term", "pathname");
    scriptElem.setAttribute("theme", "github-light");
    scriptElem.setAttribute("label", "blog-comment");
    scriptElem.crossOrigin = "anonymous";

    const prevScript = document.querySelector("section > script");
    if (!prevScript) {
      elem?.appendChild(scriptElem);
    }
  }, []);
  return <section />;
};

export default Utterances;
