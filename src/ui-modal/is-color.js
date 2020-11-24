export const isColor = (strColor) => {
    var s = new Option().style;
    
    s.color = strColor;
    const isBrowserValid = s.color != '';

    return isBrowserValid;
}
