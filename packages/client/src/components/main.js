import { useState, useEffect } from "preact/hooks";

import html from "../html";
import style from "../style";

import Home from "./home";
import About from "./about";
import Content from "./content";

const Main = style("main")({
  height: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Powered = style("a")(({ show }) => ({
  margin: "10px",
  opacity: show ? "1" : "0",
  transition: "opacity .5s"
}));

const powereds = {
  medium: {
    link: "https://medium.com/@Swiip_51904",
    text: "Powered by Medium data (@Swiip_51904)"
  },
  github: {
    link: "https://github.com/Swiip",
    text: "Powered by GitHub data (@Swiip)"
  },
  jobs: {
    link: "https://www.linkedin.com/in/swiip/",
    text: "Powered by Contentful, more on LinkedIn"
  },
  talks: {
    link: "https://www.contentful.com/",
    text: "Powered by Contentful"
  },
  twitter: {
    link: "https://twitter.com/Swiip",
    text: "Powered by Twitter data (@Swiip)"
  }
};

const MainComponent = ({ content }) => {
  const [type, setType] = useState("home");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (content !== type) {
      setExiting(true);
      setTimeout(() => {
        setType(content);
        setExiting(false);
      }, 500);
    }
  }, [content]);

  return html`
    <${Main}>
      ${type === "home" &&
        html`
          <${Home} exiting=${exiting} />
        `}
      ${type === "about" &&
        html`
          <${About} exiting=${exiting} />
        `}
      ${type !== "home" &&
        type !== "about" &&
        html`
          <${Content} type=${type} exiting=${exiting} />
        `}
      <${Powered}
        show=${powereds[type] && !exiting}
        href=${powereds[type] && powereds[type].link}
        target="_blank"
      >
        ${powereds[type] && powereds[type].text}
      <//>
    <//>
  `;
};

export default MainComponent;
