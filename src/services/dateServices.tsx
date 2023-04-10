import { subMonths, subDays, format } from 'date-fns';

export const convertDatesToUnix = ( monthsPrior: number) => {
    const todayUnix: number = Math.trunc( new Date().getTime()/1000 );
    const priorDate = subMonths( new Date(), monthsPrior);
    const priorUnix: number = Math.trunc( priorDate.getTime()/1000 );

    return [ priorUnix, todayUnix  ]
}

export const convertDatesToString = ( daysPrior: number ) => {
    const todayString = format(new Date(), 'yyyy-MM-dd');
    const priorDate = subDays( new Date(), daysPrior);
    const priorString = format( priorDate, 'yyyy-MM-dd');
    
    return [priorString, todayString]
}

