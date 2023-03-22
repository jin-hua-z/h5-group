import routes from "./routes";

export default {
  headScripts: [
    `https://g.alicdn.com/code/npm/@ali/dingtalk-h5-remote-debug-sdk/0.1.4/app.bundle.js">`,
    `h5RemoteDebugSdk.init({
      uuid: "18ffdbd7-2a42-4269-ab8c-0def62771d11",
          observerElement: document.documentElement,
    });`,
  ],
  routes,
};
