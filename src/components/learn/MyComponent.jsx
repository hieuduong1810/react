// JSX
//fragment

import './style.css'

const MyComponent = () => {
    // const a = "eric";
    // const a = 25;
    // const a = true;
    // const a = undefined;
    // const a = null;
    const a = {
        name: "hieuduong",
        age: 25
    }
    return (
        <>
            <div>{JSON.stringify(a)} & hieuduong update</div>
            <div>{console.log("hieuduongggg")}</div>
            <div className="child"
                style={{ borderRadius: "10px" }}
            >child</div>
        </>
    );
}

export default MyComponent