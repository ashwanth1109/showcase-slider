// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { bg, flex, fSize, pos, h } from "./style";

// ------------------------------------------------------------
// project showcase component
// ------------------------------------------------------------
export const projectShowcase = {
    container: {
        width: "400px",
        height: "200px",
        ...bg.white,
        borderRadius: "5px",
        position: "relative",
        overflow: "hidden",
        ...flex.row
    },
    imgContainer: {
        width: "400px",
        height: "200px",
        maxHeight: "200px",
        position: "absolute"
    },
    image: {
        position: "absolute",
        width: "400px",
        height: "200px",
        objectFit: "cover"
    },
    user: {
        position: "absolute",
        color: "#fff",
        bottom: "7.5px",
        left: "25px",
        zIndex: "1"
    },
    firstContainer: {
        left: "0px"
    },
    firstImage: {
        right: "0px"
    },
    secondContainer: {
        right: "0px"
    },
    secondImage: {
        left: "0px"
    },
    infoContainer: {
        width: "100%",
        height: "35px",
        position: "absolute",
        bottom: "0px",
        padding: "0px 30px",
        boxSizing: "border-box"
    },
    info: {
        ...fSize,
        ...flex.row
    },
    dots: {
        ...h.h100p,
        ...flex.row,
        ...pos.alignCenter,
        zIndex: "1"
    },
    dot: {
        width: "10px",
        height: "10px",
        borderRadius: "6px",
        border: "1px solid #fff",
        margin: "0 3.5px"
    },
    selected: {
        backgroundColor: "#fff"
    },
    unselected: {
        backgroundColor: "#ffffff00"
    },
    progress: {
        ...flex.row,
        position: "absolute",
        width: "100%",
        height: "35px",
        bottom: "0px",
        left: "0px"
    }
};
