/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Post, CircleLoading } from '../components'
import { useEffect, useState } from 'react';
import Modal from '../modals/DefaultModal';


const Home = ({ posts, setPosts }) => {

    const { error } = posts

    const [isLoading, setIsLoading] = useState(true)

    const [isModalOpen,setIsModalOpen] = useState(false)

    const openModal = ()=>{
        setIsModalOpen(true)
    }
    
    const closeModal = (e)=>{
        if(e.target.id==='modal-background' || e.target.id==='close-button' ){
            setIsModalOpen(false)
        }
    }

    useEffect(() => {
        fetch('http://localhost:3333/api/posts?qt=5', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)
                setPosts(data)
            }).catch(() => setPosts({ error: "Ops! couldn't connect to the server, please make sure you've followed the GitHub repositorie steps properly " }))

    }, [setPosts])

    

    return (

        <Main>
            {isModalOpen ? <Modal closeModal={closeModal}/> : null}
            <H1 className="page-title">Home Page</H1>
            <Section className="posts">
                {error ? (
                    <div>
                   {error.indexOf('GitHub')===-1 ?
                   error :
                   <h1> 
                       {error.slice(0,error.indexOf('GitHub'))}
                       <a href="#">GitHub</a>
                       {error.slice(error.indexOf('GitHub') + 'GitHub'.length,999)}
                   </h1>
                    }
                    </div>) :
                    (isLoading ? <CircleLoading /> :
                        (posts.map((post, i) => <Post key={i} title={post.title} content={post.body} openModal={openModal}/>)))}
            </Section>
        </Main>

    )
}

Home.propTypes = {
    setPosts: PropTypes.func.isRequired
}

export default Home


const Main = styled.main`
width:80vw;
margin: auto;
text-align: center;
`

const Section = styled.section`
margin-top: 46px;
`

const H1 = styled.h1`
margin-top: 32px;
font-size: 44px;
font-weight: bold;
`