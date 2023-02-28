import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import { IBizTelephoneShowCallMenuParams } from "dingtalk-jsapi/api/biz/telephone/showCallMenu";
enum BaseEnum {
  ISDING = "ISDING",
  ISWECHAT = "ISWECHAT",
  EXTRA = "EXTRA",
}

export class Base {
  config: any;
  env: BaseEnum;
  constructor({ config }: { config: any }) {
    this.config = config;
    this.env = Base.currentEnv(window.navigator.userAgent);
    if (this.env === BaseEnum.EXTRA) {
      console.warn("请在合法的环境运行");
      return Object.create(null);
    }
  }
  static currentEnv(ua: string) {
    if (/DingTalk/.test(ua)) {
      return BaseEnum.ISDING;
    } else if (/weichat/.test(ua)) {
      return BaseEnum.ISWECHAT;
    } else {
      return BaseEnum.EXTRA;
    }
  }
  /**  没有对应的调用方法 */
  static emptyHandle() {
    console.warn("没有对应的调用方法");
    alert("没有对应的调用方法");
  }
  /** 共同的API */
  /** alert */
  alert(alertConfig: any) {
    const alertMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.device.notification.alert,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      alertMap[this.env](alertConfig);
    } catch (error) {
      console.log("error", error);
    }
  }
  /** 获取设备信息 */
  getPhoneInfo(phoneInfoConfig: any) {
    console.log("===", phoneInfoConfig);

    const phoneInfoMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.device.base.getPhoneInfo,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      phoneInfoMap[this.env](phoneInfoConfig);
    } catch (error) {
      console.log("error", error);
    }
  }
  /** toast */
  toast(toastConfig: any) {
    const toastMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.device.notification.toast,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      toastMap[this.env](toastConfig);
    } catch (error) {
      console.log("error", error);
    }
  }
  /** 提示 */
  notification(config: any) {
    const configMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.device.notification.vibrate,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      configMap[this.env](config);
    } catch (error) {
      console.log("error", error);
    }
  }

  showCallMenu(config: IBizTelephoneShowCallMenuParams) {
    const configMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.biz.telephone.showCallMenu,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      configMap[this.env](config);
    } catch (error) {
      console.log("error", error);
    }
  }
  /** 提示 */
  scan(config: any) {
    console.log("dd.biz.util.scan", dd.biz.util.scan);

    const configMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.biz.util.scan,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      configMap[this.env](config);
    } catch (error) {
      console.log("error", error);
    }
  }
  datepicker(config: any) {
    const configMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: dd.biz.util.datepicker,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      configMap[this.env](config);
    } catch (error) {
      console.log("error", error);
    }
  }
}
