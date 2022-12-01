import Router from '@koa/router'
import * as tasksControllers from '#components/task/task-controllers.js'
const tasks = new Router()

tasks.get('/', tasksControllers.index)
tasks.get('/:id', tasksControllers.id)
tasks.post('/', tasksControllers.create)
tasks.put('/:id', tasksControllers.update)
tasks.del('/:id', tasksControllers.del)

export default tasks