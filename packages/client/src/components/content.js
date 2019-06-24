import { useState, useEffect } from "preact/hooks";
import html from "../html";

import Cards from "./cards";
import Card from "./card";

const Content = ({ type, exiting }) => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    setItems([]);
    const itemsRequest = await fetch(`/api/${type}`);
    const itemsServer = await itemsRequest.json();
    setItems(itemsServer);
  }, [type]);

  return html`
    <${Cards} loaded=${items.length > 0}>
      ${items.map(
        item =>
          html`
            <${Card}
              title=${item.title}
              image=${item.image}
              link=${item.link}
              description=${item.description}
              exiting=${exiting}
            />
          `
      )}
    <//>
  `;
};

export default Content;
