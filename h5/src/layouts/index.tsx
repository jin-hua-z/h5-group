import { Link, Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {

  try {

    let uniqId = 1;
    function getUniqId() {
      return uniqId++;
    }
    const callBackMap = {};
    // 通过该方法就可以在 H5 中调用 dd.alert
    window.native_notify = function (api, params) {
      const callbackId = getUniqId();
      callBackMap[callbackId] = {
        success: function () {
          console.log("成功");
        },
        fail: function () {
          console.log("失败");
        },
      };
      dd.postMessage({
        d_m: api,
        params: {
          ...params,
          callbackId,
        },
      });
    };

    dd.onMessage = function (e) {
      const { callbackId, issuccess } = e;
      const { success, fail } = callBackMap[callbackId];
      delete callBackMap[callbackId];
      issuccess ? success() : fail();
    };
  } catch (error) {

  }
  return (
    <div className={styles.navs}>
      <Outlet />
    </div>
  );
}
