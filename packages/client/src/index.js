import { render } from "preact";
import { useState } from "preact/hooks";
import html from "./html";

import Background from "./components/background";
import Header from "./components/header";
import Main from "./components/main";

const App = () => {
  const [content, setContent] = useState("home");

  return html`
    <${Background}>
      <${Header} setContent=${setContent} />
      <${Main} content=${content} />
    <//>
  `;
};

render(
  html`
    <${App} />
  `,
  document.body
);
