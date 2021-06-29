export const trimCharacters = (title) => {
	if (title.length < 25) {
		return title;
	}
	return title.substr(0, 23) + '..';
};
