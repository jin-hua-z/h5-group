import React from "react";
import { Base } from "../utils/index.js";

export default function HomePage() {
  const base = new Base({ config: {} });
  console.log("base", base, window.navigator);

  return (
    <div>
      <h1>测试调用钉钉API</h1>
      <h2
        onClick={() => {
          base.alert({
            message: "ceshi",
            title: "提示", //可传空
            buttonName: "收到",
            onSuccess: function () {
              //onSuccess将在点击button之后回调
              /*回调*/
            },
            onFail: function (err) {},
          });
        }}
      >
        alert
      </h2>
      <h2
        onClick={() => {
          base.toast({
            message: "ceshi",
            title: "提示", //可传空
            buttonName: "收到",
            onSuccess: function () {
              //onSuccess将在点击button之后回调
              /*回调*/
            },
            onFail: function (err) {},
          });
        }}
      >
        toast
      </h2>
      <h2
        onClick={() => {
          base.notification({
            duration: 300, //震动时间，android可配置 iOS忽略
            onSuccess: function (result) {
              /*
                {}
                */
            },
            onFail: function (err) {},
          });
        }}
      >
        notification
      </h2>
      <h2
        onClick={() => {
          base.showCallMenu({
            phoneNumber: "13677945517", // 期望拨打的电话号码
            code: "+86", // 国家代号，中国是+86
            showDingCall: true, // 是否显示钉钉电话
            onSuccess: function () {},
            onFail: function () {},
          });
        }}
      >
        拨打电话
      </h2>
    </div>
  );
}
