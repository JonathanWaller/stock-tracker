// import { useEffect } from 'react';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// import { InferGetStaticPropsType } from 'next'

// import styles from '../styles/Home.module.css';

import styled from 'styled-components';

import { breakpoints } from '@/styles/breakpoints';

// export const getServerSideProps: GetServerSideProps = async(context) => {
//   return {
//    props: {
//     // secret: props.env.NAME
//       // secret: process.env.NAME,
//       apiKey: process.env.FINN_KEY
//    }
//   }
//  }


const Container = styled.div`
  height: 100vh;
  background-image: url('/home-background-2.png');
  background-repeat: 'no-repeat';
  background-size: cover;
  overflow-y: hidden;

  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: -100px;

  @media (max-width: ${breakpoints.sm}px) {
    margin: -50px;
  }

  @media (max-width: ${breakpoints.md}px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media (max-width: ${breakpoints.sm}px) {
    gap: 15px;
  }
`

const TitleText = styled.div`
  font-size: 100px;
  text-align: center;

  @media (max-width: ${breakpoints.lg}px) {
    font-size: 75px;
  }
  @media (max-width: ${breakpoints.md}px) {
    font-size: 50px;
  }
`

const Description = styled.div`
  font-size: 40px;
  text-align: center;

  @media (max-width: ${breakpoints.lg}px) {
    font-size: 30px;
  }
  @media (max-width: ${breakpoints.md}px) {
    font-size: 30px;
  }
`

const Home = () => {

	return (
    <Container>
        <TextContainer>
          <TitleText>Stock Tracker</TitleText>
          <Description>Find & track the performance of your favorite stocks</Description>
        </TextContainer>
    </Container>
	);
}

export default Home;