import html from "../html";
import style, { mediaSmall } from "../style";

import { cascading, bounceInRight, outLeft } from "./animations";

const Container = style("article")(({ exiting }) =>
  cascading(
    {
      width: "800px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      "& > *": {
        animation: exiting ? `${outLeft} .3s` : `${bounceInRight} .3s forwards`
      },
      [mediaSmall]: {
        width: "90%"
      }
    },
    exiting ? 0 : 3,
    "& > *"
  )
);

const Title = style("h2")({
  fontSize: "35px",
  fontWeight: "normal",
  margin: "10px 0",
  opacity: "0"
});

const Line = style("p")({
  fontSize: "20px",
  margin: "10px 0",
  opacity: "0",
  wordBreak: "break-word",
  "& a": {
    textDecoration: "underline"
  }
});

const About = ({ exiting }) => html`
  <${Container}>
    <${Title} exiting=${exiting}>
      Contact:
    <//>
    <${Line} exiting=${exiting}>
      On Twitter${" "}
      <a href="https://twitter.com/Swiip" target="_blank">
        @Swiip
      </a>
      ${" "}or by mail${" "}
      <a href="mailto:matthieu.lux@gmail.com">
        matthieu.lux@gmail.com
      </a>
    <//>
    <${Title} exiting=${exiting}>The Website:<//>
    <${Line} exiting=${exiting}>
      This website is an experimentation about Web standards and JavaScript
      minimalism. It's fully built client side with a total weight of 10kB on
      the wire!
    <//>
    <${Line} exiting=${exiting}>
      Powered by${" "}
      <a href="https://www.netlify.com" target="_blank">Netlify</a>
      ${" "} platform and${" "}
      <a href="https://preactjs.com/" target="_blank">Preact</a>. The code is
      Open Source and available on${" "}
      <a href="https://github.com/Swiip/swiip.netlify.com" target="_blank">
        https://github.com/Swiip/swiip.netlify.com
      </a>
    <//>
  <//>
`;

export default About;
