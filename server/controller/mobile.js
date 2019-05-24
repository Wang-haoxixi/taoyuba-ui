exports.getMobileCode = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: ctx.params.mobile
  }
  ctx.body = json
}