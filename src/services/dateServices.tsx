import { subMonths } from 'date-fns';

export const convertDatesToUnix = ( monthsPrior: number) => {

    const todayUnix: number = Math.trunc( new Date().getTime()/1000 );
    const priorDate = subMonths( new Date(), monthsPrior);
    const priorUnix: number = Math.trunc( priorDate.getTime()/1000 );

    return [ priorUnix, todayUnix  ]
}