import Router from '@koa/router'
import * as listControllers from '#components/list/list-controllers.js'
const tasks = new Router()

tasks.get('/', listControllers.index)
tasks.get('/:id', listControllers.id)
tasks.post('/', listControllers.create)
tasks.put('/:id', listControllers.update)
tasks.del('/:id', listControllers.del)

export default tasks