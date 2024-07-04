import { request } from '@/utils/request';

export function menuQuery(id: string) {
  return request.get({
    url: `/menu/query?id=${id}`,
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
