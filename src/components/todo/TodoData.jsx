const TodoData = (props) => {
    //props là một biến object {}
    // {
    //     name: "Eric",
    //     age: 25,
    //     data: {}
    // }
    // destructuring object
    // const { name, age, data } = props
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    console.log("check log: ", props)
    return (
        <div>
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    )
}

export default TodoData;