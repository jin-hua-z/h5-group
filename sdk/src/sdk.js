import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载

export class Base {
  constructor({ config, ua }) {
    this.config = config;
    this.env = Base.currentEnv(ua);
    if (this.env === false) {
      console.warn("请在合法的环境运行");
      return null;
    }
  }
  static currentEnv(ua) {
    if (/DingTalk/.test(ua)) {
      return "ISDING";
    } else if (/weichat/.test(ua)) {
      return "ISWECHAT";
    } else {
      return false;
    }
  }
  /** 共同的API */
  alert(alertConfig) {
    const alertMap = {
      ISDING: dd.device.notification.alert,
    };
    try {
      alertMap[this.env](alertConfig);
    } catch (error) {
      console.log("error", error);
    }
  }
}
