import request from '@/utils/request'
import type { loginParamsRules } from './types/user.d'
import type { User } from '@/types/user.d'
// 密码登录
export const loginByPassword = (loginParams: loginParamsRules) => {
  return request<User>('/login/password', 'POST', loginParams)
}
