// Imports
import React from "react";

// Component
const FormRowSelect = ({ name, value, handleChange, labelText, options }) => {

    // Return
    return(
        <div className="form-row">
			<label htmlFor={ name } className="form-label">{ labelText || name }</label>
			<select name={ name } id={ name } className="form-select" 
				value={ value } onChange={ handleChange }>
					{
						options.map((option, index) => {
							return(
								<option key={ index } value={ option }>
									{ option }
								</option>
							);
						})
					}
			</select>
		</div>
    );
    
};

// Export
export default FormRowSelect;