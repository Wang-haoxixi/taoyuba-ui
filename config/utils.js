const execSync = require('child_process').execSync
const package = require('../package.json')

exports.getProject = function () {
  return package.repository.name.toString().trim()
}

exports.getProjectTeam = function () {
  return package.repository.team.toString().trim()
}

exports.getProjectName = function () {
  return package.name.toString().trim()
}

exports.getCurrentTag = function () {
  return package.version.toString().trim()
}

exports.getGitHash = function () {
  return execSync('git rev-parse HEAD')
    .toString()
    .trim()
}

exports.getProjectDesc = function () {
  const desc = `更新日志为<a href="${package.repository.changelogurl}">${package.repository.changelogurl}</a>`
  return desc.toString().trim()
}
