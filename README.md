# Cloudflare-Workers-Directlink

## 描述

使用 [Cloudflare Workers](https://workers.cloudflare.com/) 解析云盘单文件分享直链（目前支持[123云盘](https://www.123pan.com/)、[天翼云盘](https://cloud.189.cn/)、[蓝奏云](https://lanzou.com/)）。

## 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Dainsleif233/directlink)

## 网页手动部署

1. 创建一个新的 [Workers KV 命名空间](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)。
2. 创建一个新的 [Cloudflare Workers 服务](https://dash.cloudflare.com/?to=/:account/workers) 并点击 "快速编辑" 按钮。
3. 将 [src](src) 文件夹中的内容复制到项目中（需手动创建不存在的文件和文件夹，wrangler.toml.example需要变为wrangler.toml），并点击 "保存并部署"。

## 配置

1. 进入 "设置" 选项卡，在 "变量和机密" 中，添加以下文本内容：

    * `_123`：[123云盘](https://www.123pan.com/)的authorization，可登入123云盘后通过dev-tools获取。
    * `_189`：[天翼云盘](https://cloud.189.cn/)的COOKIE_LOGIN_USER，可登入天翼云盘后通过dev-tools获取。
    * `PATH_PREFIX`：（可选）URL路径前缀。

2. （自动部署可跳过）在 "绑定" 中，添加 "KV命名空间" ：

    * `变量名称`： `KV`
    * `KV 命名空间`：[网页手动部署](#网页手动部署)中创建的 KV 命名空间。

3. （可选，推荐）在 "域和路由" 中添加自定义域名或路由。

## 使用方式

以域名example.doman举例

    https://example.doman/PATH_PREFIX/TYPE?key=KEY&pwd=PWD&down=DOWN&cache=CACHE

**TYPE**

云盘类型

    123云盘：123
    天翼云盘：189
    蓝奏云：lzy

**KEY**

分享链接的key

    123云盘：https://www.123684.com/s/${KEY}
    天翼云盘：https://cloud.189.cn/web/share?code=${KEY}
    蓝奏云：https://lanzout.com/${KEY}

**PWD**

（可选）分享密码

**DOWN**

是否直接重定向下载，默认是，值为0时为否

为否时将返回一个字符串

    {
        "code": 0,  //状态码，0为成功
        "type": "", //请求的类型
        "key": {
            "sharekey": "", //分享KEY
            "password": ""  //分享密码
        }
    }

**CACHE**

是否启用缓存,会将直链缓存直至直链失效，默认是，值为0时为否

缓存时间

    123云盘：24h
    天翼云盘：18m
    蓝奏云：15m
