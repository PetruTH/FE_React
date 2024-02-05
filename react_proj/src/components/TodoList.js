import { Form, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from '../firebase';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import MovingClouds from './MovingClouds';
import Sunny from './Sunny';
import TooHot from './TooHot';

 
const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const emptyToDoList = async(e) => {
      e.preventDefault();
      try {
          const querySnapshot = await getDocs(collection(firestore, "test"));
          querySnapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
          });
          fetchPost();
      } catch (error) {
          console.error("Error deleting documents: ", error);
      }

    };
 
    const addTodo = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(firestore, "test"), {
              todo: todo,    
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        window.location.reload();
    }
 
    const fetchPost = async () => {
       
        await getDocs(collection(firestore, "test"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);                
            })
       
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])
 
    const temperature = localStorage.getItem("temperature");

    return (
      <>
        <Card className="mt-4" style = {{backgroundColor:"#727272"}}>
          <Card.Body>
            <h2 className="text-center mb-4">ToDo List</h2>
            <Form onSubmit={addTodo}>
              <Form.Group controlId="city">
                <Form.Label>Whats on your mind?</Form.Label>
                <Form.Control
                  className='mb-4 mt-4'
                  type="text"
                  placeholder="What do you have to do today?"
                  onChange={(e) => setTodo(e.target.value)} />

              </Form.Group>
            </Form>
            <div className='d-flex flex-column'>
              <Button type="submit" className="btn btn-primary w-100 mt-2 mb-2" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }} onClick={addTodo}> Add </Button>
              
              <Button type="submit" className="btn btn-primary w-100 mt-2 mb-2" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }} onClick={emptyToDoList}> Remove all objectives </Button>
            </div>

            <Link to="/" className="btn btn-primary w-100 mt-2 mb-2" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}>
              Back to dashboard
            </Link>

            <div>
              <h3>Your activities</h3>
              <div className="todo-content">
                {todos?.map((todo, i) => (
                  <ul>
                    <li key={i}>
                      {todo.todo}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </Card.Body>
          {
            temperature < 5 ? <MovingClouds />
            : temperature < 20 ? <Sunny />
            : <TooHot />
          }
        </Card>        
        
        
      </>
  
    )
}
 
export default Todo