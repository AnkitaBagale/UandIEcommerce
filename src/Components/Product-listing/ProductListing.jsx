import { useStateContext } from '../../Context';
import { getSortedData, getFilteredData, Filter } from './DataFilter';
import { ProductCard } from './ProductCard';
import './styles.css';

export const ProductListing = () => {
	const { state } = useStateContext();
	const sortedData = getSortedData(state, state.products);
	const filterdData = getFilteredData(state, sortedData);

	return (
		<>
			<div className='spacer-3rem'></div>
			<div className='display-flex-filter'>
				<div className='grid-left-filter'>
					<Filter />
				</div>

				{filterdData.length === 0 ? (
					<h6 className='p text-center grid-right-of-filter padding-around-1rem'>
						No Products Found
					</h6>
				) : (
					<div className='grid-3-column-layout grid-right-of-filter padding-around-1rem'>
						{filterdData.map((product) => {
							return <ProductCard key={product._id} product={product} />;
						})}
					</div>
				)}
			</div>
		</>
	);
};
