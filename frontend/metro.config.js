const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const { FileStore } = require("metro-cache");

const config = getDefaultConfig(__dirname);

// Use a stable on-disk store to reduce cold-start time between runs.
const root = process.env.METRO_CACHE_ROOT || path.join(__dirname, ".metro-cache");
config.cacheStores = [new FileStore({ root: path.join(root, "cache") })];

// Expo + Metro already resolve platform files such as:
// Component.web.tsx -> web, Component.native.tsx -> native.
// Keep default sourceExts to avoid invalid extension entries.

// Reduce resource usage in constrained environments.
config.maxWorkers = 2;

module.exports = config;
