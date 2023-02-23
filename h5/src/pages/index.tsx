import React from "react";
import yayJpg from "../assets/yay.jpg";
import { Base } from "../utils/main.js";

export default function HomePage() {
  const base = new Base({ config: {}, ua: window.navigator.userAgent });
  console.log("base", base, window.navigator);

  return (
    <div>
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
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
