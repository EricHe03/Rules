// HongKong — Clash Verge Rev / Mihomo 全局擴展腳本
// 使用：將本檔全文貼到「訂閱 → Global Extend Script → 編輯檔案」並儲存。
// 對所有訂閱生效；清單內走該訂閱的主要代理組，其餘 MATCH,DIRECT。
// 沿用訂閱的節點、代理組與 DNS；本檔不是可獨立匯入的 YAML 訂閱。
function main(config, profileName) {
  const groups = config["proxy-groups"] || [];
  const targetGroup = groups.find(g => g.name === profileName && g.type === "select")
    || groups.find(g => /节点选择|節點選擇|代理选择|代理選擇|^PROXY$/i.test(g.name))
    || groups.find(g => g.type === "select")
    || groups.find(g => ["url-test", "fallback", "load-balance"].includes(g.type));
  if (!targetGroup) throw new Error("No proxy group available for " + profileName);
  const target = targetGroup.name;
  config["rule-providers"] = {
    ...(config["rule-providers"] || {}),
    "custom-ai-openai": {
      type: "http", behavior: "classical", format: "yaml",
      url: "https://raw.githubusercontent.com/VPSDance/ai-proxy-rules/refs/heads/main/rules/clash/openai.yaml",
      path: "./ruleset/custom-ai-openai.yaml", interval: 86400, proxy: target
    },
    "custom-ai-anthropic": {
      type: "http", behavior: "classical", format: "yaml",
      url: "https://raw.githubusercontent.com/VPSDance/ai-proxy-rules/refs/heads/main/rules/clash/anthropic.yaml",
      path: "./ruleset/custom-ai-anthropic.yaml", interval: 86400, proxy: target
    }
  };
  const myRules = [
    "RULE-SET,custom-ai-openai",
    "RULE-SET,custom-ai-anthropic",
    "DOMAIN-SUFFIX,ai.studio",
    "DOMAIN-SUFFIX,aistudio.google.com",
    "DOMAIN-SUFFIX,makersuite.google.com",
    "DOMAIN-SUFFIX,generativelanguage.googleapis.com",
    "DOMAIN-SUFFIX,aisandbox-pa.googleapis.com",
    "DOMAIN-SUFFIX,antigravity.google",
    "DOMAIN-SUFFIX,antigravity.google.com",
    "DOMAIN-SUFFIX,antigravity-unleash.goog",
    "DOMAIN-SUFFIX,aicode.googleapis.com",
    "DOMAIN-SUFFIX,aida.googleapis.com",
    "DOMAIN-SUFFIX,notebooklm.google",
    "DOMAIN-SUFFIX,notebooklm.google.com",
    "DOMAIN-SUFFIX,notebook.google",
    "DOMAIN-SUFFIX,notebook.google.com",
    "DOMAIN-SUFFIX,labstailwind.pa.googleapis.com",
    "DOMAIN-SUFFIX,labs.google",
    "DOMAIN-SUFFIX,opal.google",
    "DOMAIN-SUFFIX,opal.google.com",
    "DOMAIN-SUFFIX,speedtest.net",
    "DOMAIN-SUFFIX,speed.cloudflare.com",
    "DOMAIN-SUFFIX,scamalytics.com",
    "DOMAIN-SUFFIX,ip2location.com",
    "DOMAIN,alkalicore-pa.clients6.google.com",
    "DOMAIN,alkalimakersuite-pa.clients6.google.com",
    "DOMAIN,webchannel-alkalimakersuite-pa.clients6.google.com",
    "DOMAIN,antigravity-pa.googleapis.com",
    "DOMAIN,antigravity.googleapis.com",
    "DOMAIN,cloudaicompanion.googleapis.com",
    "DOMAIN,cloudcode-pa.googleapis.com",
    "DOMAIN,daily-cloudcode-pa.googleapis.com",
    "DOMAIN,notebooklm-pa.googleapis.com",
    "DOMAIN,notebooklm.googleapis.com"
].map(rule => rule + "," + target);
  config.rules = [...myRules, "MATCH,DIRECT"];
  return config;
}
