import { useReducer } from "react"

function calculadora(state, action) {

    switch (action.type) {
        case 'SUMAR':
            return { numero: state.numero + 1 };
        case 'RESTAR':
            return { numero: state.numero - 1 };
        default:
            return state;
    }
    
}

export default function ReducerScreen() {
    const [state, dispatch] = useReducer(calculadora, { numero: 0 })

    return (
        <div>
            <button onClick={() => dispatch({ type: "SUMAR" })}>Sumar</button>
            <h2>Numero {state.numero}</h2>
            <button onClick={() => dispatch({ type: "RESTAR" })}>Restar</button>
        </div>
    )
}