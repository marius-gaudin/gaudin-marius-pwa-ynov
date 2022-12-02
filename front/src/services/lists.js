import { api } from 'boot/axios'

export function getAllLists () {
  return api.get('/lists')
}
