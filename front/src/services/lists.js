import { api } from 'boot/axios'

export function getAllLists () {
  return api.get('/lists')
}

export function removeList (idList) {
  return api.delete(`/lists/${idList}`)
}

export function addList (list) {
  if (list?.title) {
    return api.post('/lists', {
      title: list.title
    })
  }
}

export function setList (list) {
  if (list?._id) {
    return api.put(`/lists/${list._id}`, {
      title: list.title
    })
  }
}
