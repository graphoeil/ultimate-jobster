// Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChartComponent from "./AreaChart";
import BarChartComponent from "./BarChart";

// Component
const ChartsContainer = () => {

	// Store
	const { monthlyApplications:data } = useSelector((store) => { return store.allJobs; });

	// Bar or area chart ?
	const [barChart, setBarChart] = useState(true);

	// Return
	return(
		<Wrapper>
			<h4>Monthly applications</h4>
			<button onClick={ () => { setBarChart(!barChart); } }>
				{ barChart ? 'Show area chart' : 'Show bar chart' }
			</button>
			{
				barChart ? <BarChartComponent stats={ data }/> : <AreaChartComponent stats={ data }/>
			}
		</Wrapper>
	);
	
};

// Export
export default ChartsContainer;