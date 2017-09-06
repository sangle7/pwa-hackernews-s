import { request, config } from '../utils'

export async function getDatasource (params) {
  return request({
    url: `${config.HNapi}/news?page=${params.page}`,
    method: 'get',
  })
}
