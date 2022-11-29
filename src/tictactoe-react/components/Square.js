import React from "react";


/*creating a functional component */

/*destructuring the props into value and onClick*/
const Square = ({ value, onClick }) => {
    const style = value ? 'squares ${value}' : 'squares'; /* if the value is
    null then it would be just squares*/

    /*here the value will be X or O*/
    return (
        <button className={style} onClick={onClick}>  
            {value}
        </button>
    );
};

export default Square;