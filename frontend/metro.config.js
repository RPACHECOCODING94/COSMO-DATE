const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const { FileStore } = require("metro-cache");

const config = getDefaultConfig(__dirname);

// Use a stable on-disk store to reduce cold-start time between runs.
const root = process.env.METRO_CACHE_ROOT || path.join(__dirname, ".metro-cache");
config.cacheStores = [new FileStore({ root: path.join(root, "cache") })];

// Web-first resolver: prioritize React Native Web-specific files.
const webFirstSourceExts = ["web.tsx", "web.ts", "web.jsx", "web.js"];
const remainingSourceExts = config.resolver.sourceExts.filter(
  (ext) => !webFirstSourceExts.includes(ext)
);
config.resolver.sourceExts = [...webFirstSourceExts, ...remainingSourceExts];

// Reduce resource usage in constrained environments.
config.maxWorkers = 2;

module.exports = config;
