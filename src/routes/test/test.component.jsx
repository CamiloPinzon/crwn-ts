import { useState } from "react";

const initialVal = "";
const initialList = [];

const Test = () => {
  const [val, setVal] = useState(initialVal);
  const [list, setList] = useState(initialList);

  const handleValChange = (event) => {
    setVal(event.target.value);
  };

  const clearInput = () => {
    setVal(initialVal);
  };

  const handleAddList = (event) => {
    event.preventDefault();
    setList([...list, val]);
    clearInput();
  };


  return (
    <>
      <form>
        <input type="text" value={val} onChange={handleValChange} />
        <button onClick={handleAddList}>Add</button>
      </form>
      <div>
        {list.map((item, idx) => (
          <div key={idx}>
            <span>{item}</span>
            <button>delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
