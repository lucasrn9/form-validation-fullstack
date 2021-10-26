import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import registerSchema from '../../formValidations/registerSchema'
import { useHistory } from 'react-router-dom';
import { CircleLoading } from '../index'

const RegisterForm = () => {

    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)

    const [submitStatus, setSubmitStatus] = useState({
        type: '',
        message: ''
    })

    useEffect(() => {
        if (submitStatus.type === "success") {
            setTimeout(() => {
                history.push('/login')
            }, 2500)

        }
    }, [submitStatus, history])

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleRegisterClick = () => {
        let msg = document.getElementById('message')
        msg.style.display = "inline"
        setIsLoading(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData)
        try {
            const validData = await registerSchema.validate(data)

            fetch('http://localhost:3333/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validData)
            }).then(res => res.json())
                .then(data => {
                    setSubmitStatus({
                        type: data.type,
                        message: data.message
                    })
                    setIsLoading(false)
                }).catch(() => {
                    setIsLoading(false)
                    setSubmitStatus({
                        type: 'error',
                        message: "error! couldn't connect to server"
                    })
                })

        } catch (err) {
            setIsLoading(false)
            setSubmitStatus({
                type: 'error',
                message: err.message
            })

        }

    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>

            <Label htmlFor="name">
                <Title>Name</Title>
                <Input type="text" name="name" id="name" onChange={(e) => handleInputChange(e)} value={formValues.name} />
            </Label>

            <Label htmlFor="email">
                <Title>Email</Title>
                <Input type="text" name="email" id="email" onChange={(e) => handleInputChange(e)} value={formValues.email} />
            </Label>

            <Label htmlFor="password">
                <Title>Password</Title>
                <Input type="text" name="password" id="password" onChange={(e) => handleInputChange(e)} value={formValues.password} />
            </Label>

            <Label htmlFor="confirm-password">
                <Title>Confirm password</Title>
                <Input type="text" name="confirmPassword" id="confirmPassword" onChange={(e) => handleInputChange(e)} value={formValues.confirmPassword} />
            </Label>

            <Button type="submit" onClick={handleRegisterClick}>Register</Button>

            <Message className="message" id="message" style={{ color: submitStatus.type === 'error' ? 'red' : 'green' }}>
                {isLoading ? <CircleLoading /> : submitStatus.message}
            </Message>

        </Form>
    )
}

export default RegisterForm;

const Form = styled.form`
width: 35vw;
height: 80vh;
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
font-family: ${(props) => props.theme.fonts.default};
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
font-family: ${(props) => props.theme.fonts.default};
font-weight: bold;
font-size: 14px;
`
const Message = styled.span`
display: none;
width: 100%;
font-size: 14px;
text-align: center;
`