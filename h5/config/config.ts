import routes from "./routes";

export default {
  headScripts: [
    `https://g.alicdn.com/code/npm/@ali/dingtalk-h5-remote-debug-sdk/0.1.4/app.bundle.js">`,
    `h5RemoteDebugSdk.init({
      uuid: "d2e2bf97-ce95-4fab-a442-67d2a50af4ec",
      observerElement: document.documentElement,
    });`,
  ],
  routes,
};
