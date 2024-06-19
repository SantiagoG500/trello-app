export const User = (() => {
	// maybe add validations to check if the user already exist or not
	const addUserToDB = ({ uid = '', name = '', email = '' }) => {
		const boardIds = [];
		const tags = [];

		return {
			uid,
			name,
			email,
			boardIds,
			tags
		};
	};

	return { addUserToDB };
})();
