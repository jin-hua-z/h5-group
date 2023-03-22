const AuthorizationAPI = [
    // 获取微应用反馈式操作的临时授权码
    'runtime.permission.requestOperateAuthCode',
    // 获取uuid
    'device.base.getUUID',
    // 获取热点接入信息
    'device.base.getInterface',
];

const PublicAPI = [
    // 获取微应用免登授权码
    'runtime.permission.requestAuthCode',
    // 获取手机基础信息
    'device.base.getPhoneInfo',
    // 获取wifi状态
    'device.base.getWifiStatus',
    // 获取网络类型
    'device.connection.getNetworkType',
    // 读取NFC芯片内容
    'device.nfc.nfcRead'

];
