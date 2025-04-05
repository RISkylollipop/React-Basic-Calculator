


function NewCalculator() {
    return (
        <div>
            <h1>Calculator</h1>
            <NewCalculatorBtn value="7"/>
        </div>
    );
}




function NewCalculatorBtn(props) {
    return(

        <>
        <button>{props.value}</button>
        </>
    );
}

export default NewCalculator;