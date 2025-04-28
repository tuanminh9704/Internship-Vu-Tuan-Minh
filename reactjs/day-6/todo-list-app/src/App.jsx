import './App.css'
import { TodoItems } from './components/TodoItems.jsx';
import { TodoForm } from './components/TodoForm.jsx';
import { useState } from 'react';

function App() {
  const [todos, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  console.log(todos);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((element, id) => id !== index);
    setTodo(updatedTodos);
  };

  const handleEditValue = (index) => {
    setInputValue(todos[index]);
    setIndexValue(index);
    setIsEditing(true);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault
    if(inputValue.trim() === ""){
      alert("Không được để trống!");
      return;
    }
    if(indexValue !== null) {
      const updatedTodo = [...todos];
      updatedTodo[indexValue] = inputValue;
      setTodo(updatedTodo);
      setIndexValue(null);
      setIsEditing(false);
    }
    else {
      setTodo([...todos, inputValue]);
    }    
    setInputValue("")
  }
  return (
    <>
      <h2>Thêm việc cần làm</h2>
      <TodoForm 
        value={inputValue} 
        onChange={handleInputChange} 
        onSubmit={handleOnSubmit}
        isEditing={isEditing}
      />
      <h2>Danh sách việc làm: </h2>
      <ul>
        {
          todos.map((todo, index) => (  
            <TodoItems key={index} text= {todo} index={index} onDelete={handleDelete} onEdit={handleEditValue}/>
          ))
        }
      </ul>
    </>
  )
}

export default App
