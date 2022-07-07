// Functional component - everything can be done by this.
import { useState, useEffect } from "react";
import "./bar.css";

// We are using here the combination of class and functional component 
const Bars = ({arrIdx, height, chgdArr}) => {

    // State for only this componenet Bar
    // len is assigned a value of height.
    const [len, setLen] = useState(height);

    useEffect (() => {
        setLen(height);
    }, [height])

    let barStyle = {
        background: '#3d5af1',
        /* bar's width */
        /*width: 10,*/
        height: height,
        /* margin-Top in css, the below one to align to the bottom */
        marginTop: 200 - height,
    }

    let textHeightStyle = {
        width: height,
        top: Math.floor(height/2) - 10,
        /* To keep the text properly aligned */
        left: -Math.floor(height/2) + 10,
    }

    const handleBarChange = (e) => {
        let val = e.target.value;
        if (val === '') {
            setLen(0); 
            chgdArr(arrIdx, 0);
        } else {
            console.log("handleBarChange-else");
            val = parseInt(e.target.value);
            if (val < 2 || val > 200) {
                if (val < 2) {
                    setLen(2);
                    chgdArr(arrIdx, 2);
                } else {
                    setLen(200);
                    chgdArr(arrIdx, 200);
                }
            } else {
                console.log("handleBarChange-else-else");
                console.log({val});
                setLen(val);
                chgdArr(arrIdx, val);
            }
        }
    }

    // User can input the values
    return(
        <div className="bar" style={barStyle}>
            <input type="number" className='textHeight' style={textHeightStyle} 
                   value={len} onChange={handleBarChange} />
            <div className="qualityNav">
                <div className="quantity-btn quantity-up">
                   +
                </div>  
                <div className="quantity-btn quantity-down">
                   -
                </div> 
            </div>
        </div>
    );

    // Rigid Bars with the randomised height
    /*
    return(
        <div className="bar">
            <div className="array-height">
                {height}
            </div>
        </div>
    );*/
    
};
export default Bars;