import Task from '#components/task/task-model.js';
import Joi from 'joi';

export async function index (ctx) {
    try {
        const task = await Task.find({});
        ctx.ok(task);
    }
    catch(e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function id (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, task ressource not found'});
        const task = await Task.findById(ctx.params.id).populate('list');
        ctx.ok(task);
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function create (ctx) {
    try {
        const taskValidationSchema = 
            Joi.object({
                title: Joi.string().required(),
                description: Joi.string(),
                list: Joi.string().required(),
                done: Joi.boolean()
            });

        const { error, value } = taskValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);
        console.log('No error found continuing the process',value);
        const newTask = await Task.create(value);
        ctx.ok(newTask);
    } catch(e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function update (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, task ressource not found'});
        const taskValidationSchema = 
        Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            list: Joi.string().required(),
            done: Joi.boolean()
        });
        const { error, value} = taskValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        const task = await Task.findByIdAndUpdate(ctx.params.id, value, { runValidators: true, new: true });
        ctx.ok(task);
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function del (ctx) {
    try {
        if(!ctx.params.id || ctx.params.id.length <= 0) ctx.notFound({message: 'Id missing, task ressource not found'});
        await Task.findByIdAndDelete(ctx.params.id);
        ctx.ok();
    } catch(e) {
        ctx.badRequest({ message: e.message });
    }
}