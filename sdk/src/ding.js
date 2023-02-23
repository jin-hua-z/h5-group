import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载

function ddGetPhoneInfo() {
  return dd.device.base.getPhoneInfo({
    onSuccess: function (data) {
      /*
      {
          screenWidth: 1080, // 手机屏幕宽度
          screenHeight: 1920, // 手机屏幕高度
          brand:'Mi', // 手机品牌
          model:'Note4', // 手机型号
          version:'7.0', // 版本
          netInfo:'wifi', // 网络类型 wifi／4g／3g
          operatorType:'xx' // 运营商信息
      }
      */
      console.log("data", data);
      ddAlert(data);
    },
    onFail: function (err) {
      console.log("err", err);
    },
  });
}
function ddAlert(params) {
  dd.device.notification.alert({
    message: params,
    title: "提示", //可传空
    buttonName: "收到",
    onSuccess: function () {
      //onSuccess将在点击button之后回调
      /*回调*/
    },
    onFail: function (err) {},
  });
}
const idx = {
  ddGetPhoneInfo,
  ddAlert,
};
export default idx;
