import styled from 'styled-components';
import React, { useState,useEffect } from 'react';
import loginSchema from '../../formValidations/loginSchema'
import { useHistory } from 'react-router-dom';
import { CircleLoading } from '../index'

const LoginForm = ()=>{

const history = useHistory();

const[isLoading,setIsLoading] = useState(false)

const [submitStatus,setSubmitStatus] = useState({
    type: '',
    message: ''
})

useEffect(()=>{
    if(submitStatus.type==="success"){
        document.cookie="loggedIn=true"
        history.push('/')
    }
    else if(submitStatus.type==='error'){
        setIsLoading(false)
    }
},[submitStatus,history])

const [formValues,setFormValues] = useState({
    email: '',
    password: ''
})

const handleInputChange = (e)=>{
  setFormValues({
     ...formValues,
    [e.target.name]: e.target.value
  })
}

const handleLoginclick = ()=>{
    setIsLoading(true)
    let msg = document.getElementById('message')
    msg.style.display="inline"
}

const handleSubmit = async (e)=>{
e.preventDefault()
const formData = new FormData(e.target);
const data = Object.fromEntries(formData)

try{
    const validData = await loginSchema.validate(data)

    fetch('http://localhost:3333/api/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(validData) 
    }).then(res=>res.json())
    .then(data=>{
        setSubmitStatus({
            type: data.type,
            message: data.message
        })
    }).catch(()=>{
        setIsLoading(false)
        setSubmitStatus({
        type: 'error',
        message: "error! couldn't connect to server"
    })
})
}catch(err){
    setIsLoading(false)
    setSubmitStatus({
        type: 'error',
        message: err.message
    })
}

}

return (
    <Form onSubmit={(e)=>handleSubmit(e)}>

    <Label htmlFor="email">
    <Title>Email</Title>
    <Input type="text" name="email" id="email" onChange={(e)=>handleInputChange(e)} value={formValues.email} />
    </Label>

    <Label htmlFor="password">
    <Title>Password</Title>
    <Input type="text" name="password" id="password" onChange={(e)=>handleInputChange(e)} value={formValues.password}/>
    </Label>

    <Button type="submit" onClick={handleLoginclick}>Login</Button>

    <Message className="message" id="message" style={{color: submitStatus.type==='error'?'red':'green'}}> 
    {isLoading ? <CircleLoading /> : submitStatus.message} 
    </Message>

    </Form>
)
}

export default LoginForm;

const Form = styled.form`
width: 35vw;
height: 40vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`

const Label = styled.label`
display:flex;
flex-direction: column;
align-items: center;
`
const Title = styled.span`
margin-bottom: 6px;
`

const Input = styled.input`
border: none;
border-radius: 20px;
width: 220px;
height: 40px;
font-family: ${(props)=>props.theme.fonts.default};
font-weight: bold;
font-size: 14px;
padding-left: 16px;
`

const Button = styled.button`
cursor: pointer;
border: none;
border-radius: 10px;
width: 100px;
height: 40px;
font-family: ${(props)=>props.theme.fonts.default};
font-weight: bold;
font-size: 14px;
`
const Message = styled.span`
display: none;
width: 100%;
font-size: 14px;
text-align: center;
`