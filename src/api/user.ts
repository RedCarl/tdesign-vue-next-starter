import { request } from '@/utils/request';

export function userLogin(data: any) {
  return request.post({
    url: '/user/login',
    data,
  });
}
export function userLogout() {
  return request.post({
    url: '/user/logout',
  });
}

export function userInfo() {
  return request.get({
    url: '/user/info',
  });
}

export function userMenu() {
  return request.get({
    url: '/user/menu',
  });
}

export function sysUserQueryById(id: number) {
  return request.get({
    url: `/user/queryById?id=${id}`,
  });
}

export function sysUserQueryByPage(params: any) {
  return request.get({
    url: '/user/queryByPage',
    params,
  });
}

export function sysUserReplace(params: any) {
  return request.post({
    url: '/user/replace',
    params,
  });
}

export function sysUserDelete(ids: string) {
  return request.delete({
    url: `/user/delete?ids=${ids}`,
  });
}
