// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { connect } from "react-redux";

// ------------------------------------------------------------
// redux map functions
// ------------------------------------------------------------
// ------------------------------------------------------------
// mapState fn
// ------------------------------------------------------------
const mapStateFromProps = state => {
    console.log(state);
    return state;
};
// ------------------------------------------------------------
// mapDispatch fn
// ------------------------------------------------------------
const mapDispatchToProps = dispatch => {
    return {
        // ------------------------------------------------------------
        // common updateState fn
        // ------------------------------------------------------------
        updateState: (type, payload) => {
            dispatch({
                type: type,
                payload: payload
            });
        }
    };
};
// ------------------------------------------------------------
// withRedux HOC
// ------------------------------------------------------------
const withRedux = (BaseComponent, withMapState, withMapDispatch) => {
    // ------------------------------------------------------------
    // create app component
    // ------------------------------------------------------------
    const App = props => <BaseComponent {...props} />;
    // ------------------------------------------------------------
    // Check if passed in Component needs access to both mapState and mapDispatch
    // or only one of them
    // ------------------------------------------------------------
    if (withMapState && withMapDispatch) {
        return connect(
            mapStateFromProps,
            mapDispatchToProps
        )(App);
    } else if (withMapState && !withMapDispatch) {
        return connect(
            mapStateFromProps,
            null
        )(App);
    } else if (!withMapState && withMapDispatch) {
        return connect(
            null,
            mapDispatchToProps
        )(App);
    } else {
        console.error("withRedux HOC is missing parameters");
        return App;
    }
};
// ------------------------------------------------------------
// export HOC function
// ------------------------------------------------------------
export default withRedux;
