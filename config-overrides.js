const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@base-color": "#333",
        "@dropdown-link-active-color": "#1b262c",
        "@dropdown-bg": "#eee",
      },
    },
  })
);
