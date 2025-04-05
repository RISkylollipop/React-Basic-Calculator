import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';



const Calculator = () => {

    const [calc, setCalc] = useState(
        {
            current: "0",
            total: "0",
            isInitial: true,
            preOperator: ""
        }
    );

    const [history, setHistory] = useState(() => {
        const calHistory = localStorage.getItem('total');
        return calHistory ? JSON.parse(calHistory) : "";
    });

    useEffect(() => {
        localStorage.setItem('total', JSON.stringify(history));
    }, [history]);

    function numberHandler(value) {

        let newValue = value;

        if (!calc.current) {
            newValue = calc.current + value
        }
        setCalc({ 
            current: newValue, 
            total: calc.total, 
            isInitial: false, 
            preOperator: calc.preOperator 
        
        })


    }

    function operatorHandler(value) {
        const total = doCalculation();
        setCalc({
            current: total.toString(),
            total: total.toString(),
            isInitial: true,
            preOperator: value
        })

        setHistory(prevHistory => [...prevHistory, total]);

    }

    function doCalculation() {

       let total = parseFloat(calc.total)
        
        switch (calc.preOperator) {
            case "+":
                total += parseFloat(calc.current)
                break;
            case "-":
                total -= parseFloat(calc.current)
                break;
            case "*":
                total *= parseFloat(calc.current)
                break;
            case "/":
                total /= parseFloat(calc.current)
                break;
            default:
                total = parseFloat(calc.current)
                break;
        }
        return total
    }


    function renderDisplay() {
        return calc.current
    }

    function clearDisplay() {
        setCalc(
            {
                current: "0",
                total: "0",
                isInitial: true,
                preOperator: ""
            })
    }
    return (


        <>
            <p>{calc.current}</p> <p>{calc.total}</p>
            <div className='calculator'>Calculator</div>

            <div className='appContainer'>
                <div className='display'>{renderDisplay()}</div>
                <CalculatorBtn value="7" onClick={numberHandler} />
                <CalculatorBtn value="8" onClick={numberHandler} />
                <CalculatorBtn value="9" onClick={numberHandler} />
                <CalculatorBtn value="/" onClick={operatorHandler} />
                <CalculatorBtn value="4" onClick={numberHandler} />
                <CalculatorBtn value="5" onClick={numberHandler} />
                <CalculatorBtn value="6" onClick={numberHandler} />
                <CalculatorBtn value="*" onClick={operatorHandler} />
                <CalculatorBtn value="1" onClick={numberHandler} />
                <CalculatorBtn value="2" onClick={numberHandler} />
                <CalculatorBtn value="3" onClick={numberHandler} />
                <CalculatorBtn value="-" onClick={operatorHandler} />
                <CalculatorBtn value="C" onClick={clearDisplay}/>
                <CalculatorBtn value="0" onClick={numberHandler} />
                <CalculatorBtn value="=" onClick={operatorHandler} />
                <CalculatorBtn value="+" onClick={operatorHandler} />
            </div>



        </>

    );

}


function CalculatorBtn(props) {
    return (
        <>
            <Button className={props.className} onClick={() => props.onClick(props.value)}>{props.value}</Button>
        </>

    )

}

export default Calculator