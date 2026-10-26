// HongKong-Unified — Clash Verge Rev 全局擴展腳本
// 使用：貼到 Global Extend Script；PROXY 組內選擇要使用的節點。
// 新增固定名稱 PROXY，收集所有節點／代理集合，不依賴訂閱原有代理組名稱。
// 若訂閱已有 PROXY 組，套用本腳本時會用下列統一組設定覆寫該組。
// 沿用節點與 DNS；清單內走 PROXY，其餘直連。不是 CMFA 可執行的腳本。
function main(config) {
  const unifiedGroup = {
  "name": "PROXY",
  "type": "select",
  "include-all": true,
  "empty-fallback": "REJECT"
};
  config["proxy-groups"] = [
    unifiedGroup,
    ...(config["proxy-groups"] || []).filter(group => group.name !== "PROXY")
  ];
  config["rule-providers"] = {
    ...(config["rule-providers"] || {}),
    ...{
  "hongkong-unified-openai": {
    "type": "http",
    "behavior": "classical",
    "format": "yaml",
    "url": "https://raw.githubusercontent.com/VPSDance/ai-proxy-rules/refs/heads/main/rules/clash/openai.yaml",
    "path": "./ruleset/hongkong-unified-openai.yaml",
    "interval": 86400,
    "proxy": "PROXY"
  },
  "hongkong-unified-anthropic": {
    "type": "http",
    "behavior": "classical",
    "format": "yaml",
    "url": "https://raw.githubusercontent.com/VPSDance/ai-proxy-rules/refs/heads/main/rules/clash/anthropic.yaml",
    "path": "./ruleset/hongkong-unified-anthropic.yaml",
    "interval": 86400,
    "proxy": "PROXY"
  },
  "hongkong-unified-google-test": {
    "type": "http",
    "behavior": "classical",
    "format": "yaml",
    "url": "https://raw.githubusercontent.com/EricHe03/Rules/main/HongKong-Unified-rules.yaml",
    "path": "./ruleset/hongkong-unified-google-test.yaml",
    "interval": 86400,
    "proxy": "PROXY"
  }
}
  };
  config.rules = [
  "RULE-SET,hongkong-unified-openai,PROXY",
  "RULE-SET,hongkong-unified-anthropic,PROXY",
  "RULE-SET,hongkong-unified-google-test,PROXY",
  "MATCH,DIRECT"
];
  return config;
}
