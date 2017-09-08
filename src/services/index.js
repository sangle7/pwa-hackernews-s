import { request, config } from '../utils'

export async function getDatasource (params) {
  return request({
    url: `${config.HNapi}/${params.name}?page=${params.page}`,
    method: 'get',
  })
}

export async function getComments(params) {
  return request({
    url: `${config.HNapi}/item/${params.itemId}`,
    method: 'get',
  })
}
