import React from "react";
import yayJpg from "../assets/yay.jpg";
// import { Base } from "../utils/index.js";
import { Base } from "sdk";

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
          dd.biz.telephone.showCallMenu({
            phoneNumber: "13677945517", // 期望拨打的电话号码
            code: "+86", // 国家代号，中国是+86
            showDingCall: true, // 是否显示钉钉电话
            onSuccess: function () {},
            onFail: function () {},
          });
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
      <h2
        onClick={() => {
          base.toast({
            icon: "", //icon样式，不同客户端参数不同，请参考参数说明
            text: "demo", //提示信息
            duration: 1000, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
            delay: 1000, //延迟显示，单位秒，默认0
            onSuccess: function (result) {
              /*{}*/
            },
            onFail: function (err) {},
          });
        }}
      >
        toast
      </h2>
    </div>
  );
}
