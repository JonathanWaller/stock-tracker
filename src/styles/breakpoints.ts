export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const breakpointsOld = {
    'xs': 0,
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400
}

export const getActiveBreakpoint = ( width: number ): Breakpoint => {
    if ( width > breakpointsOld.xxl ) return 'xxl';
    if ( width > breakpointsOld.xl ) return 'xl';
    if ( width > breakpointsOld.lg ) return 'lg';
    if ( width > breakpointsOld.md ) return 'md';
    if ( width > breakpointsOld.sm ) return 'sm'

    return 'xs'
}

/**
 * The size of the breakpoint is referencing the window with that
 * is less than or equal to the pixel number given. Anything above 1400 is XXL.
 * i.e. XS is <= 576
 * 
 * <= should be used for all checks, if you find yourself using >, go up a breakpoint.
 */
export const breakpoints = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400
}