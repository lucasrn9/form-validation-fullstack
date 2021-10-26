import React from 'react';
import styled from 'styled-components';

const CircleLoading = () => <Circle />

const Circle = styled.div`
margin: auto;
width: 40px;
height: 40px;
border: 5px solid rgba(255,255,255,0.2);
border-radius: 50%;
border-top-color: white;
animation: spin 1s linear infinite;

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

`

export default CircleLoading