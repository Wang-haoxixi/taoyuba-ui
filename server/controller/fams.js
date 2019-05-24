exports.getControllerPage = async function (ctx) {
    ctx.body = `{"code":0,"msg":"success","data":{"records":[
      {"id":"1","ruler":"张超","action":"提交","attribute":"傲娇","govValue":6,"govUpper":"无","accumulatedApply":"1222"},
      {"id":"2","ruler":"张超","action":"提交","attribute":"傲娇","govValue":77,"govUpper":"无","accumulatedApply":"2322"},
      {"id":"3","ruler":"张超","action":"提交","attribute":"傲娇","govValue":88,"govUpper":"无","accumulatedApply":"2222"},
      {"id":"4","ruler":"张超","action":"提交","attribute":"傲娇","govValue":99,"govUpper":"无","accumulatedApply":"2222"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
  }

exports.getPersonalAccountManagementPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[
    {"ranking":"1","name":"张超","departments":"提交","income":"傲娇","expenditure":6,"balance":"无","status":"1"},
    {"ranking":"2","name":"张超","departments":"提交","income":"傲娇","expenditure":77,"balance":"无","status":"1"},
    {"ranking":"3","name":"张超","departments":"提交","income":"傲娇","expenditure":88,"balance":"无","status":"1"},
    {"ranking":"4","name":"张超","departments":"提交","income":"傲娇","expenditure":99,"balance":"无","status":"1"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getFinancialManagementPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[
    {"number":"1","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"22.5","expenditure":6,"balance":"21.9","status":"1"},
    {"number":"2","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"84","expenditure":77,"balance":"22","status":"2"},
    {"number":"3","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"20.2","expenditure":88,"balance":"22.2","status":"0"},
    {"number":"4","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"53","expenditure":55,"balance":"52","status":"1"},
    {"number":"5","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"22.5","expenditure":6,"balance":"21.9","status":"2"},
    {"number":"6","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"84","expenditure":77,"balance":"22","status":"2"},
    {"number":"7","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"20.2","expenditure":88,"balance":"22.2","status":"1"},
    {"number":"8","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"53","expenditure":55,"balance":"52","status":"1"},
    {"number":"9","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"22.5","expenditure":6,"balance":"21.9","status":"0"},
    {"number":"10","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"84","expenditure":77,"balance":"22","status":"0"},
    {"number":"11","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"20.2","expenditure":88,"balance":"22.2","status":"2"},
    {"number":"12","date":"2014-11-01","abstract":"摘要","remarks":"备注","name":"张超","departments":"提交","income":"53","expenditure":55,"balance":"52","status":"1"}
  ],"total":12,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getGCJournalPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[
    {"id":"1","class":"张超","contacts":"提交","money":"傲娇","data":6,"remark":"无"},
    {"id":"2","class":"张超","contacts":"提交","money":"傲娇","data":77,"remark":"无"},
    {"id":"3","class":"张超","contacts":"提交","money":"傲娇","data":88,"remark":"无"},
    {"id":"4","class":"张超","contacts":"提交","money":"傲娇","data":99,"remark":"无"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}

exports.getInvoiceNotificationPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[
    {"id":"1","purchaser":"张超","seller":"提交","money":"傲娇","applyDate":6,"status":"无","auditor":"1222","auditDate":"1222"},
    {"id":"2","purchaser":"张超","seller":"提交","money":"傲娇","applyDate":77,"status":"无","auditor":"2322","auditDate":"1222"},
    {"id":"3","purchaser":"张超","seller":"提交","money":"傲娇","applyDate":88,"status":"无","auditor":"2222","auditDate":"1222"},
    {"id":"4","purchaser":"张超","seller":"提交","money":"傲娇","applyDate":99,"status":"无","auditor":"2222","auditDate":"1222"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
