/* eslint-disable no-param-reassign */

import { keyframes } from "../style";

const cascadingDepth = 5;

export const cascading = (style, offset, prefix = "&") => {
  for (let i = 0; i < cascadingDepth; i += 1) {
    style[`${prefix}:nth-child(${i + 1})`] = {
      animationDelay: `.${offset + i}s`
    };
  }
  if (!style.prefix) {
    style.prefix = {};
  }
  style.prefix.animationDelay = `.${offset + cascadingDepth}s`;
  return style;
};

export const bounceInRight = keyframes({
  from: {
    opacity: "0",
    transform: "translate3d(300px, 0, 0)"
  },

  "75%": {
    opacity: "1",
    transform: "translate3d(-10px, 0, 0)"
  },

  to: {
    opacity: "1",
    transform: "translate3d(0, 0, 0)"
  }
});

export const outLeft = keyframes({
  from: {
    opacity: "1",
    transform: "translate3d(0, 0, 0)"
  },

  to: {
    opacity: "0",
    transform: "translate3d(-300px, 0, 0)"
  }
});

export const spin = keyframes({
  "80%": {
    transform: "rotate(400deg)"
  },

  to: {
    transform: "rotate(360deg)"
  }
});
