import Router from '@koa/router'
import exemplesRoutes from '#components/exemple/exemple-routes.js'
import tasksRoutes from '#components/task/task-routes.js'
import listRoutes from '#components/list/list-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.use('/exemples', exemplesRoutes.routes(), exemplesRoutes.allowedMethods())
API_V1_ROUTER.use('/tasks', tasksRoutes.routes(), tasksRoutes.allowedMethods())
API_V1_ROUTER.use('/lists', listRoutes.routes(), listRoutes.allowedMethods())

export { API_V1_ROUTER }