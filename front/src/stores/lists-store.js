import { defineStore } from 'pinia'
import { removeList, getAllLists, addList, setList } from 'services/lists'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: []
  }),
  getters: {
    getByID: (state) => {
      return (id) => state.lists.find(list => list._id === id)
    }
  },
  actions: {
    async addList (list) {
      const { data } = await addList(list)
      this.lists.push(data)
    },
    async removeList (id) {
      await removeList(id)
      this.lists = (await getAllLists()).data
    },
    async setList (list) {
      await setList(list)
      this.lists[this.lists.findIndex(l => l._id === list._id)] = list
    }
  }
})
