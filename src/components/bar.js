import { useState, useEffect } from "react";
import "./bar.css";

/* Bar Component to hold the random array values. */
const Bars = ({arrIdx, height, chgdArr}) => {

    const [len, setLen] = useState(height);

    console.log(len);
    console.log(height);
    
    useEffect (() => {
        setLen(height);
    }, [height])

    /* Handling Array Bar */
    let barStyle = {
        background: '#3d5af1',
        height: height*10,
        /* marginTop aligns the array elements at the bottom */
        marginTop: 200 - (height*10),
    }

    let textHeightStyle = {
        width: height*10,
        top: Math.floor((height*10)/2) - 10,
        left: -Math.floor((height*10)/2) + 10,
    }

    /* User's input will be adjusted in the bar */
    const handleBarChange = (e) => {
        let val = e.target.value;
        if (val === '') {
            setLen(0); 
            chgdArr(arrIdx, 0);
        } else {
            val = parseInt(e.target.value);
            if (val < 0 || val > 20) {
                if (val < 0) {
                    setLen(0);
                    chgdArr(arrIdx, 0);
                } else {
                    setLen(20);
                    chgdArr(arrIdx, 20);
                }
            } else {
                setLen(val);
                chgdArr(arrIdx, val);
            }
        }
        console.log(len);
        console.log(height);
    }

    /* Quantity Picker Implementation */
    let quantityPickerStyle = {
        top: (height*10) + 15,
    }
 
    const incrementQtyPkr = () => {
        if (len === 20) {
            return;
        }
        setLen(len + 1);
        chgdArr(arrIdx, len + 1);
    }

    const decrementQtyPkr = () => {
        if (len === 0) {
            return;
        }
        setLen(len - 1);
        chgdArr(arrIdx, len - 1);    
    }

    // Customised Bar to get the array elements from User.
    return(
        <div className="bar" style={barStyle}>
            <input type="number" className='textHeight' style={textHeightStyle} 
                   value={len} onChange={handleBarChange} />
            <div className="quantityPickerNavigation">
                <div className="qnty-picker-btn qty-up"
                     style={quantityPickerStyle} onClick={incrementQtyPkr}>
                   +
                </div>  
                <div className="qnty-picker-btn qty-down"
                     style={quantityPickerStyle} onClick={decrementQtyPkr}>
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