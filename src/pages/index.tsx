// import { useEffect } from 'react';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// import { InferGetStaticPropsType } from 'next'

import img from '/home-background.png';

import styles from '../styles/Home.module.css';

import styled from 'styled-components';

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
  background-image: url('/home-background.png');
  //  no-repeat center center fixed;
  // background-repeate: 'no-repeat';
  // -webkit-background-size: cover;
  // -moz-background-size: cover;
  // -o-background-size: cover;
  // background-size: cover;
`

const Home = () => {

	return (
    <Container>
			<main className={styles.main}>
			</main>
    </Container>
	);
}

export default Home;

