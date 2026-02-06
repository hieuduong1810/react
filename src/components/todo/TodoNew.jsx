import { useState } from 'react'

const TodoNew = (props) => {

    //useState hook (getter/setter)
    // const valueInput = "hieu";
    const [valueInput, setValueInput] = useState("hieu")
    const { addNewTodo } = props

    // addNewTodo("Eric");
    const handleClick = () => {
        console.log("check value input ", valueInput)
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }
    return (
        <div>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button
                onClick={handleClick}
            >Add</button>
            <div>
                My text input is = {valueInput}
            </div>
        </div>
    )
}
export default TodoNew;