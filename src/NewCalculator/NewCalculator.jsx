import Button from "react-bootstrap/Button"
import styles from './NewCalculator.module.css'
import { useState, useEffect } from "react"

function Calculator() {

    const [calc, setCalc] = useState({
        current: "0",
        total: "0",
        isInitial: true,
        preOperator: ""
    })


    const [history, setHistory] = useState(() => {
        const calHistory = localStorage.getItem('total');
        return calHistory ? JSON.parse(calHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem('total', JSON.stringify(history));
    }, [history]);

    const [showCalculation, setShowCalculation] = useState(false)

    function previousNumber() {

        let newValue = calc.current
        if (newValue !== "") {
            newValue = newValue.substring(0, newValue.length - 1)   // remove the last character  
            if (newValue === "") { newValue = "0" }   // if the last character is removed, then set the value to 0

        }

        setCalc({
            current: newValue,
            total: calc.total,
            isInitial: true,
            preOperator: calc.preOperator
        })
    }




    function numberHandler(value) {
        // alert(`Number clicked ${value}`) to test the props params

        let newValue = value
        if (!calc.isInitial) {
            newValue = calc.current + value
        }

        setCalc({
            current: newValue,
            total: calc.total,
            isInitial: false,
            preOperator: calc.preOperator
        })


    }

    function OperatorHandler(value) {
        // alert(`Operator clicked ${value}`)
        const total = doCalculation();

        setCalc({
            current: total.toString(),
            total: total.toString(),
            isInitial: true,
            preOperator: value
        })

        if (value === "=") {
            setHistory(prevHistory => [
                ...prevHistory,
                `${calc.total} ${calc.preOperator} ${calc.current}  = ${total}` // Store current calculation and result
            ]);
        }
    }
    function doCalculation() {


        let total = parseFloat(calc.total)

        if (calc.isInitial) { return total }

        const current = parseFloat(calc.current);
        if (isNaN(current)) return total;
        switch (calc.preOperator) {
            case "+":
                total += current
                break;
            case "-":
                total -= current
                break;
            case "*":
                total *= current
                break;
            case "/":
                total /= current
                break;
            case "%":
                total = total * (current / 100); // percentage calculation
                break;
            default:
                total = parseFloat(calc.current)
                break;
        }
        if (isNaN(total)) {
            total = 0
            return total
        }
        return total
    }

    function clearHandler() {
        setCalc(
            {
                current: "0",
                total: "0",
                isInitial: true,
                preOperator: ""
            }
        )
    }

    function displayNummber() {
        return calc.current
    }

    function clearHistory() {
        localStorage.clear('total')
        setHistory([])
    }



    return (
        <>
            <div className={styles.mainCalculatorContainer}>

                <div className={styles.calcultorContainer}>
                    <h3>CirCus Calculator</h3>
                    <div className={styles.displaying}>
                        {displayNummber()}</div>

                    <CalculatorBtn value="C" onClick={clearHandler} />
                    <CalculatorBtn value="/" onClick={OperatorHandler} />
                    <CalculatorBtn value="*" onClick={OperatorHandler} />
                    <CalculatorBtn value="⌫" onClick={previousNumber} />




                    <CalculatorBtn value="7" onClick={numberHandler} />
                    <CalculatorBtn value="8" onClick={numberHandler} />
                    <CalculatorBtn value="9" onClick={numberHandler} />
                    <CalculatorBtn value="-" onClick={OperatorHandler} />

                    <CalculatorBtn value="4" onClick={numberHandler} />
                    <CalculatorBtn value="5" onClick={numberHandler} />
                    <CalculatorBtn value="6" onClick={numberHandler} />
                    <CalculatorBtn value="+" onClick={OperatorHandler} />

                    <CalculatorBtn value="1" onClick={numberHandler} />
                    <CalculatorBtn value="2" onClick={numberHandler} />
                    <CalculatorBtn value="3" onClick={numberHandler} />
                    <Button variant="success" className={styles.showbtn} onClick={() => setShowCalculation(!showCalculation)}>
                        {showCalculation ? "Hide history" : "Show history"}
                    </Button>

                    <CalculatorBtn value="%" onClick={OperatorHandler} />
                    <CalculatorBtn value="." onClick={numberHandler} />
                    <CalculatorBtn value="0" onClick={numberHandler} />
                    <CalculatorBtn value="=" onClick={OperatorHandler} className={styles.longbtn} />
                    <div className={styles.displayingbottom}></div>

                </div>

                {!showCalculation ? null : history && history.length > 0 ? (

                    <div className={styles.historyContainer}>
                        <h1>History</h1>
                        {history.map((cals, index) => (
                            <p key={index}>{cals}</p>

                        ))}

                        <Button
                            onClick={clearHistory}
                            style={{ marginBottom: "10px" }}>Clear History</Button>
                    </div>

                ) : <h1 style={{ fontSize: "20px" }}>No History</h1>}

            </div>
        </>
    )
}



function CalculatorBtn(props) {
    return (
        <button className={styles.ButtonDisplay} onClick={() => props.onClick(props.value)}>{props.value}</button>
    )
}


export default Calculator