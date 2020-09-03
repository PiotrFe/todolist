const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@base-color": "#333",
        "@dropdown-link-active-color": "#ff3366",
        "@dropdown-bg": "#eee",
        "@sidenav-default-hover-bg": "#ff3366",
        "@sidenav-default-width": "56px",
        "@sidenav-collapse-in-width": "100%",
        "@btn-ghost-color": "#000",
        "@btn-ghost-border-color": "#000",
        // "@toggle-default-bg": "#f7f7fa"
      },
    },
  })
);
