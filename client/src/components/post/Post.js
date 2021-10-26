import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const Post = ({ title, content,openModal }) => {
    return (
        <Wrapper onClick={openModal} className="post">
            <Title> {title} </Title>
            <Content>
                {content}
            </Content>
        </Wrapper>
    )
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    openModal: PropTypes.func
}

export default Post

const Wrapper = styled.div`
margin: auto;
padding: 8px;
width: 50vw;
margin-bottom: 15px;
border: 1px solid rgba(250,250,250,0.2);
cursor: pointer;
`
const Title = styled.h3`
font-size: 20px;
margin-bottom: 4px;
`

const Content = styled.span`  
margin: auto;
width: 95%;
text-align: justify;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
`