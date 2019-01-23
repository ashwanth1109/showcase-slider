import { w, m, flex, pos, fSize, fCenter } from "./style";

// ------------------------------------------------------------
// index
// ------------------------------------------------------------
export const index = {
    container: {
        ...w.w100p,
        ...w.mw1000,
        ...m.hAuto,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gridColumnGap: "10px",
        gridRowGap: "30px"
    },
    gridItem: {
        ...fSize,
        ...fCenter
    }
};
