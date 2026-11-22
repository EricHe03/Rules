# 香港 AI 分流

Apple Intelligence 的 ChatGPT、ChatGPT、Claude、Gemini API、Google AI Studio、Antigravity 和 Gemini Notebook 走代理。普通 Gemini 網頁版、Google Cloud Storage 和其餘流量直連。

| 客戶端 | 配置 |
| --- | --- |
| Clash Meta for Android、Clash Verge Rev、iOS 版 Clash | [HongKong.yaml](https://raw.githubusercontent.com/EricHe03/Rules/main/HongKong.yaml) |
| Shadowrocket | [HongKong.conf](https://raw.githubusercontent.com/EricHe03/Rules/main/HongKong.conf) |

## Clash 配置

1. 下載 `HongKong.yaml`，在本機把 `proxy-providers.subscription.url` 換成自己的 Clash／Mihomo 節點訂閱網址。訂閱須提供包含 `proxies:` 的 YAML。請妥善保管填有私人訂閱網址的檔案。
2. 按客戶端匯入改好的 YAML。

   | 客戶端 | 匯入和啟用 |
   | --- | --- |
   | Clash Meta for Android | 在配置頁新增本機檔案，然後選取該配置並啟動 VPN |
   | Clash Verge Rev | 將 YAML 拖到訂閱頁，或使用匯入本機配置功能。切換至該配置後啟用系統代理或 TUN |
   | iOS 版 Clash | 在 Profiles 從檔案匯入 YAML，選取該配置，然後連接 VPN |

3. 使用 `Rule` 模式，在 `PROXY` 組選擇一個可用節點。

代理節點由配置中的訂閱定期更新。要更新分流規則，下載最新的 `HongKong.yaml`，填回自己的訂閱網址再匯入。

## Shadowrocket

將上表的 `HongKong.conf` URL 加入配置，選用該配置及代理節點，然後將全局路由設為「配置」。
