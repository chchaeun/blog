// env-config.js
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  "process.env.BACKEND_URL": !debug ? "https://chchaeun.github.io/blog" : "",
};

// .babelrc.js
const env = require("./env-config");

module.exports = {
  presets: ["next/babel"],
  plugins: [["transform-define", env]],
};
