module.exports = function (api) {
  api.cache(true);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/proposal-class-properties',
  ];
  return {
    presets,
    plugins,
  };
};

// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ],
//     "plugins": [
//         "@babel/proposal-class-properties"
//     ]
//   }