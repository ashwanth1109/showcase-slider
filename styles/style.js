// ------------------------------------------------------------
// center across both directions in a flex container
// ------------------------------------------------------------
export const fCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};
// ------------------------------------------------------------
// same as fCenter, but in case display flex already applied
// ------------------------------------------------------------
export const center = {
    justifyContent: "center",
    alignItems: "center"
};
// ------------------------------------------------------------
// in case a page / component should occupy full screen size
// ------------------------------------------------------------
export const fScreen = {
    width: "100vw",
    height: "100vh"
};
// ------------------------------------------------------------
// in case a component should occupy full size of parent
// ------------------------------------------------------------
export const fSize = {
    width: "100%",
    height: "100%"
};
// ------------------------------------------------------------
// common styles for width
// ------------------------------------------------------------
export const w = {
    w100p: {
        width: "100%"
    },
    mw1000: {
        maxWidth: "1000px"
    }
};
// ------------------------------------------------------------
// common styles for height
// ------------------------------------------------------------
export const h = {
    h200: {
        height: "200px"
    },
    h100p: {
        height: "100%"
    }
};
// ------------------------------------------------------------
// common styles for margin
// ------------------------------------------------------------
export const m = {
    hAuto: {
        margin: "0 auto"
    }
};
// ------------------------------------------------------------
// row and column display in flex
// ------------------------------------------------------------
export const flex = {
    row: {
        display: "flex",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        flexDirection: "column"
    }
};
// ------------------------------------------------------------
// positioning an element using justify or align
// ------------------------------------------------------------
export const pos = {
    justifyEvenly: {
        justifyContent: "space-evenly"
    },
    alignCenter: {
        alignItems: "center"
    },
    justifyBetween: {
        justifyContent: "space-between"
    }
};
// ------------------------------------------------------------
// background color styles
// ------------------------------------------------------------
export const bg = {
    black: {
        backgroundColor: "#222"
    },
    white: {
        backgroundColor: "#fff"
    },
    transparent: {
        backgroundColor: "transparent"
    }
};
