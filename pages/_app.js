// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import App, { Container } from "next/app"; // Overwriting default App.js from Next
import { createStore } from "redux"; // redux method for creating a store of reducers
import reducers from "../store"; // get all reducers from store
import { Provider } from "react-redux"; // get Provider component for making store available
import withRedux from "next-redux-wrapper"; // redux wrapper component needed for redux in Next JS

// ------------------------------------------------------------
// makeStore function needed for redux wrapper component
// ------------------------------------------------------------
const makeStore = initialState => createStore(reducers, initialState);

// ------------------------------------------------------------
// Custom App component - from Next JS documentation
// ------------------------------------------------------------
class MyApp extends App {
    // ------------------------------------------------------------
    // get initial props from server side rendering
    // ------------------------------------------------------------
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            try {
                pageProps = await Component.getInitialProps(ctx);
            } catch (err) {
                console.error(err);
            }
        }
        return { pageProps };
    }

    render = ({ Component, pageProps, store } = this.props) => (
        <Container>
            {/* provider component makes store availabe to app */}
            <Provider store={store}>
                {/* pass on props as is */}
                <Component {...pageProps} />
            </Provider>
        </Container>
    );
}
// ------------------------------------------------------------
// export App with redux wrapper
// ------------------------------------------------------------
export default withRedux(makeStore)(MyApp);
