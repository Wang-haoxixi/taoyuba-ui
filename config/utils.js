const execSync = require('child_process').execSync
const package = require('../package.json')
exports.getGitHash = function() {
  return execSync('git rev-parse HEAD')
    .toString()
    .trim()
}

exports.getProjectName = function() {
  return package.name.toString().trim()
}

exports.getCurrentTag = function() {
  return package.version.toString().trim()
}

exports.getProjectDesc = function() {
  if (process.env.NODE_ENV === 'production') {
    return `此项目为${package.description}`.toString().trim()
  }
  const desc = `此项目为${package.description}<br/>${package.repository.type}仓库地址为<a href="${package.repository.url}">${package.repository.url}</a>`
  return desc.toString().trim()
}
