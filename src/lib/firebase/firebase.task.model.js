export const Task = ({
	taskName = '',
	dueDate = '',
	description = '',
	tags = [],
	done = false
}) => {
	return { taskName, dueDate, description, tags, done };
};
