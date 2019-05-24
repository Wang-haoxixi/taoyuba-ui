const env = process.env
// 测试包括假数据测试
// 其他情况包括开发模式与部署模式
export const isMock = env.NODE_ENV === 'test'
