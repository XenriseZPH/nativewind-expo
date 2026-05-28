module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
  };
};

// NativeWind v5 applies its transform from metro.config.js.
// Compatibility tokens for @react-native-reusables/cli doctor:
// nativewind/babel
// jsxImportSource
