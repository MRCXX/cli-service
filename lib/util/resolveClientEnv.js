const prefixRE = /^VUE_APP_/

module.exports = function resolveClientEnv (options, raw) {
  const env = {}
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || key === 'NODE_ENV') {
      env[key] = process.env[key]
    }
  })
  env.BASE_URL = options.publicPath

  // mrc add
  let arr = ['--ENV', '--NAME', '--VER', '--PREVIEW']
  arr.forEach(item => {
    let index = process.argv.indexOf(item)
    env[item.replace('--', '')] = process.argv[index + 1]
  })
  // mrc add end
  env.abc = 123
  if (raw) {
    return env
  }

  for (const key in env) {
    env[key] = JSON.stringify(env[key])
  }
  return {
    'process.env': env
  }
}
