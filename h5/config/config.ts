import routes from "./routes";

export default {
  headScripts: [
    `https://g.alicdn.com/code/npm/@ali/dingtalk-h5-remote-debug-sdk/0.1.4/app.bundle.js`,
    `h5RemoteDebugSdk.init({
      uuid: "91d2b0d1-1630-41f8-a5e4-91cbdd6236db",
      observerElement: document.documentElement,
    });`,
    "https://appx/web-view.min.js",
  ],
  routes,
  // MFSU: false,
};
