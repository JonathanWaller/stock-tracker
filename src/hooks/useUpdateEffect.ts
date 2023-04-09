import { useEffect, useRef } from 'react';
// UseEffect typically always runs its code on mount, independent of the contents of the 
// dependency array. It then only runs on updates to the dependency array contents

// This hook ensures the code does not run on mount, and only runs upon updates to contents of dependency array
export const useUpdateEffect = function ( effectCallback:any, deps:any[] = [] )  {
    const isFirstMount = useRef( false )
    
    useEffect( () => {
        return () => {
            isFirstMount.current = false
        }
    }, [] )
    useEffect( () => {
        // Do not execute effectcallback for the first time
        if ( !isFirstMount.current ) {
            isFirstMount.current = true
        } else {
            return effectCallback()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps )
}