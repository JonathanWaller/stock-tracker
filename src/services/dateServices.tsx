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

export const getReadableTimeSince = (date: Date) =>  {
    // @ts-ignore
    const seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) {
      let years = Math.floor(interval)
      return `${years} year${years > 1 ? 's' : ''}`
    }
  
    interval = seconds / 2592000;
    if (interval > 1) {
      let months = Math.floor(interval)
      return `${months} month${months > 1 ? 's' : ''}`
    }
    interval = seconds / 86400;
    if (interval > 1) {
      let days = Math.floor(interval)
      return `${days} day${days > 1 ? 's' : ''}`
    }
    interval = seconds / 3600;
    if (interval > 1) {
      let hours = Math.floor(interval)
      return `${hours} hour${hours > 1 ? 's' : ''}`
    }
    interval = seconds / 60;
    if (interval > 1) {
      let minutes = Math.floor(interval)
      return `${minutes} minute${minutes > 1 ? 's' : ''}`
    } 

    return 'Less than a minute'
  }

