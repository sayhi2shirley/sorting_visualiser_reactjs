// Functional component - everything can be done by this.
// We are using here the combination of class and functional component 
const Bars = ({arrIdx, height}) => {
    return(
        <div className="bar">
            <div className="array-height">
                {height}
            </div>
        </div>
    );
};
export default Bars;