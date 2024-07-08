import { request } from '@/utils/request';

export function roleQuery(params: any) {
  return request.get({
    url: '/role/query',
    params,
  });
}

export function rolePage(params: any) {
  return request.get({
    url: '/role/page',
    params,
  });
}

export function roleReplace(params: any) {
  return request.post({
    url: '/role/replace',
    params,
  });
}

export function roleDelete(ids: string) {
  return request.delete({
    url: `/role/delete?ids=${ids}`,
  });
}
