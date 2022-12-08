import { api } from 'boot/axios'

export function getAllTasks () {
  return api.get('/tasks')
}

export function setTask (task) {
  if (task?._id) {
    return api.put(`/tasks/${task._id}`, {
      title: task.title,
      done: task.done,
      description: task?.description,
      list: task.list
    })
  }
}

export function addTask (task) {
  if (task?.list && task.title) {
    return api.post('/tasks', {
      title: task.title,
      description: task.description ?? ' ',
      list: task.list
    })
  }
}

export function removeTask (idTask) {
  return api.delete(`/tasks/${idTask}`)
}
