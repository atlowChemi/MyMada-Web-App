/**
 * Returns the Rem value of given pixels
 * @param rem size in REM, to get returned in px.
 */
export const convertRemToPixels = (rem: number): number => {  
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}