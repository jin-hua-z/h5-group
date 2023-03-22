import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import { IBizTelephoneShowCallMenuParams } from "dingtalk-jsapi/api/biz/telephone/showCallMenu";
import { getConfigData } from "./api/dd";
import { initCloud } from "@wxcloud/cloud-sdk";

const cloud = initCloud();
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
    // const cloud = initCloud();
    // console.log("cloud", cloud);
    if (this.env === BaseEnum.EXTRA) {
      console.warn("请在合法的环境运行");
      console.log("当前环境浏览器");
      // return Object.create(null);
    } else if (this.env === BaseEnum.ISDING) {
      // this.sdkAuthorize();
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
  /** sdk授权 */
  sdkAuthorize() {
    const authorizeMap: Record<BaseEnum, any> = {
      [BaseEnum.ISDING]: () => {
        getConfigData(this.config).then((res) => {
          const { agentId, timeStamp, nonceStr, signature } = res;
          const corpId = "ding3f64ce811c17eb1ba1320dcb25e91351";
          dd.config({
            agentId, // 必填，微应用ID
            corpId, //必填，企业ID
            timeStamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，自定义固定字符串。
            signature, // 必填，签名
            // type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            jsApiList: [
              "runtime.info",
              "biz.contact.choose",
              "device.notification.confirm",
              "device.notification.alert",
              "device.notification.prompt",
              "biz.ding.post",
              "biz.util.openLink",
              "biz.util.chooseImage",

              "biz.contact.complexPicker", //通讯录选人
              "biz.contact.rolesPicker", //通讯录选角色
              "biz.clipboardData.setData", //复制到粘贴板
              "biz.chat.chooseConversationByCorpId", //选择会话
              "biz.telephone.call", //拨打钉钉电话
              "biz.telephone.showCallMenu", //拨打电话

              "biz.customContact.choose", //单选自定义联系人

              "biz.ding.create", // DING 2.0 发钉
              "device.geolocation.get", //获取当前地理位置信息（单次定位）
              "biz.map.locate", //地图定位

              "device.audio.startRecord", //开始录音
              "device.audio.stopRecord", //停止录音
              "device.audio.play", //播放录音
              "device.audio.download", //下载录音

              "biz.util.open", //打开应用内页面
              "biz.auth.requestAuthInfo", // 授权获取审批实例数据
            ], // 必填，需要使用的jsapi列表，注意：不要带dd。
          });
          dd.error(function (err) {
            alert("dd error: " + JSON.stringify(err));
          }); //该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
        });
      },
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      authorizeMap[this.env]();
    } catch (error) {
      console.log("error", error);
    }
  }

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

  // 选择图片
  chooseImage(config: any) {
    console.log(dd.biz.util);

    const configMap: Record<BaseEnum, any> = {
      // [BaseEnum.ISDING]: dd.biz.util.uploadImage,
      [BaseEnum.ISDING]: dd.biz.util.chooseImage,
      [BaseEnum.ISWECHAT]: Base.emptyHandle,
      [BaseEnum.EXTRA]: Base.emptyHandle,
    };
    try {
      configMap[this.env](config);
    } catch (error) {
      console.log("error", error);
    }
  }

  checkJsApi() {}
}
