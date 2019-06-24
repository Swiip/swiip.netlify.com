import { useState, useRef, useEffect } from "preact/hooks";

import html from "../html";
import style, { mediaSmall } from "../style";

import { spin } from "./animations";

const CardsContainer = style("article")({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden"
});

const CardsScroll = style("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  overflow: "hidden",
  [mediaSmall]: {
    height: "auto",
    flexDirection: "column"
  }
});

const Arrow = style("button")(({ show }) => ({
  flex: "0 0 80px",
  fontSize: "50px",
  transition: "opacity .3s",
  opacity: show ? "1" : "0",
  ":hover": {
    animation: `${spin} 1s`
  },
  [mediaSmall]: {
    display: "none"
  }
}));

const Cards = ({ children, loaded }) => {
  const scrollRef = useRef();
  const [showArrows, setShowArrows] = useState([false, false]);

  const getArrows = () => {
    const element = scrollRef.current.base;
    const scrollValue = element.scrollLeft;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    return [scrollValue > 0, scrollValue < maxScrollLeft];
  };

  useEffect(() => {
    if (loaded === true) {
      setShowArrows(getArrows());
    }
  }, [loaded]);

  const scroll = direction => () => {
    const element = scrollRef.current.base;
    element.scrollBy({
      left: (direction * element.clientWidth * 80) / 100,
      behavior: "smooth"
    });
    setTimeout(() => setShowArrows(getArrows()), 500);
  };

  return html`
    <${CardsContainer}>
      <${Arrow} onClick=${scroll(-1)} show=${loaded && showArrows[0]}>
        ${"<"}
      <//>
      <${CardsScroll} ref=${scrollRef}>
        ${children}
      <//>
      <${Arrow} onClick=${scroll(1)} show=${loaded && showArrows[1]}>
        ${">"}
      <//>
    <//>
  `;
};

export default Cards;
