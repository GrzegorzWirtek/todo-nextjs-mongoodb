import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
	task: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
});

const TaskModel = models.Task || model('Task', taskSchema);

export default TaskModel;
