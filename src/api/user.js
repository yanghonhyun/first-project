import request from '@/utils/request.js'
//用户注册请求
export const userRegistration = (obj) => request.post('', obj)
//用户登录
export const userLoginService = (username, password) =>
  request.post('', { username, password })
//获取用户信息
export const userGetInfoService = () => request.get('')
//修改用户信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('', { id, nickname, email })
//上传头像
export const userUploadAvatarService = (avatar) => request.patch('', { avatar })
//更新用户密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('', { old_pwd, new_pwd, re_pwd })
