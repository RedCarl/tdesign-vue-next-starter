import { request } from '@/utils/request';

export function userLogin(params: any) {
  return request.get({
    url: '/user/login',
    params,
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

export function userQuery(params: any) {
  return request.get({
    url: '/user/query',
    params,
  });
}

export function userPage(params: any) {
  return request.get({
    url: '/user/page',
    params,
  });
}

export function userReplace(params: any) {
  return request.post({
    url: '/user/replace',
    params,
  });
}

export function userDelete(ids: string) {
  return request.delete({
    url: `/user/delete?ids=${ids}`,
  });
}
