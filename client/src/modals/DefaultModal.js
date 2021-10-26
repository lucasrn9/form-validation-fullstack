import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DefaultModal = ({closeModal})=>{
    return (
        <Background className="modal-background" id="modal-background" onClick={(e)=>closeModal(e)}>
        <Container className="modal-container">
        <Button id="close-button" onClick={closeModal}>X</Button>
        <Content> Modal content goes right here </Content>
        </Container>
        </Background>
        )
}

DefaultModal.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default DefaultModal;

const Background = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
z-index: 9999;
top: 0;
right: 0;
bottom: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0,0.7);
`

const Container = styled.div`
width: 300px;
height: 50%;
background-color: white;
border-radius: 4px;
`
const Content = styled.span`
display: block;
margin: 20px 15px;
color: black;
`

const Button = styled.button`
position: relative;
left: 140px;
font-weight: bold;
border: none;
border-radius: 2px;
background-color: #121214;
color: white;
cursor: pointer;
`