"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const dd = __importStar(require("dingtalk-jsapi")); // 此方式为整体加载，也可按需进行加载
var BaseEnum;
(function (BaseEnum) {
    BaseEnum["ISDING"] = "ISDING";
    BaseEnum["ISWECHAT"] = "ISWECHAT";
    BaseEnum["EXTRA"] = "EXTRA";
})(BaseEnum || (BaseEnum = {}));
class Base {
    constructor({ config }) {
        this.config = config;
        this.env = Base.currentEnv(window.navigator.userAgent);
        if (this.env === BaseEnum.EXTRA) {
            console.warn("请在合法的环境运行");
            return Object.create(null);
        }
    }
    static currentEnv(ua) {
        if (/DingTalk/.test(ua)) {
            return BaseEnum.ISDING;
        }
        else if (/weichat/.test(ua)) {
            return BaseEnum.ISWECHAT;
        }
        else {
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
    alert(alertConfig) {
        const alertMap = {
            [BaseEnum.ISDING]: dd.device.notification.alert,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            alertMap[this.env](alertConfig);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    /** 获取设备信息 */
    getPhoneInfo(phoneInfoConfig) {
        console.log("===", phoneInfoConfig);
        const phoneInfoMap = {
            [BaseEnum.ISDING]: dd.device.base.getPhoneInfo,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            phoneInfoMap[this.env](phoneInfoConfig);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    /** toast */
    toast(toastConfig) {
        const toastMap = {
            [BaseEnum.ISDING]: dd.device.notification.toast,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            toastMap[this.env](toastConfig);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    /** 提示 */
    notification(config) {
        const configMap = {
            [BaseEnum.ISDING]: dd.device.notification.vibrate,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            configMap[this.env](config);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    showCallMenu(config) {
        const configMap = {
            [BaseEnum.ISDING]: dd.biz.telephone.showCallMenu,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            configMap[this.env](config);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    /** 提示 */
    scan(config) {
        console.log("dd.biz.util.scan", dd.biz.util.scan);
        const configMap = {
            [BaseEnum.ISDING]: dd.biz.util.scan,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            configMap[this.env](config);
        }
        catch (error) {
            console.log("error", error);
        }
    }
    datepicker(config) {
        const configMap = {
            [BaseEnum.ISDING]: dd.biz.util.datepicker,
            [BaseEnum.ISWECHAT]: Base.emptyHandle,
            [BaseEnum.EXTRA]: Base.emptyHandle,
        };
        try {
            configMap[this.env](config);
        }
        catch (error) {
            console.log("error", error);
        }
    }
}
exports.Base = Base;
