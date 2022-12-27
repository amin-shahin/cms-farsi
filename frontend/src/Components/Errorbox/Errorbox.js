import React from "react";
import "./Errorbox.css"

const Errorbox = ({massage}) => {
    return (  
        <h1 className="error-massage-box">{massage}</h1>
    );
}
 
export default Errorbox;
