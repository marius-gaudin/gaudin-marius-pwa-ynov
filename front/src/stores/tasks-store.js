import { defineStore } from 'pinia'
import { addTask, removeTask, getAllTasks } from 'services/tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  getters: {
    getTasksList: (state) => {
      return (idList) => state.tasks.filter(task => task.list === idList)
    },
    getCompletedTasksList: (state) => {
      return (completed, idList) => state.tasks.filter(task => task.list === idList && task.done === completed)
    }
  },
  actions: {
    async addTask (task) {
      const { data } = await addTask(task)
      this.tasks.push(data)
    },
    async removeTask (idTask) {
      await removeTask(idTask)
      this.tasks = (await getAllTasks()).data
    }
  }
})
