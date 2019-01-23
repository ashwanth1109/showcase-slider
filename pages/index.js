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
        const urlArrays = extractURL(data);
        updateState("IMAGES1", urlArrays[0]);
        updateState("IMAGES2", urlArrays[1]);
    }
    render({ images1, images2 } = this.props) {
        return (
            <div style={s.container}>
                <ProjectShowcase images={images1} />
                <ProjectShowcase images={images2} />
            </div>
        );
    }
}
// ------------------------------------------------------------
// export index
// ------------------------------------------------------------
export default withRedux(Index, true, true);
