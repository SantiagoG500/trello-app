export const BoardModel = ({ name = '', uid = '', id = '' }) => {
	const inbox = [];
	const reminders = [];
	const actions = [];

	return {
		name,
		id,
		uid,
		inbox,
		reminders,
		actions
	};
};
