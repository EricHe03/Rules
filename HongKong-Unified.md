# HongKong-Unified

這是新增的統一版本；原有 `HongKong.js` 和 `HongKong.conf` 保留。現有電腦設定不會因 GitHub 更新自動改變。

兩邊統一使用 **PROXY** 代理組，以及同一套分流規則：命中清單走代理，其餘 `MATCH,DIRECT`。這裏的 PROXY 是代理組名稱，請在組內選擇可用節點。

## 檔案

| 檔案 | 用途 |
| --- | --- |
| [HongKong-Unified.js](HongKong-Unified.js) | Clash Verge Rev 全局擴展腳本；沿用已匯入訂閱的節點及 DNS |
| [HongKong-Unified.yaml](HongKong-Unified.yaml) | CMFA、Clash Verge Rev 都可匯入的完整配置範本；必須先在本地填訂閱網址 |
| [HongKong-Unified-rules.yaml](HongKong-Unified-rules.yaml) | 兩個版本共同引用的 Google AI／測試網站規則集；不單獨匯入為訂閱 |

OpenAI 與 Claude 使用 VPSDance 的遠端規則集；Google AI／測試網站使用本倉庫的共用規則集。三個規則集每 86400 秒更新。遠端規則集本身的涵蓋範圍以其維護者內容為準。

## Clash Verge Rev：沿用現有節點訂閱

1. 開啟 [腳本原文](https://raw.githubusercontent.com/EricHe03/Rules/main/HongKong-Unified.js)，複製全文。
2. 進入「訂閱 → Global Extend Script → 編輯檔案」，貼上並儲存。新版會取代該欄位目前的腳本，因此要切換新版時才做這一步。
3. 到「代理」頁，在新 `PROXY` 組選擇節點。不要假設新版保留舊代理組的節點選擇。
4. 使用「規則」模式，並確認系統代理或 TUN 已按需要啟用。

本腳本保留訂閱的其他代理組，並建立／覆寫名為 PROXY 的組；分流規則會換成統一版本。個別訂閱的擴展在全局腳本之後執行，若另有覆寫規則或代理組，仍可能改變結果。

## CMFA：使用完整 YAML

1. 下載 [YAML 原文](https://raw.githubusercontent.com/EricHe03/Rules/main/HongKong-Unified.yaml) 到本地。
2. 用文字編輯器把 `https://example.invalid/REPLACE_WITH_YOUR_CLASH_SUBSCRIPTION_URL` 整個換成自己的 Clash/Mihomo 訂閱網址，保留雙引號。
3. 在 CMFA「配置」新增配置，從檔案匯入本地改好的 YAML，然後選取它。
4. 啟動 CMFA，按 App 提示自行允許 VPN。使用「規則」模式，並在 `PROXY` 組選擇節點。
5. 範本未填訂閱網址前不能提供代理節點。不要把私人訂閱網址提交到公開 GitHub。

Clash Verge Rev 也可以把這個本地改好的 YAML 作為完整配置匯入；走這條路時，不需要再貼 JavaScript 腳本。若要讓 YAML 完整決定分流，先停用會修改規則／代理組的現有全局或個別訂閱擴展。

## 同時使用多個節點訂閱

可在 YAML 的 `proxy-providers` 下加入第二個提供者。名稱及快取路徑不可重複；例如複製 `subscription` 區塊，改成 `subscription2`，並把路徑改為 `./proxy-providers/hongkong-unified-subscription2.yaml`，再填另一條私人訂閱網址。`include-all: true` 會把所有提供者的節點收進同一個 `PROXY` 組。

節點訂閱需返回核心能解析的節點內容。這種用法只取用節點，不沿用提供商的代理組和分流規則。

## 更新

- OpenAI、Claude、Google AI／測試網站的規則集：由核心定期更新，通常不需重新貼腳本。
- JavaScript 的組別／流程設定有改動：需重新複製到 Clash Verge Rev；GitHub 更新不會自動替換全局腳本。
- YAML 的組別／DNS 等設定有改動：重新下載範本，保留自己的私人訂閱網址，再匯入本地配置。
- 此倉庫的 YAML 是無憑證範本，不能把它的公開網址當成已填好節點的私人訂閱。
