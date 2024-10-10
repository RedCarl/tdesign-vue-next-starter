import { request } from '@/utils/request';

export function menuGroup() {
  return request.get({
    url: '/menu/group',
  });
}

export function menuQuery(params: any) {
  return request.get({
    url: '/menu/query',
    params,
  });
}

export function menuPage(params: any) {
  return request.get({
    url: '/menu/page',
    params,
  });
}

export function menuReplace(params: any) {
  return request.post({
    url: '/menu/replace',
    params,
  });
}

export function menuDelete(ids: string) {
  return request.delete({
    url: `/menu/delete?ids=${ids}`,
  });
}
