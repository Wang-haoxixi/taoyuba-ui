import request from '@/router/axios'
const prefixUrl = '/tmlms/tybaudit'

export function audit (id, statusAudit, statusTable, tableName) {
    return request({
      url: `${prefixUrl}/check`,
      method: 'post',
      params: {
        id: id,
        statusAudit: statusAudit,
        statusTable: statusTable,
        tableName: tableName,
      },
    })
  }