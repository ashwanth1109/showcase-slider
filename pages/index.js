// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import withRedux from "../HOC/withRedux";
import { index as s } from "../styles/page";
import ProjectShowcase from "../components/ProjectShowcase";
// ------------------------------------------------------------
// index Component
// ------------------------------------------------------------
class Index extends React.Component {
    render() {
        return (
            <div style={s.container}>
                {/* Project Showcase Component */}
                <ProjectShowcase
                    images={this.props.images1} // images array state from mapState
                    actionType="IMAGES1" // redux action dispatcher type to store state
                    query="office" // query term for images
                    items={3} // should be between 2 - 10
                    completeColor="#ffffff80" // color to indicate complete in progress bar
                    incompleteColor="#000000AA" // color to indicate incomplete in progress bar
                    stayTime={2} // time component waits on each image
                    transitionTime={2} // time component takes to transition slides
                />
                <ProjectShowcase
                    images={this.props.images2}
                    actionType="IMAGES2"
                    query="space"
                    items={5}
                    completeColor="#ffffff80"
                    incompleteColor="#000000AA"
                    stayTime={3}
                    transitionTime={1}
                />
            </div>
        );
    }
}
// ------------------------------------------------------------
// export index with mapState integration
// ------------------------------------------------------------
export default withRedux(Index, true, false);
