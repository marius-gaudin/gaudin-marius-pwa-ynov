import List from '#components/list/list-model.js';
import Joi from 'joi';

export async function index (ctx) {
    try {
        const list = await List.find({});
        ctx.ok(list);
    }
    catch(e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function id (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, list ressource not found'});
        const list = await List.findById(ctx.params.id);
        ctx.ok(list);
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function create (ctx) {
    try {
        const listValidationSchema = 
            Joi.object({
                title: Joi.string().required(),
            });

        const { error, value } = listValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);
        console.log('No error found continuing the process',value);
        const newList = await List.create(value);
        ctx.ok(newList);
    } catch(e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function update (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, list ressource not found'});
        const listValidationSchema = 
        Joi.object({
            title: Joi.string(),
            favorite: Joi.boolean()
        });
        const { error, value} = listValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        const list = await List.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true });
        ctx.ok(list);
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function del (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, list ressource not found'});
        await List.findByIdAndDelete(ctx.params.id);
        ctx.ok();
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}