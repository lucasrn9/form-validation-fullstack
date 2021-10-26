import React from 'react';
import RegisterForm from '../components/registerForm/RegisterForm'
import styled from 'styled-components';

const Register = () => {
    return (
        <Layout className="layout">
            <Container className="register-form">
                <RegisterForm />
            </Container>
        </Layout>
    )
}

const Layout = styled.div`
display:flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 89vh;
`

const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
height: 50%;
`

export default Register;