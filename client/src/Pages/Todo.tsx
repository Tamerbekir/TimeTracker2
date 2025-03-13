import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import DateTimePicker from "react-datetime-picker";
import "../assets/todo.css";

import "../assets/todo.css";

export default function Todo() {
  interface Todo {
    item: string;
    date: string;
    notes: string;
  }

  const [todo, setTodo] = useState({
    item: "",
    date: "",
    notes: "",
  });

  const [submitTodo, setSubmitTodo] = useState<Todo[]>(() => {
    const savedData = localStorage.getItem("submitTodo");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [complete, setComplete] = useState<boolean | null>(null);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleTodoChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmitTodo = () => {
    setSubmitTodo([...submitTodo, todo]);
  };

  // const handleCompletedTodos = (index: number) => {
  //   setSubmitTodo((previousState) =>
  //     previousState.map((todo, completedItem) =>
  //       completedItem === index ? { ...todo, completed: !completedItem.completed } : todo
  //     )
  //   );
  //   console.log(todo.completed);
  // };

  const handleDeleteTodo = (index: number) => {
    const updateTodo = [...submitTodo];
    updateTodo.splice(index, 1)[0];
    setSubmitTodo(updateTodo);
    console.log(updateTodo);
  };

  useEffect(() => {
    localStorage.setItem("submitTodo", JSON.stringify(submitTodo));
  }, [submitTodo]);

  return (
    <div>
      <div className="container">
        <h1 className="todoList">To Do List</h1>
        <p className="caughtUpText">
          {submitTodo.length < 1 ? (
            <p>Looks like you're all caught up!</p>
          ) : (
            <p>You have {submitTodo.length} tasks remaining</p>
          )}
        </p>
        <InputGroup className="mb-3">
          <FloatingLabel controlId="floatingTextarea2" label="Add an item">
            <Form.Control
              placeholder="To do"
              type="text"
              name="item"
              value={todo.item}
              onChange={handleTodoChange}
              className="todoItem"
              aria-describedby="basic-addon1"
            />
          </FloatingLabel>
        </InputGroup>
        <FloatingLabel controlId="floatingTextarea2" label="Note">
          <Form.Control
            as="textarea"
            name="notes"
            value={todo.notes}
            onChange={handleTodoChange}
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="To do"
            type="date"
            name="date"
            value={todo.date}
            onChange={handleTodoChange}
            className="todoDate"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <button className="addBtn" onClick={handleSubmitTodo}>
          Add
        </button>
      </div>
      <div className="listDiv">
        <h4>List</h4>
        {submitTodo.map((addedItem, index) => (
          <div key={index}>
            <p>Complete by: {addedItem.date}</p>
            <p>To Do: {addedItem.item}</p>
            <p>Notes: {addedItem.notes}</p>
            <div className="deleteBtnDiv">
              <button
                className="deleteBtn"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete
              </button>
              <button
                className="completeBtn"
                onClick={() => handleCompletedTodos(index)}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
