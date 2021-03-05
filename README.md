动态IP映射到阿里云域名
====

# 前提
1、阿里云账号<br>
2、阿里云域名

# 准备环境
1、安装nodejs<br>
2、git clone 项目<br>
3、导入aliapi的nodejs库（需要在DynamicDomain目录下执行）<br>
```shell
npm install @alicloud/pop-core --save
```
4、建立阿里云accesskeys，阿里云后台点击头像可以看到，如果使用子用户的话，需要给与AliyunDNSFullAccess（管理云解析(DNS)的权限）权限>

# 开始使用
## 方式1（使用命令）：
### 獲取帮助
```shell
node order.js -help
```
### 执行脚本
```shell
node order.js
```

## 方式2（使用脚本）：
1、拷贝文件index.js到new.js<br>
2、将如下值按照真实值修订<br>
```shell
  szAccessKeyID 阿里云access key<br>
  szAccessKeySecret 阿里云access secret<br>
  szDomain  域名<br>
  szRR  主机记录<br>
  szType  记录类型<br>
  nInterval 网络调用频率<br>
```
3、执行脚本
```shell
node new.js
```

# 服务器为内网电脑
  将外网需要访问的端口加入电脑路由器中的虚拟服务器映射端口

# 克服重启
  放入计算机开机自启动
