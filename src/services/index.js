import { request, config } from '../utils'

export async function getDatasource (params) {
  return request({
    url: `${config.HNapi}/${config.requestPrefix[params.name].unofficial}?page=${params.page}`,
    method: 'get',
  })
}

export async function getComments(params) {
  return request({
    url: `${config.HNapi}/item/${params.itemId}`,
    method: 'get',
  })
}

export async function getNumbers(params) {
  return request({
    url: `${config.officialAPI}/${config.requestPrefix[params.name].official}.json?print=pretty`,
    method: 'get',
  })
}
