import React from "react";
import { Base } from "../../../sdk/src/index";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载


export default function HomePage() {
  const base = new Base({ config: { appkey: 'dingwvlcv9mozf0x8t8q', appsecret: 'DbnAUZuc1U6uwV2r9HzNq4FrD5A2l8QNhSUpgFOy9wMReZIm8BcxPhmgdUgOpwSe' } });
  return (
    <div>
      <h1>测试调用钉钉API</h1>
      <input type="file" />
      <h2>
        <a
          onClick={() => {
            base.alert({
              message: "ceshi",
              title: "提示", //可传空
              buttonName: "收到",
              onSuccess: function () {
                //onSuccess将在点击button之后回调
                /*回调*/
              },
              onFail: function (err) { },
            });
          }}
        >
          alert
        </a>
      </h2>
      <h2>
        <a
          onClick={() => {
            base.toast({
              message: "ceshi",
              title: "提示", //可传空
              buttonName: "收到",
              onSuccess: function () {
                //onSuccess将在点击button之后回调
                /*回调*/
              },
              onFail: function (err) { },
            });
          }}
        >
          toast
        </a>
      </h2>
      <h2>
        <a
          onClick={() => {
            base.notification({
              duration: 300, //震动时间，android可配置 iOS忽略
              onSuccess: function (result) {
                /*
                {}
                */
              },
              onFail: function (err) { },
            });
          }}
        >
          notification
        </a>
      </h2>
      <h2>
        <a
          onClick={() => {
            try {
              base.showCallMenu({
                phoneNumber: "10000", // 期望拨打的电话号码
                code: "+86", // 国家代号，中国是+86
                showDingCall: false, // 是否显示钉钉电话
                onSuccess: function () { },
                onFail: function (err) {
                  alert(JSON.stringify(err));
                },
              });
            } catch (error) {
              base.alert({
                message: "ceshi",
                title: "提示", //可传空
                buttonName: "收到",
                onSuccess: function () {
                  //onSuccess将在点击button之后回调
                  /*回调*/
                },
                onFail: function (err) { },
              });
            }
          }}
        >
          拨打电话-需要授权
        </a>
      </h2>
      <h2>
        <a
          onClick={() => {
            alert(JSON.stringify(dd));
            base.scan({
              type: String, // type 为 all、qrCode、barCode，默认是all。
              onSuccess: function (data) {
                //onSuccess将在扫码成功之后回调
                /* data结构
                  { 'text': String}
                */
              },
              onFail: function (err) { },
            });
          }}
        >
          扫码
        </a>
      </h2>
      <h2
        onClick={() => {
          base.datepicker({
            format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
            value: "2015-04-17", //默认显示日期
            onSuccess: function (result) {
              //onSuccess将在点击完成之后回调
              /*{
            value: "2015-02-10"
        }
        */
            },
            onFail: function (err) { },
          });
        }}
      >
        datepicker
      </h2>

      <h2
        onClick={() => {
          base.chooseImage({
            count: 1, // 最多可以选择几张图片，默认9
            sourceType: ["camera", "album"], // 可以指定来源是相册还是相机，默认二者都有
            onSuccess: function (result) {
              //onSuccess将在选择图片成功之后回调
              alert(JSON.stringify(result));
            },
            onFail: function (err) {
              alert(JSON.stringify(err));
            },
          });
        }}
      >
        chooseImage
      </h2>
    </div>
  );
}
