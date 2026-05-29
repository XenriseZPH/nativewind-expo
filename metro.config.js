// Learn more https://docs.expo.io/guides/customizing-metro
const path = require("node:path");

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const nativeWindConfig = withNativeWind(config, { inlineRem: 16 });
const nativeWindResolveRequest = nativeWindConfig.resolver?.resolveRequest;
const defaultResolveRequest = config.resolver?.resolveRequest;

nativeWindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === "web" &&
    context.originModulePath.includes(`${path.sep}react-native-web${path.sep}`)
  ) {
    return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
  }

  return nativeWindResolveRequest(context, moduleName, platform);
};

module.exports = nativeWindConfig;
