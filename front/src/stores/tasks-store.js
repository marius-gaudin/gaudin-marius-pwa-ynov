import { defineStore } from 'pinia'
import { addTask } from 'services/tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  getters: {
    getTasksList: (idList) => {
      return this.tasks.filter(task => task.list === idList)
    },
    getCompletedTasksList: (completed, idList) => {
      return this.tasks.filter(task => task.list === idList && task.done === completed)
    },
    getTasksNotCompletedList: (idList) => {
      return this.tasks.filter(task => task.list === idList && !task.done)
    }
  },
  actions: {
    async addTasks (task) {
      const newTask = await addTask(task)
      this.tasks.push(newTask)
    }
  }
})
