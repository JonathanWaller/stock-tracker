export const truncateStringFn = ( str: string, length: number ) => {
    return str.length > length ? 
        str.substring( 0, length - 3 ) + '...' : 
        str;
}