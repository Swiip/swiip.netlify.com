import html from "../html";
import style from "../style";

import { cascading, bounceInRight, outLeft } from "./animations";

const CardContainer = style("section")(({ exiting }) =>
  cascading(
    {
      width: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: "0",
      animation: exiting
        ? `${outLeft} .3s forwards`
        : `${bounceInRight} .3s forwards`,
      height: "100%",
      flex: "0 0 300px"
    },
    0
  )
);

const ImageContainer = style("div")({
  padding: "20px",
  width: "300px",
  height: "200px"
});

const ImageBox = style("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden"
});

const Image = style("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform .3s"
});

const Break = style("hr")({
  width: "95%",
  opacity: ".3",
  transition: "opacity .3s"
});

const Title = style("h3")(({ show }) => ({
  display: show ? "block" : "none",
  padding: "20px",
  margin: "0",
  height: "100px",
  fontWeight: "normal",
  textAlign: "center",
  transition: "transform .3s"
}));

const Description = style("p")(({ noTitle }) => ({
  padding: "20px",
  margin: "0",
  height: noTitle ? "200px" : "100px",
  fontSize: "16px",
  opacity: noTitle ? "1" : "0.5"
}));

const ClickZone = style("a")({
  margin: "0",
  ":hover img": {
    transform: "scale(1.2)"
  },
  ":hover hr": {
    opacity: "1"
  },
  ":hover h3": {
    transform: "scale(1.2)"
  }
});

const Card = ({ title, image, link, description, exiting }) => html`
  <${CardContainer} exiting=${exiting}>
    <${ClickZone} href=${link} target="_blank" draggable=${false}>
      <${ImageContainer}>
        <${ImageBox}>
          <${Image} src=${image} alt=${title} draggable=${false} />
        <//>
      <//>
      <${Break} />
      <${Title} draggable=${false} show=${title !== null}>${title}<//>
      <${Description} draggable=${false} noTitle=${title === null}>
        ${description}
      <//>
    <//>
  <//>
`;

export default Card;
