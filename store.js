// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { combineReducers } from "redux";
// ------------------------------------------------------------
// "TEST" reducer
// ------------------------------------------------------------
const test = (state = "Redux works", action) =>
    action.type === "TEST" ? action.payload : state;

const images = (state = null, action) =>
    action.type === "IMAGES" ? action.payload : state;

// ------------------------------------------------------------
// combineReducers & export
// ------------------------------------------------------------
export default combineReducers({
    test,
    images
});
