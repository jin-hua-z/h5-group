declare enum BaseEnum {
    ISDING = "ISDING",
    ISWECHAT = "ISWECHAT",
    EXTRA = "EXTRA"
}
export declare class Base {
    config: any;
    env: BaseEnum;
    constructor({ config }: {
        config: any;
    });
    static currentEnv(ua: string): BaseEnum;
    /**  没有对应的调用方法 */
    static emptyHandle(): void;
    /** 共同的API */
    /** alert */
    alert(alertConfig: any): void;
    /** 获取设备信息 */
    getPhoneInfo(phoneInfoConfig: any): void;
    /** toast */
    toast(toastConfig: any): void;
    /** 提示 */
    notification(config: any): void;
    showCallMenu(config: any): void;
}
export {};
//# sourceMappingURL=sdk.d.ts.map