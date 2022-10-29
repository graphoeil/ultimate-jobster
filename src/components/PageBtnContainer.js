// Imports
import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../store/features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/PageBtnContainer";

// Component
const PageBtnContainer = () => {

	// Store
	const { numOfPages, page } = useSelector((store) => { return store.allJobs; });

	// Dispatch
	const dispatch = useDispatch();

	// All pages
	const pages = Array.from({ length:numOfPages }, (_, index) => {
		// The array is filled with this callback function ,-)
		return index + 1;
	});

	// Navigation
	const nextPage = () => {
		let newPage = page + 1;
		if (newPage > numOfPages){
			newPage = 1;
		}
		dispatch(changePage(newPage));
	};
	const prevPage = () => {
		let newPage = page - 1;
		if (newPage < 1){
			newPage = numOfPages;
		}
		dispatch(changePage(newPage));
	};

	// Return
	return(
		<Wrapper>
			<button className="prev-btn" onClick={ prevPage }>
				<HiChevronDoubleLeft/>
			</button>
			<div className="btn-container">
				{
					pages.map((pageNumber) => {
						return(
							<button key={ pageNumber } onClick={ () => { dispatch(changePage(pageNumber)); } }
								className={ `pageBtn ${ pageNumber === page ? 'active' : '' }` }>
								{ pageNumber }
							</button>
						);
					})
				}
			</div>
			<button className="next-btn" onClick={ nextPage }>
				<HiChevronDoubleRight/>
			</button>
		</Wrapper>
	);

};

// Export
export default PageBtnContainer;