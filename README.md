动态IP映射到阿里云域名
====

准备环境
#
1、安装nodejs
2、git clone 项目
3、导入aliapi的nodejs库（需要在DynamicDomain目录下执行）
```shell
npm install @alicloud/pop-core --save
```
4、建立阿里云accesskeys，阿里云后台点击头像可以看到，如果使用子用户的话，需要给与AliyunDNSFullAccess（管理云解析(DNS)的权限）权限

开始使用
#

方式1（使用命令）：
##
獲取帮助
###
```shell
node order.js -help
```

执行脚本
###
```shell
node order.js
```

方式2（使用脚本）：
##
1、拷贝文件index.js到new.js
2、将如下值按照真实值修订
  szAccessKeyID 阿里云access key
  szAccessKeySecret 阿里云access secret
  szDomain  域名
  szRR  主机记录
  szType  记录类型
  nInterval 网络调用频率
3、执行脚本
```shell
node new.js
```