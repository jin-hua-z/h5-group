import React, { useState } from "react";
import { Base } from "../../../sdk/src/index";
import { history } from 'umi';
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
import axios from 'axios';


const corpId = "ding3f64ce811c17eb1ba1320dcb25e91351";
const agentId = 2432506129;


export default function HomePage() {
  const [imgUrl, setImgUrl] = useState('');
  // appkey,appsecret 应用凭证
  const base = new Base({ config: { appkey: 'dingwvlcv9mozf0x8t8q', appsecret: 'DbnAUZuc1U6uwV2r9HzNq4FrD5A2l8QNhSUpgFOy9wMReZIm8BcxPhmgdUgOpwSe', url: window.location.href } });
  return (
    <div>
      <h1>测试微信API</h1>
      <a onClick={() => {
        base.sdkAuthorize();
      }}>微信授权</a>

      <h1>钉钉小程序通过postMessage通信</h1>
      <a onClick={() => {
        window.native_notify('alert', {
          title: "h5通过postMessage桥接打开的",
          content: "h5通过postMessage桥接打开的",
          buttonText: "我知道了",
        });
      }}>alert</a>

      <a onClick={() => {
        window.native_notify('alert');
      }}>alert</a>
      <h1>测试调用钉钉API</h1>
      <h2 onClick={() => {
        base.sdkAuthorize();
      }}>钉钉JS SDK授权</h2>

      <h2>设备</h2>
      <>
        <a onClick={() => {
          base.getPhoneInfo({
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) { },
          });
        }}>获取手机基础信息</a>
        <br></br>

        <a onClick={() => {
          dd.device.base.getWifiStatus({
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) { },
          })
        }}>获取wifi状态</a>
        <br></br>

        <a onClick={() => {
          // ios下只能进入到 钉钉设置页面
          dd.device.base.openSystemSetting();
        }}>打开iOS系统设置</a>
        <br></br>
        <a onClick={() => {
          dd.device.base.openSystemSetting({
            // https://developer.android.com/reference/android/provider/Settings?spm=ding_open_doc.document.0.0.596e63c6pqMXTE
            action: "android.settings.BLUETOOTH_SETTINGS",
          });
        }}>打开Android系统设置 蓝牙</a>
        <br></br>
      </>

      <h2>日期和月历</h2>
      <>
        <a onClick={() => {
          dd.biz.util.datepicker({
            format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
            value: '2015-04-17', //默认显示日期
          })
        }}>日期和月历</a>
        <br></br>
        <a onClick={() => {
          dd.biz.util.timepicker({
            format: 'HH:mm',
            value: '14:00', //默认显示时间  0.0.3
          })
        }}>时间选择器</a>
        <br></br>
        <a onClick={() => {
          dd.biz.util.datetimepicker({
            format: 'yyyy-MM-dd HH:mm',
            value: '2015-04-17 08:00', //默认显示ƒ
          })
        }}>日期及时间选择器</a>
        <br></br>
        <a onClick={() => {
          dd.biz.calendar.chooseDateTime({
            default: 1494415396228,
          })
        }}>月历组件：选择某时间</a>
        <br></br>
        <a onClick={() => {
          dd.biz.calendar.chooseOneDay({
            default: 1494415396228,
          })
        }}>月历组件：选择某天</a>
        <br></br>
        <a onClick={() => {
          dd.biz.calendar.chooseHalfDay({
            default: 1494415396228,
          })
        }}>月历组件：选择半天</a>
        <br></br>
        <a onClick={() => {
          dd.biz.calendar.chooseInterval({
            defaultStart: 1494415396228,
            defaultEnd: 1494415396228,
          })
        }}>月历组件：选择日期区间</a>
        <br></br>
      </>

      <h2>通讯录选人</h2>
      <>
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
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) { }
          } as any);
        }}>
          选择部门和人
        </a>
      </>

      <h2>角色</h2>
      <>
        <a onClick={() => {
          dd.biz.contact.rolesPicker({
            corpId,
            "title": "请选择角色",
            "limitTips": "最多可选择10个角色",
            "maxRoles": 10,
            onSuccess: (result) => {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>选择角色组或角色</a>

        <h2>业务</h2>
        <a onClick={() => {
          dd.biz.util.share({
            type: 1,//分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: "https://open.dingtalk.com/document/isvapp/jsapi-overview",
            title: "分享测试标题",
            content: "分享测试标题",
            image: "https://img.alicdn.com/tfs/TB1X9QXQpXXXXXaXVXXXXXXXXXX-520-280.jpg",
            onSuccess: function () {
              alert("分享成功");
            },
            onFail: function (err) {
              alert("分享失败");
            }
          } as any)
        }}>分享</a>
        <br></br>

        <a onClick={() => {
          dd.biz.clipboardData.setData({
            text: "要复制粘贴板的内容", //要复制粘贴板的内容   
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>复制到粘贴板</a>
        <br></br>

        <a onClick={() => {
          // 测试的小程序
          const agentId = "2250494217";

          dd.biz.microApp.openApp({
            agentId,
            onSuccess: function (result) {
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>打开应用</a>
        <br></br>
      </>

      <h2>导航栏</h2>
      <>
        <a onClick={() => {
          "https://open-dev.dingtalk.com/fe/app#/appMgr/inner/h5/2432506129/2"
          alert("query参数dd_nav_bgcolor=FF5E97F6  配置颜色")
        }}>设置导航栏颜色</a>
        <br></br>

        <a onClick={() => {
          dd.biz.navigation.setTitle({
            title: 'h5测试',//控制标题文本，空字符串表示显示默认文本}
          });
        }}>设置导航栏标题</a>
        <br></br>

        <a onClick={() => {
          dd.biz.navigation.close({
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>关闭当前页面(Android,IOS)</a>
        <br></br>

        <a onClick={() => {
          dd.biz.navigation.quit({
            message: "quit message",//退出信息，传递给openModal或者openSlidePanel的onSuccess函数的result参数
            onSuccess: function (result) {

            },
            onFail: function () { }
          } as any)
        }}>关闭页面(PC)</a>
        <br></br>

        <a onClick={() => {
          // 调用此接口会返回前端页面的上级浏览页面，如果是H5的根页面，调用此接口会关闭当前浏览窗口。
          // dd.biz.navigation.goBack({
          //   onSuccess: function (result) {
          //   },
          //   onFail: function (err) { }
          // })
          history.push({
            pathname: '/child',
          });
        }}>测试 返回上一级页面(Android,IOS)</a>
        <br></br>

        <a onClick={() => {
          // 使用新的页面替换当前页面，当前页面会被立即销毁，展示新页面，无动画。
          dd.biz.navigation.replace({
            url: 'https://open.dingtalk.com/document/orgapp/replace-page',// 新的页面链接
            onSuccess: function (result) { },
            onFail: function (err) { }
          } as any);
        }}>替换页面</a>
      </>

      <h2>弹窗</h2>
      <>
        <a onClick={() => {
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
        }}>alert</a>
        <br></br>
        <a onClick={() => {
          dd.device.notification.confirm({
            message: "确认取消吗",
            title: "提示",
            buttonLabels: ['是', '否'],
          });
        }}>confirm</a>
        <br></br>
        <a onClick={() => {
          base.notification({
            duration: 300, //震动时间，android可配置 iOS忽略
          });
        }}>手机震动</a>
        <br></br>
        <a onClick={() => {
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
        }}>toast</a>
        <br></br>
      </>

      <h2>会话</h2>
      <>
        <a onClick={() => {
          dd.biz.chat.chooseConversationByCorpId({
            corpId, //企业id,必须是用户所属的企业的corpid
            isAllowCreateGroup: true, //是否允许创建会话：
            filterNotOwnerGroup: false,
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>根据corpid选择会话</a>
        <br></br>
      </>
      <h2>电话</h2>
      <>
        <a onClick={() => {
          // max的工号，通过选择部门和人获取到
          const maxEmplld = "2808202832-1059289567";
          dd.biz.telephone.call({
            users: [maxEmplld], //用户列表，工号
            corpId, //企业id
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>拨打钉钉电话</a>
        <br></br>
        <a onClick={() => {
          const phoneNumber = "10086"
          base.showCallMenu({
            phoneNumber, // 期望拨打的电话号码
            code: "+86", // 国家代号，中国是+86
            showDingCall: false, // 是否显示钉钉电话
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>通用电话拨打</a>
        <br></br>
      </>

      <h2>自定义联系人</h2>
      <>
        <a onClick={() => {
          // max的工号，通过选择部门和人获取到
          const maxEmplld = "2808202832-1059289567";
          dd.biz.customContact.choose({
            title: '选人的标题', //标题
            users: [maxEmplld],//一组员工userid
            corpId,//加密的企业 ID，
            isShowCompanyName: true,   //true|false，默认为 false
            disabledUsers: [], //不能选的人
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);

        }}>单选自定义联系人</a>
        <br></br>
      </>

      <h2>DING</h2>
      <>
        <a onClick={() => {
          // max的工号，通过选择部门和人获取到
          const maxEmplld = "2808202832-1059289567";
          dd.biz.ding.create({
            users: [maxEmplld],
            corpId,
            //附件类型：1：图片 2：链接
            type: 1,
            //钉提醒类型：0：电话1：短信2：应用内
            alertType: 2,
            // 钉提醒时间，格式为yyyy-MM-dd HH:mm。
            alertDate: { "format": "yyyy-MM-dd HH:mm", "value": "2023-03-22 11:16" },
            // 附件信息。
            attachment: {
              images: [''],
            },
            // 消息体。
            text: '',
            // 业务类型：0：通知DING 1：任务 2：会议
            bizType: 0,
            // 会议信息
            confInfo: {
              bizSubType: 0, //子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型）
              location: '某某会议室',  //会议地点；（非必填）
              startTime: { "format": "yyyy-MM-dd HH:mm", "value": "2023-03-22 11:16" },  //会议开始时间
              endTime: { "format": "yyyy-MM-dd HH:mm", "value": "2023-03-22 11:16" },   //会议结束时间
              remindMinutes: 30,  //会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天；
              remindType: 2   //会议提前提醒方式。0:电话, 1:短信, 2:应用内
            },
            // 任务信息
            taskInfo: {
              ccUsers: [maxEmplld],  //抄送用户列表，工号
              deadlineTime: { "format": "yyyy-MM-dd HH:mm", "value": "2023-03-22 11:16" },   //任务截止时间
              taskRemind: 30  //任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
            },
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>DING 2.0 发钉</a>
        <br></br>
      </>

      <h2>文件</h2>
      <>
        <a onClick={() => {
          dd.biz.util.downloadFile({
            url: 'http://static.dingtalk.com/media/lADOADTWJM0C2M0C7A_748_728.jpg_60x60q90.jpg', //要下载的文件的url
            name: '一个图片.jpg', //定义下载文件名字
            onProgress: function (msg) {
              // 文件下载进度回调
              alert(JSON.stringify(msg) + '---onProgress');
            },
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---onFail');
            }
          } as any)
        }}>下载文件(PC)</a>
        <br></br>
        <a onClick={() => {
          // 判断有没有下载过，有下载，就算删除也会判断为存在
          dd.biz.util.isLocalFileExist({
            params: [{
              url: 'http://static.dingtalk.com/media/lADOADTWJM0C2M0C7A_748_728.jpg_60x60q90.jpg' //本地文件的url，指的是调用DingTalkPC.biz.util.downloadFile接口下载时填入的url，配合DingTalkPC.biz.util.downloadFile使用
            }
            ],
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>批量检测本地文件是否存在(PC)</a>
        <br></br>
        <a onClick={() => {
          dd.biz.util.openLocalFile({
            url: 'http://static.dingtalk.com/media/lADOADTWJM0C2M0C7A_748_728.jpg_60x60q90.jpg', //本地文件的url，指的是调用DingTalkPC.biz.util.downloadFile接口下载时填入的url，配合DingTalkPC.biz.util.downloadFile使用
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>打开本地文件（PC）</a>
        <br></br>

        <a>选择文件：<input type="file" onChange={async (e) => {
          const file = e.target.files[0];
          e.preventDefault();
          let API_URL = 'http://192.168.0.250:3001/';
          let formData = new FormData();
          formData.append('avatar', file);
          alert(111);
          let res = await axios.post(`${API_URL}upload`, formData)
            .then(response => {
              return API_URL + response?.data?.path?.substr?.(6)
            });
          console.log(res, 'res');
          setImgUrl(res)
        }} /></a>
        <span onClick={() => { setImgUrl('') }}>演示展示上传的图片，点击清空:</span>
        <img src={imgUrl} />
        <a href={imgUrl} download="test.jpg">下载</a>
        <br></br>
      </>

      <h2>存储</h2>
      <>
        <a onClick={() => {
          // 每次存储数据不能超过1M，单域名不能超过50M。
          dd.util.domainStorage.setItem({
            name: 'test', // 存储信息的key值
            value: '测试domainStorage', // 存储信息的Value值
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>设置存储信息（Android，IOS）</a>
        <br></br>
        <a onClick={() => {
          dd.util.domainStorage.getItem({
            name: 'test', // 存储信息的key值
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>获取存储信息（Android，IOS）</a>
        <br></br>
        <a onClick={() => {
          dd.util.domainStorage.removeItem({
            name: 'test', // 存储信息的key值
            onSuccess: function (info) {
              alert(JSON.stringify(info));
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>删除存储信息（Android，IOS）</a>
        <br></br>
      </>

      <h2>图片</h2>
      <>
        <a onClick={() => {
          // 调用biz.util.chooseImage，实现拍照或者选择本地照片
          base.chooseImage({
            count: 1, // 最多可以选择几张图片，默认9
            sourceType: ["camera", "album"], // 可以指定来源是相册还是相机，默认二者都有
            // 相机拍照生成的图片，是否存储到私有目录。 Android 生效
            // true  /data/user/0/com.alibaba.android.rimet/cache/lightapp/xxxxx.jpg
            // false /storage/emulated/0/Android/data/com.alibaba.android.rimet/cache/Pissarro/xxx.jpg
            secret: true,
            onSuccess: function (result) {
              //onSuccess将在选择图片成功之后回调
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              console.log(JSON.stringify(err), 'onFail');
            },
          });
        }}>选择图片</a>
        <br></br>
      </>

      <h2>地图</h2>
      <>
        <a onClick={() => {
          dd.device.geolocation.get({
            // 期望定位精度半径(单位米)
            targetAccuracy: 200,
            // 1：获取高德坐标 0：获取标准坐标
            coordinate: 1,
            // 是否需要带有逆地理编码信息
            withReGeocode: false,
            useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
            onSuccess: (result: any) => {
              const { longitude, latitude } = result;

              dd.biz.map.locate({
                latitude, // 纬度，非必须
                longitude, // 经度，非必须
                scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
                onSuccess: function (result) {
                  alert(JSON.stringify(result) + '---onSuccess');
                },
                onFail: function (err) {
                  alert(JSON.stringify(err) + '---err');
                }
              } as any);
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);

        }}>获取当前地理位置信息（单次定位）+ 地图定位</a>
      </>

      <h2>音频</h2>
      <>
        <a onClick={() => {
          dd.device.audio.startRecord({
            maxDuration: 100, //支持最长为300秒（包括）的音频录制，默认60秒(包括)。
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>开始录音</a>
        <br></br>
        <a onClick={() => {
          dd.device.audio.stopRecord({
            onSuccess: function (res) {
              const { mediaId, duration } = res;
              // res.mediaId; // 返回音频的MediaID，可用于本地播放和音频下载
              // res.duration; // 返回音频的时长，单位：秒
              alert(JSON.stringify({ mediaId, duration }) + '---onSuccess');

              // 下载音频
              dd.device.audio.download({
                mediaId,
                onSuccess: function (res) {
                  // res.localAudioId;
                  alert(JSON.stringify(res) + '---onSuccessDownload');
                  // 播放音频
                  dd.device.audio.play({
                    localAudioId: res.localAudioId,
                    onSuccess: function (result) {
                      alert(JSON.stringify(result) + '---play');
                    },
                    onFail: function (err) {
                      alert(JSON.stringify(err) + '---err');
                    }
                  });

                },
                onFail: function (err) {
                }
              });
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>停止录音 + 播放语音 + 下载音频</a>
        <br></br>
      </>

      <h2>扫码</h2>
      <>
        <a onClick={() => {
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
        }}>扫条形码、二维码</a>
        <br></br>
      </>

      <h2>打开新页面</h2>
      <>
        <a onClick={() => {
          // android/ios profile个人资料页,chat聊天页面,call免费电话页面，contactAdd联系人添加页面，friendAdd唤起添加好友页面，manageOrg唤起员工管理页面
          // PC端仅支持打开个人资料页
          // 工号，通过选择部门和人获取到
          const maxEmplld = "2808202832-1059289567";
          const lhyEmplld = "056763464421252789";

          dd.biz.util.open({
            name: "profile",//个人资料页
            params: {
              corpId,
              id: lhyEmplld,
            },
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any);
        }}>打开应用内页面</a>
        <br></br>
        <a onClick={() => {
          // PC端调用时，调用此接口跳转到外部浏览器打开目标页面。
          // 手机端调用时，调用此接口由钉钉客户端内置浏览器打开目标页面
          dd.biz.util.openLink({
            url: "https://4u627q5300.goho.co/?dd_nav_bgcolor=FF5E97F6",//要打开链接的地址
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>打开目标页面</a>
        <br></br>
      </>

      <h2>授权</h2>
      <>
        <a onClick={() => {
          dd.biz.auth.requestAuthInfo({
            authorizeType: 1, //固定传1
            ext: '{"modelKey":"dd.oa|bpms","bizScene":"processCode","content":["#这里填processCode(审批模板的唯一码)，仅支持1个#"]}',
            onSuccess: function (result) {
              alert(JSON.stringify(result) + '---onSuccess');
            },
            onFail: function (err) {
              alert(JSON.stringify(err) + '---err');
            }
          } as any)
        }}>审批-授权获取审批实例数据</a>
        <br></br>
      </>

      <h2>xx</h2>
      <a onClick={() => { }}>xxx</a>
      <br></br>

      {/* 
        onSuccess: function (result) {
          alert(JSON.stringify(result)+'---onSuccess');
        },
        onFail: function (err) {
          alert(JSON.stringify(err)+'---err');
        } 
        */}

      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}
