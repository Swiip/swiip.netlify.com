import html from "../html";
import style from "../style";

import { cascading, bounceInRight, outLeft } from "./animations";

const Container = style("article")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Line = style("h2")(({ exiting }) =>
  cascading(
    {
      fontSize: "35px",
      fontWeight: "normal",
      textAlign: "center",
      whiteSpace: "nowrap",
      margin: "10px 0",
      opacity: "0",
      animation: exiting ? `${outLeft} .3s` : `${bounceInRight} .3s forwards`
    },
    exiting ? 0 : 3
  )
);

const Home = ({ exiting }) => html`
  <${Container}>
    <${Line} exiting=${exiting}>Web Developer.<//>
    <${Line} exiting=${exiting}>Trainer.<//>
    <${Line} exiting=${exiting}>Speaker.<//>
  <//>
`;

export default Home;
