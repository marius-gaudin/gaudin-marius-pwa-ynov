import Router from '@koa/router'
import * as exemplesControllers from '#components/exemple/exemple-controllers.js'
const exemples = new Router()

exemples.get('/', exemplesControllers.index)
exemples.get('/:id', exemplesControllers.id)
exemples.post('/', exemplesControllers.create)

// exemples.put('/:id')
// exemples.delete('/:id')

export default exemples