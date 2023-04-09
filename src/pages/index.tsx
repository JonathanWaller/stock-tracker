// import { useEffect } from 'react';
// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

// import { InferGetStaticPropsType } from 'next'

import styles from '../styles/Home.module.css';

// import {WebSocket} from 'websocket';

// export const getServerSideProps: GetServerSideProps = async(context) => {
//   return {
//    props: {
//     // secret: props.env.NAME
//       // secret: process.env.NAME,
//       apiKey: process.env.FINN_KEY
//    }
//   }
//  }


// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cf2nlmqad3ian9c2pnvgcf2nlmqad3ian9c2po00"
// const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.symbolSearch('AAPL', (error:any, data:any, response:any) => {
//   console.log('hello', data)
// });

// export default function Home({apiKey}: InferGetStaticPropsType<typeof getServerSideProps>) {

const Home = () => {

//   const socket = new WebSocket('wss://ws.finnhub.io?token=cf2nlmqad3ian9c2pnvgcf2nlmqad3ian9c2po00');

// // Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// // Unsubscribe
//  var unsubscribe = function(symbol:string) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cf2nlmqad3ian9c2pnvgcf2nlmqad3ian9c2po00"
// const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
//   console.log('response: ', data)
// });

// console.log('WHAT KEY: ', process.env.FINN_KEY)


	const callAPI = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<button onClick={callAPI}>Make API call</button>
        {/* <div>Hello {secret}</div> */}
			</main>
		</div>
	);
}

export default Home;

