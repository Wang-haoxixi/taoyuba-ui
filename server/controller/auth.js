const fs = require('fs');
const path = require('path');

exports.getOauthToken = async function (ctx) {
  ctx.body = `{"access_token":"e87e8b04-a298-47c1-8e90-8d4f85358afd","token_type":"bearer","refresh_token":"1750d93e-c407-41e8-8d31-263b6022f24e","expires_in":43199,"scope":"server","tenant_id":1,"license":"made by gds","dept_id":1,"user_id":1,"username":"admin"}`;
}

exports.postMobileToken = async function (ctx) {
  ctx.body = `{"access_token":"e87e8b04-a298-47c1-8e90-8d4f85358afd","token_type":"bearer","refresh_token":"1750d93e-c407-41e8-8d31-263b6022f24e","expires_in":43199,"scope":"server","tenant_id":1,"license":"made by gds","dept_id":1,"user_id":1,"username":"admin"}`;
}

exports.getTokenLogout = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`;
}
