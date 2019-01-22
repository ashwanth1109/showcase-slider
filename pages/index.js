// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import withRedux from "../HOC/withRedux";
import { index as s } from "../styles/page";
import ProjectShowcase from "../components/ProjectShowcase";
import { extractURL } from "../utility";
// ------------------------------------------------------------
// index Component
// ------------------------------------------------------------
class Index extends React.Component {
    async componentDidMount({ updateState } = this.props) {
        const res = await fetch("https://api.unsplash.com/photos/", {
            method: "GET",
            headers: {
                Authorization: `Client-ID ${process.env.ACCESS_KEY}`
            }
        });
        const data = await res.json();
        const urls = extractURL(data);
        updateState("IMAGES", urls);
    }
    render() {
        return (
            <div style={s.container}>
                <ProjectShowcase />
                <ProjectShowcase />
            </div>
        );
    }
}
// ------------------------------------------------------------
// export index
// ------------------------------------------------------------
export default withRedux(Index, true, true);
