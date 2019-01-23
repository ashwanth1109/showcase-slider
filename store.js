// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { combineReducers } from "redux";
// ------------------------------------------------------------
// "TEST" reducer
// ------------------------------------------------------------
// const test = (state = "Redux works", action) =>
//     action.type === "TEST" ? action.payload : state;
// ------------------------------------------------------------
// "IMAGES1" reducer - for storing image urls of 1st showcase component
// ------------------------------------------------------------
const images1 = (state = [], action) =>
    action.type === "IMAGES1" ? action.payload : state;
// ------------------------------------------------------------
// "IMAGES2" reducer - for storing image urls of 2nd showcase component
// ------------------------------------------------------------
const images2 = (state = [], action) =>
    action.type === "IMAGES2" ? action.payload : state;
// ------------------------------------------------------------
// "IMAGES3" reducer - for storing image urls of 3rd showcase component
// ------------------------------------------------------------
const images3 = (state = [], action) =>
    action.type === "IMAGES3" ? action.payload : state;
// ------------------------------------------------------------
// "IMAGES4" reducer - for storing image urls of 4th showcase component
// ------------------------------------------------------------
const images4 = (state = [], action) =>
    action.type === "IMAGES4" ? action.payload : state;
// ------------------------------------------------------------
// combineReducers & export
// ------------------------------------------------------------
export default combineReducers({
    images1,
    images2,
    images3,
    images4
});
