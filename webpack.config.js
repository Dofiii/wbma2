const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      // eslint-disable-next-line max-len
      dangerouslyAddModulePathsToTranspile: ['@codler/react-native-keyboard-aware-scroll-view']
    },
  }, argv);
  return config;
};
