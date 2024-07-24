// src/config.js
var autoDownload = 1;
function _123() {
  const enable = 1;
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDc0NzQwMzksImlhdCI6MTcwNjg2OTIzOSwiaWQiOjE4MTcwNjY3MjEsIm1haWwiOiIiLCJuaWNrbmFtZSI6IjE5NzIxNjEwMTY4Iiwic3VwcGVyIjpmYWxzZSwidXNlcm5hbWUiOjE5NzIxNjEwMTY4LCJ2IjowfQ.XQmtcXywRaF36whHZus1M3-d0FPyO4ZRV6O9lXCNmWM";
  if (!enable)
    return 0;
  else
    return token;
}
function ali() {
  const enable = 0;
  const token = "";
  if (!enable)
    return 0;
  else
    return token;
}
var Version = 2.1;
function getCfg(type) {
  switch (type) {
    case "123":
      return _123();
    case "ali":
      return ali();
    case "down":
      return autoDownload;
    case "ver":
      return Version;
  }
}

// src/function/123_lib.js
function _0x1b5d95(_0x278d1a) {
  var _0x839b57, _0x4ed4dc = arguments["length"] > 2 && void 0 !== arguments[2] ? arguments[2] : 8;
  if (0 === arguments["length"])
    return null;
  "object" === typeof _0x278d1a ? _0x839b57 = _0x278d1a : (10 === ("" + _0x278d1a)["length"] && (_0x278d1a = 1e3 * parseInt(_0x278d1a)), _0x839b57 = new Date(_0x278d1a));
  var _0xc5c54a = _0x278d1a + 6e4 * new Date(_0x278d1a)["getTimezoneOffset"](), _0x3732dc = _0xc5c54a + 36e5 * _0x4ed4dc;
  return _0x839b57 = new Date(_0x3732dc), {
    "y": _0x839b57["getFullYear"](),
    "m": _0x839b57["getMonth"]() + 1 < 10 ? "0" + (_0x839b57["getMonth"]() + 1) : _0x839b57["getMonth"]() + 1,
    "d": _0x839b57["getDate"]() < 10 ? "0" + _0x839b57["getDate"]() : _0x839b57["getDate"](),
    "h": _0x839b57["getHours"]() < 10 ? "0" + _0x839b57["getHours"]() : _0x839b57["getHours"](),
    "f": _0x839b57["getMinutes"]() < 10 ? "0" + _0x839b57["getMinutes"]() : _0x839b57["getMinutes"]()
  };
}
function _0x4f141a(_0x4075b1) {
  for (var _0x4eddcb = arguments["length"] > 1 && void 0 !== arguments[1] ? arguments[1] : 10, _0x2fc680 = function() {
    for (var _0x515c63, _0x361314 = [], _0x4cbdba = 0; _0x4cbdba < 256; _0x4cbdba++) {
      _0x515c63 = _0x4cbdba;
      for (var _0x460960 = 0; _0x460960 < 8; _0x460960++)
        _0x515c63 = 1 & _0x515c63 ? 3988292384 ^ _0x515c63 >>> 1 : _0x515c63 >>> 1;
      _0x361314[_0x4cbdba] = _0x515c63;
    }
    return _0x361314;
  }, _0x4aed86 = _0x2fc680(), _0x5880f0 = _0x4075b1, _0x492393 = -1, _0x25d82c = 0; _0x25d82c < _0x5880f0["length"]; _0x25d82c++)
    _0x492393 = _0x492393 >>> 8 ^ _0x4aed86[255 & (_0x492393 ^ _0x5880f0.charCodeAt(_0x25d82c))];
  return _0x492393 = (-1 ^ _0x492393) >>> 0, _0x492393.toString(_0x4eddcb);
}
function getSign(_0x1e2592) {
  var _0x1e37d5 = "/b/api/share/download/info";
  var _0x4e2d74 = "web";
  var _0x56f040 = 3;
  var key = "a,d,e,f,g,h,l,m,y,i,j,n,o,p,k,q,r,s,t,u,b,c,v,w,s,z";
  var _0x48562f = Math["round"](1e7 * Math["random"]());
  var _0x2f7dfc;
  var _0x35a889;
  var _0x36f983;
  var _0x3b043d;
  var _0x5bc73b;
  var _0x4b30b2;
  var _0x32399e;
  var _0x25d94e;
  var _0x373490;
  for (var _0x1c540f in _0x2f7dfc = key.split(","), _0x35a889 = _0x1b5d95(_0x1e2592), _0x36f983 = _0x35a889["y"], _0x3b043d = _0x35a889["m"], _0x5bc73b = _0x35a889["d"], _0x4b30b2 = _0x35a889["h"], _0x32399e = _0x35a889["f"], _0x25d94e = [_0x36f983, _0x3b043d, _0x5bc73b, _0x4b30b2, _0x32399e].join(""), _0x373490 = [], _0x25d94e)
    _0x373490["push"](_0x2f7dfc[Number(_0x25d94e[_0x1c540f])]);
  var _0x43bdc6;
  var _0x406c4e;
  return _0x43bdc6 = _0x4f141a(_0x373490["join"]("")), _0x406c4e = _0x4f141a(""["concat"](_0x1e2592, "|")["concat"](_0x48562f, "|")["concat"](_0x1e37d5, "|")["concat"](_0x4e2d74, "|")["concat"](_0x56f040, "|")["concat"](_0x43bdc6)), [_0x43bdc6 + "=" + _0x1e2592 + "-" + _0x48562f + "-" + _0x406c4e];
}

// src/function/123.js
async function getFile(Key) {
  let data = {}, Pwd = "", file = {};
  const rule0 = /:/;
  const rule1 = /\?(.*):/;
  const rule2 = /:(.*)/;
  const rule3 = /\?(.*)/;
  if (rule0.test(Key)) {
    data.ShareKey = Key.match(rule1)[1];
    Pwd = Key.match(rule2)[1];
  } else
    data.ShareKey = Key.match(rule3)[1];
  const url = "https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&ParentFileId=0&Page=1&shareKey=" + data.ShareKey + "&Sharepwd=" + Pwd;
  let info = await fetch(url);
  info = await info.json();
  if (!info.data)
    return 0;
  data.FileId = info.data.InfoList[0].FileId;
  data.S3KeyFlag = info.data.InfoList[0].S3KeyFlag;
  data.Size = info.data.InfoList[0].Size;
  data.Etag = info.data.InfoList[0].Etag;
  data = JSON.stringify(data);
  file.name = info.data.InfoList[0].FileName;
  file.size = info.data.InfoList[0].Size;
  let time = await fetch("https://www.123pan.com/b/api/get/server/time");
  time = await time.json();
  if (!time.data)
    return 0;
  time = JSON.stringify(time.data.timestamp);
  const sign = getSign(time);
  const token = getCfg("123");
  const aim = "https://www.123pan.com/b/api/share/download/info?" + sign;
  const init = { method: "POST", headers: { "App-Version": 3, "platform": "web", "Authorization": token }, body: data };
  let res = await fetch(aim, init);
  res = JSON.stringify(await res.json());
  const rule4 = /params=(.*)&/;
  if (!rule4.test(res))
    return 0;
  res = res.match(rule4)[1];
  const rule5 = /(.*)&x-mf-biz-cid/;
  let cdn = atob(res).match(rule5)[1];
  file.url = cdn;
  return file;
}

// src/function/ali.js
async function getFile2(Key) {
  let Key0, Pwd0 = "";
  const rule0 = /:/;
  const rule1 = /\?(.*):/;
  const rule2 = /:(.*)/;
  const rule3 = /\?(.*)/;
  if (rule0.test(Key)) {
    Key0 = Key.match(rule1)[1];
    Pwd0 = Key.match(rule2)[1];
  } else
    Key0 = Key.match(rule3)[1];
  let req0 = {};
  req0.share_id = Key0;
  if (Pwd0)
    req0.share_pwd = Pwd0;
  req0 = JSON.stringify(req0);
  const url0 = "https://api.aliyundrive.com/v2/share_link/get_share_token";
  const init0 = { method: "POST", headers: { "content-type": "application/json" }, body: req0 };
  let res0 = await fetch(url0, init0);
  res0 = await res0.json();
  if (!res0.share_token)
    return 0;
  let req1 = {};
  req1.share_id = Key;
  req1.parent_file_id = "root";
  req1 = JSON.stringify(req1);
  const url1 = "https://api.aliyundrive.com/adrive/v2/file/list_by_share";
  const init1 = { method: "POST", headers: { "x-share-token": res0.share_token }, body: req1 };
  let res1 = await fetch(url1, init1);
  res1 = await res1.json();
  if (!res1.items)
    return 0;
  let req2 = {};
  let file = {};
  file.name = res1.items[0].name;
  file.size = res1.items[0].size;
  req2.file_id = res1.items[0].file_id;
  req2.share_id = Key;
  req2 = JSON.stringify(req2);
  const token = getCfg("ali");
  const init2 = { method: "POST", headers: { "authorization": token, "x-share-token": res0.share_token }, body: req2 };
  const url2 = "https://api.aliyundrive.com/v2/file/get_share_link_download_url";
  let res2 = await fetch(url2, init2);
  res2 = await res2.json();
  if (!res2.download_url)
    return 0;
  file.url = "https://proxy.syshub.top/?headers=%7B%22Referer%22%3A%22https%3A%2F%2Fwww.aliyundrive.com%2F%22%7D&url=" + encodeURI(res2.download_url);
  return file;
}

// src/function/test.js
async function test_dl(type) {
  let file;
  switch (type) {
    case "123":
      file = await getFile("?GIU8Vv-syfi3:sysh");
      break;
    case "ali":
      file = await getFile2("?fB3rbXjRfkH:7wp4");
      break;
  }
  const rule0 = /^http/;
  if (rule0.test(file.url))
    return 1;
  else
    return 0;
}
async function test() {
  let status = {
    "123\u4E91\u76D8": "\u505C\u7528",
    "\u963F\u91CC\u4E91\u76D8": "\u505C\u7528"
  };
  if (getCfg("123")) {
    if (await test_dl("123"))
      status["123\u4E91\u76D8"] = "\u6B63\u5E38";
    else
      status["123\u4E91\u76D8"] = "\u9519\u8BEF";
  }
  if (getCfg("ali")) {
    if (await test_dl("ali"))
      status["\u963F\u91CC\u4E91\u76D8"] = "\u6B63\u5E38";
    else
      status["\u963F\u91CC\u4E91\u76D8"] = "\u9519\u8BEF";
  }
  return "\u6B22\u8FCE\u4F7F\u7528DirectLink\uFF0C\u5F00\u6E90\u5730\u5740\uFF1Ahttps://gitee.com/syshub/directlink\n" + JSON.stringify(status);
}

// src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const Type = url.pathname;
    const Key = url.search;
    if (Type == "/") {
      return new Response(await test());
    }
    if (!Key)
      return new Response("\u683C\u5F0F\u9519\u8BEF\uFF01");
    let file;
    switch (Type) {
      case "/123":
        if (!getCfg("123"))
          return new Response("\u7C7B\u578B\u672A\u542F\u7528\uFF01");
        else
          file = await getFile(Key);
        break;
      case "/ali":
        if (!getCfg("ali"))
          return new Response("\u7C7B\u578B\u672A\u542F\u7528\uFF01");
        else
          file = await getFile2(Key);
        break;
      default:
        return new Response("\u672A\u77E5\u7C7B\u578B\uFF01");
    }
    if (!file.url)
      return new Response("\u83B7\u53D6\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25\uFF01");
    else if (getCfg("down"))
      return Response.redirect(file.url);
    else
      return Response.json(file);
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
