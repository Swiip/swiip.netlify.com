import html from "../html";
import style, { mediaSmall } from "../style";

const Header = style("header")({
  display: "flex",
  flexDirection: "row",
  [mediaSmall]: {
    flexDirection: "column"
  }
});

const Title = style("h1")({
  flex: "1",
  ":hover button": {
    textShadow: "0px 0px 4px white"
  },
  [mediaSmall]: {
    textAlign: "center"
  }
});

const TitleButton = style("button")({
  fontSize: "40px",
  fontWeight: "normal",
  whiteSpace: "nowrap",
  transition: "text-shadow .3s",
  [mediaSmall]: {
    fontSize: "35px",
    whiteSpace: "normal"
  }
});

const Nav = style("nav")({
  width: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const NavItems = style("ul")({
  listStyle: "none",
  padding: "0",
  margin: "0",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap"
});

const NavItem = style("li")({
  ":after": {
    content: "''",
    display: "block",
    width: "0",
    height: "2px",
    background: "white",
    transition: "width .3s"
  },
  ":hover:after": {
    width: "100%"
  }
});

const NavButton = style("button")({
  padding: "10px",
  lineHeight: "30px"
});

const HeaderComponent = ({ setContent }) => html`
  <${Header}>
    <${Title}>
      <${TitleButton} onClick=${() => setContent("home")}>
        Swiip's home page
      <//>
    <//>
    <${Nav}>
      <${NavItems}>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("medium")}>Blog<//>
        <//>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("github")}>Code<//>
        <//>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("jobs")}>Jobs<//>
        <//>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("talks")}>Talks<//>
        <//>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("twitter")}>News<//>
        <//>
        <${NavItem}>
          <${NavButton} onClick=${() => setContent("about")}>About<//>
        <//>
      <//>
    <//>
  <//>
`;

export default HeaderComponent;
