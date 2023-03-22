import React from "react";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载

const corpId = "ding3f64ce811c17eb1ba1320dcb25e91351";
const agentId = 2432506129;

export default function HomePage() {
    return (
        <div>
            <a onClick={() => {
                // 调用此接口会返回前端页面的上级浏览页面，如果是H5的根页面，调用此接口会关闭当前浏览窗口。
                dd.biz.navigation.goBack({
                    onSuccess: function (result) {
                    },
                    onFail: function (err) { }
                })
            }}>返回上一级页面(Android,IOS)</a>

            <br></br>

            <a onClick={() => {
                dd.biz.contact.complexPicker({
                    title: "测试标题",            //标题
                    corpId,              //企业的corpId
                    multiple: true,            //是否多选
                    limitTips: "超出了",          //超过限定人数返回提示
                    maxUsers: 1000,            //最大可选人数
                    pickedUsers: [],            //已选用户
                    pickedDepartments: [],          //已选部门
                    disabledUsers: [],            //不可选用户
                    disabledDepartments: [],        //不可选部门
                    requiredUsers: [],            //必选用户（不可取消选中状态）
                    requiredDepartments: [],        //必选部门（不可取消选中状态）
                    appId: agentId,              //微应用Id，企业内部应用查看AgentId
                    permissionType: "xxx",          //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: false,        //返回人，或者返回人和部门
                    startWithDepartmentId: 0,   //仅支持0和-1
                    onSuccess: function (result) {
                        alert(JSON.stringify(result));
                    },
                    onFail: function (err) { }
                });
            }}>
                选择部门和人
            </a>
            <br></br>

            <a onClick={() => {
                dd.biz.navigation.setTitle({
                    title: 'h5测试-子页面',//控制标题文本，空字符串表示显示默认文本}
                });
            }}>设置导航栏标题</a>
            <br></br>
        </div>
    );
}
