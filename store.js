// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { combineReducers } from "redux";
// ------------------------------------------------------------
// "TEST" reducer
// ------------------------------------------------------------
const test = (state = "Redux works", action) =>
    action.type === "TEST" ? action.payload : state;

const images1 = (state = [], action) =>
    action.type === "IMAGES1" ? action.payload : state;

const images2 = (state = [], action) =>
    action.type === "IMAGES2" ? action.payload : state;

// ------------------------------------------------------------
// combineReducers & export
// ------------------------------------------------------------
export default combineReducers({
    test,
    images1,
    images2
});
