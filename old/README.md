概述
-----

著名的 [autoproxy.pac](https://autoproxy.org) (GFW List)  是一個 GFW 黑名單，訪問名單中網站需要通過代理，不在名單中的網站直接訪問。有效使用黑名單，維護者和用戶都需要時常更新此名單，否則可能不能訪問最近被牆的網站。這些不便之處是推廣翻牆運動的阻礙之一。

白名單的方法是白名單中的網站不走代理，其它網站全部通過代理訪問。白名單的優點是對維護的要求非常低。第一次安裝後，即使很長時間不更新，也不會出現網站打不開的問題。當然，用戶會要付出稍多一些流量。

現實上 GFW 已經開始白名單化，國外稍微有點意思的網站大都已經被牆，或者隨時可能被牆。因此作者認爲有必要開始維護一份白名單的 pac 文件。

***作者收錄的國內 CDN 和“雲”相關的域名還非常有限。希望同學們能夠幫助補充。感謝。***

使用方法
---------
Chrome用戶推薦使用 moew 的新作 [Chrome擴展程序Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)


下載 whitelist.pac 文件後，修改代理服務器的 ip 地址和代理類型。然後將瀏覽器的代理設置中指向 whitelist.pac。


```
var ip_address = '127.0.0.1:1080'; // 需要更換成有效的域名
```

```
var proxy_type = 'SOCKS5'; // or 'HTTPS' or 'PROXY'
```

當 `proxy_type`  選爲 `HTTPS` 時，此 pac 文件適合用於 [Google Chrome 的安全代理](http://www.chromium.org/developers/design-documents/secure-web-proxy)。


適用於Proxy SwitchyOmega的快速存檔恢復 `http://7rfkd6.com5.z0.glb.clouddn.com/WhiteListsOmegaOptions.bak`

或者

 `http://7rfkd6.com5.z0.glb.clouddn.com/BlackListsOmegaOptions.bak`

![使用 pac 文件](http://ww2.sinaimg.cn/large/6d9bd6a5gw1eogqk48awgj21ci10yk01.jpg)


### Shadowsocks 代理設置


假設 Shadowsocks 開的端口是1080

```
'SOCKS5 127.0.0.1:1080';
```


只需要將下面那個地址，直接貼入上圖中 “Auto Config URL” 那個位置，,


白名單

Socks5 Proxy Policy
```
http://7tsyhm.com5.z0.glb.clouddn.com/socksWhiteList.pac
```

Http Proxy Policy
```
http://7tsyhm.com5.z0.glb.clouddn.com/httpWhiteList.pac
```


黑名單

Socks5 Proxy Policy
```
http://7tsyhm.com5.z0.glb.clouddn.com/socksBlackList.pac
```


Http Proxy Policy
```
http://7tsyhm.com5.z0.glb.clouddn.com/httpBlackList.pac
```


全局
```
http://7tsyhm.com5.z0.glb.clouddn.com/global.pac
```


Google Chrome 安全代理 （SSL Secure Proxy）
-----------

_Firefox 好像也有支持安全代理了。作者還沒有測試過。_


Google Chrome 已經支持基於 https 和 SPDY 的安全代理。其原理和效果與 SSH，shadowsocks 以及 goagent 類似：

* 將普通流量封裝在加密通道之中，這樣 GFW 就看不見流量的內容；
* 域名的解析在代理服務器這端完成，所以本地不用擔心域名污染的問題。配合 pac 的使用，可以享受國內 CDN 的服務。達到一次設置完全免維護；
* 本地不從服務器端取得 ip，只適合瀏覽器內的應用，不適合 VoIP，網絡遊戲等應用。

優點有：

* 在 PC 和 Mac 上 Chrome 已經原生支持，不需要依賴額外的客戶端；
* 封裝的協議是 https 或 SPDY，GFW 完全沒有 DPI 識別的可能，這是翻牆終極方案的一部分；
* 由 Google 支持，客戶端和服務器端的軟件成熟並且穩定，未來更新也可靠。

現有的缺點有：

* 暫時只適用於 PC 和 Mac 上的 Chrome。 Android 的客戶端有待開發。iOS 客戶端的可行性暫時還不清楚。

***有興趣開發客戶端的同學，可以考慮編譯封裝 @tatsuhiro-t 的 C 程序庫 [spdylay](https://github.com/tatsuhiro-t/spdylay) 。***

```
shrpx --client-proxy [-b <HOST,PORT>] [-f <HOST,PORT>]
				   [OPTIONS...] [<PRIVATE_KEY> <CERT>]
```


其它節省流量的方法
----------------


由於白名單的流量消耗較黑名單要高一些，在瀏覽器中安裝下面的擴展，在提高網頁瀏覽速度的同時，也能節省不少流量。

##### 屏蔽廣告： Adblock Plus ＋ Easylist ＋ Chinalist

在 Firefox 或 Chrome 中安裝 [Adblock Plus](http://adblockplus.org/en/) (ABP) 擴展，並在 ABP 的控制面板中加入 Easylist 和 [Chinalist](http://code.google.com/p/adblock-chinalist/)。這樣可以有效的過濾廣告大部分網站和網頁。

`注意`：下載擴展和 ChinaList 的時候可能需要打開全局翻牆的代理設置 。

##### 屏蔽Flash： FlashControl 或 FlashBlock

在 Chrome 中安裝 [FlashControl](https://chrome.google.com/webstore/detail/flashcontrol/mfidmkgnfgnkihnjeklbekckimkipmoe) 或在 Firefox 中安裝 [FlashBlock](https://addons.mozilla.org/zh-cn/firefox/addon/flashblock/)，可以達到屏蔽 Flash 的效果。需要打開 Flash，比如視頻，只要在被屏蔽的 Flash 上點擊一次。

![Chrome 的擴展](http://7xj4mk.com5.z0.glb.clouddn.com/chrome-extension.png)

------

本項目基於 [mono_pac](https://github.com/blackgear/mono_pac)
本文檔修改於n0gfwall0@gmail.com  

MIT License


需要改進的地方歡迎fork & pull request / issue ~


附錄


Shadowsocks for iOS

本地監聽端口爲`SOCKS 127.0.0.1:1983`
