import { useState } from 'react'

const TodoNew = (props) => {

    //useState hook (getter/setter)
    // const valueInput = "hieu";
    const [valueInput, setValueInput] = useState("hieu")
    const { addNewTodo } = props

    // addNewTodo("Eric");
    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
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