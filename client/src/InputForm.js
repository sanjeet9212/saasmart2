import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from "axios";
import './InputForm.css';

function InputForm() {
    const [userInput, setUserInput] = useState({
        name:'',
        email:''
    });

    const [userList, setUserList] = useState([]);
    const {name, email} = userInput;

    const handleInput = (e) => {
        setUserInput({...userInput, [e.target.name]:e.target.value});
    }

    const addUser = (e) => {
        e.preventDefault();
        if (name!=='' && email!==''){
            Axios.post("http://localhost:3001/create", {
                name: name,
                email: email,
                }).then(() => {
                setUserList([
                    ...userList,
                    {
                    name: name,
                    email: email,
                    },
                ]);
            });
        }
        else{
            alert('Enter Valid Input')
        }
        setUserInput({
            name:'',
            email:''
        })
    };

    const getUser = () => {
        Axios.get("http://localhost:3001/retrieve").then((response) => {
        setUserList(response.data);
        });
    };

    return (
        <div className='home-page'>
            <Form className='home-page-form' onSubmit={addUser}>
                <h1>Enter your Details</h1>
                <FormGroup className='form-group'>
                    <Label for="name">Name:</Label>
                    <Input type="text" name="name" id="name" 
                    autoComplete= 'off'
                    value={userInput.name}
                    onChange={handleInput}
                    placeholder="Enter your Name" />
                </FormGroup>
                <FormGroup className='form-group'>
                    <Label for="email">Email:</Label>
                    <Input type="email" name="email" id="email" 
                    autoComplete= 'off'
                    value={userInput.email}
                    onChange={handleInput}
                    placeholder="Enter your Email Address" />
                </FormGroup>
                <div className='submit-button'>
                    <Button>Submit</Button>
                </div>     
            </Form>

        <div className="get-details">
            <button onClick={getUser}>Show User Details</button>

            {userList.map((val, key) => {
            return (
                <div className="show-data">
                <div>
                    <h3>Name: {val.name}</h3>
                    <h3>Email: {val.email}</h3>
                </div>
                </div>
            );
            })}
        </div>
    </div>
    );
}

export default InputForm
