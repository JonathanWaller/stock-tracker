import { subMonths } from 'date-fns';
const finnhub = require('finnhub');
import axios from 'axios';

import { convertDatesToUnix } from '@/services/dateServices';

export const getCandleData = async( apiKey: string, stocks: string[]) => {
  let total;
  console.log('TOP')
    // Instead of the file system,
    // fetch post data from an external API endpoint
    // const res = await fetch('..');
    // return res.json();

    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = apiKey;
    // const finnhubClient = new finnhub.DefaultApi()

    // finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
    // console.log('response: ', data)
    // });



    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = apiKey;
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
    console.log('response: ', data)
    // return data;
    total = data;
    });

    // const promises = stocks.map((stock: string, index: number ) => {
    //   console.log('MAP: ', stock)
      // finnhubClient.stockCandles(stock, "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
      //   // console.log('response: ', data)
      //   console.log('RESPONSE: ', {...data, ...{stock}})
      //   // return data;
      //   return {...data, ...{stock}}
      // });
    // })


    /// ------------------

      const getResults = async (stock:any) => {

        let z;
        // return 
        finnhubClient.stockCandles(stock, "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
          console.log('response: ', data)
          // z = data;

          return data;
          
          // console.log('RESPONSzzzE: ', {...data, ...{stock}})
          // return data;
          // return {...data, ...{stock}}
        });

        console.log('ZZZZZ: ', z)
      }

      const getItems = async () => {
        const withRes = await Promise.all(stocks.map( stock => getResults(stock)));
        console.log('WITH RES: ' , withRes)
        return withRes;
      }

      // const items = getItems();

      getItems().then( res => {
        console.log('BIG FINALE: ', res)
      })

      // const finalItem = (stock: any ) => {

      // }

      // const nextItem = async (stock:any) => {
      //   return finalItem( stock )
      // }

      // const begin = async () => {
      //   return Promise.all(stocks.map(stock => nextItem(stock)))
      // }

  



    // --------------




    // const forEachPromise = (stocks: string[] ) => {
    //   return stocks.reduce(function (promise, item) {
    //       return promise.then(function () {
    //           finnhubClient.stockCandles(item, "D", 1590988249, 1591252249, (error:any, data:any, response:any) => {
    //             console.log('response: ', item, '----', data)
    //             return data;
    //           });
    //       });
    //   }, Promise.resolve());
    // }

    // console.log('WELL: ', forEachPromise)

    // const forEachPromise = (stocks: string[] ) => {
    //   return stocks.reduce( async ( promise, item) => {
    //     await promise;
    //     finnhubClient.stockCandles(item, "D", 1590988249, 1591252249, (error: any, data: any, response: any) => {
    //       console.log('response: ', item, '----', data);
    //       return data;
    //     });
    //   }, Promise.resolve());
    // }

    // const forEachPromise = (stocks: string[] ) => {
    //   return stocks.reduce( async ( promise, item) => {
    //     await promise;
        // finnhubClient.stockCandles(item, "D", 1590988249, 1591252249, (error: any, data: any, response: any) => {
        //   console.log('response: ', item, '----', data);
        //   return data;
        // });
    //   }, Promise.resolve());
    // }

    // forEachPromise(stocks).then((res: any) => {
    //   console.log('RES: ', res)
    // })

    let combined: any[] = []

    // const promises = stocks.map(( stock: string) => {
    //   return finnhubClient.stockCandles(stock, "D", 1590988249, 1591252249, (error: any, data: any, response: any) => {
    //       console.log('response: ', stock, '----', data);
    //       // return data;
    //       combined.push(data)
    //       return combined;
    //     });
    // })

    // Promise.all(promises).then( (results) => {
    //   console.log('FINALE: ', results)
    // })

    const d = new Date();
    // let z = new Date();
    let z = subMonths( new Date(), 2)
    // const sixMonthsPrior = z.setMonth( d.getMonth()-3);
    // const todayUnix = d.getTime()/1000;
    // const sixMonthsPriorUnix = z.getTime()/1000;

    // console.log('D: ', d)
    // console.log('Z: ', z)
    // console.log('TODAY: ', todayUnix)
    // console.log('TRUNC: ', Math.trunc(todayUnix))
    // console.log('6 MONTHS: ', sixMonthsPriorUnix)

    const [ priorUnix, todayUnix ] = convertDatesToUnix( 2 )

    // console.log('FROM: ', from)
    // console.log('TO: ', to)


    // const bar = new Promise( (resolve, reject ) => {
    //   stocks.forEach((value, index, array ) => {
    //     finnhubClient.stockCandles(value, "D", 1590988249, 1591252249, (error: any, data: any, response: any) => {
    //       // finnhubClient.stockCandles(value, "D", sixMonthsPriorUnix, todayUnix, (error: any, data: any, response: any) => {
    //       console.log('response: ', value, '----', data);
    //       combined.push({stock: value, data })
    //       if( index === array.length - 1 ) resolve(combined);
    //     });
    //   })
    // })

    // try {
      // const res = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1631022248&to=1631627048&token=${apiKey}`)
      // const res = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=${priorUnix}&to=${todayUnix}&token=${apiKey}`)
      // const res = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1631022248&to=1631627048&token=${apiKey}`)
      // console.log('RESSSSS: ', res.data)


    // } catch ( e: any ) {
    //   console.log(`Error fetching data - ${e.message}`)
    // }

    // const bar = new Promise((resolve, reject ) => {
    //   stocks.forEach((value, index, array ) => {
    //     try {
    //       const res = axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1631022248&to=1631627048&token=${apiKey}`)
    //       console.log('RESSSSS: ', res)


    //     } catch ( e: any ) {
    //       console.log(`Error fetching data - ${e.message}`)
    //     }
    //     // finnhubClient.stockCandles(value, "D", 1590988249, 1591252249, (error: any, data: any, response: any) => {
    //     //   // finnhubClient.stockCandles(value, "D", sixMonthsPriorUnix, todayUnix, (error: any, data: any, response: any) => {
    //     //   console.log('response: ', value, '----', data);
    //     //   combined.push({stock: value, data })
    //     //   if( index === array.length - 1 ) resolve(combined);
    //     // });
    //   })
    // })

    // bar.then( (res: any) => {
    //   console.log('DUNZO', res)
    // })

      // return 'hiiii'

      return total;

  }