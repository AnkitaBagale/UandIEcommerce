export const cartDetailsCalculator = (data) =>
	data.reduce(
		(sum, { productId: { price, offer }, quantity }) => {
			return {
				totalMRP: sum.totalMRP + Number(price) * Number(quantity),
				discount:
					sum.discount +
					(Number(price) * Number(quantity) * Number(offer)) / 100,
			};
		},
		{ totalMRP: 0, discount: 0 },
	);
