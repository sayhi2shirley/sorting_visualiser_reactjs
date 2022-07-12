import { useState, useEffect } from "react";
import "./bar.css";

/* Bar Component to hold the random array values. */
const Bars = ({arrIdx, height, chgdArr}) => {

    const [len, setLen] = useState(height);

    useEffect (() => {
        setLen(height);
    }, [height])

    let barStyle = {
        background: '#3d5af1',
        height: height+100,
        /* marginTop aligns the array elements at the bottom */
        marginTop: 200 - (height+100),
    }

    let textHeightStyle = {
        width: height+100,
        top: Math.floor((height+150)/2) - 10,
        left: -Math.floor((height+100)/2) + 10,
    }

    /* User's input will be adjusted in the bar */
    const handleBarChange = (e) => {
        let val = e.target.value;
        if (val === '') {
            setLen(0); 
            chgdArr(arrIdx, 0);
        } else {
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
                setLen(val);
                chgdArr(arrIdx, val);
            }
        }
    }

    // Customised Bar to get the array elements from User.
    return(
        <div className="bar" style={barStyle}>
            <input type="number" className='textHeight' style={textHeightStyle} 
                   value={len} onChange={handleBarChange} />
            <div className="qltyNavigation">
                <div className="qty-btn qty-up">
                   +
                </div>  
                <div className="qty-btn qty-down">
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
    );
    */
    
};

export default Bars;