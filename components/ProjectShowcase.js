// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import { projectShowcase as s } from "../styles/component";
import withRedux from "../HOC/withRedux";
import { extractURL, getUnsplashURL } from "../utility";
// ------------------------------------------------------------
// Project Showcase Component
// ------------------------------------------------------------
class ProjectShowcase extends React.Component {
    // ------------------------------------------------------------
    // Create a state object to store
    // ------------------------------------------------------------
    state = {
        // ------------------------------------------------------------
        // transition (boolean), id (in images array) and position of first and second divs
        // first and second (2 divs) are reused to store any number of images in the slider
        // ------------------------------------------------------------
        first: {
            transition: true,
            id: 0,
            position: 0
        },
        second: {
            transition: true,
            id: 1,
            position: 400
        },
        // ------------------------------------------------------------
        // dotId - keeps track of what the current image shown is
        // ------------------------------------------------------------
        dotId: 0,
        // ------------------------------------------------------------
        // progress keeps track of the transition state and width of complete & incomplete divs
        // it also keeps track of the color of complete bar
        // ------------------------------------------------------------
        progress: {
            complete: 0,
            incomplete: 400,
            transition: true,
            completeColor: this.props.completeColor
        }
    };
    // ------------------------------------------------------------
    // component did mount fetches data from unsplash API and dispatches
    // an action to store it in redux state
    // ------------------------------------------------------------
    async componentDidMount(
        { updateState, actionType, query, items } = this.props
    ) {
        try {
            // ------------------------------------------------------------
            // fetch images from url based on query param
            // ------------------------------------------------------------
            const res = await fetch(getUnsplashURL(query));
            const data = await res.json();
            // ------------------------------------------------------------
            // extract urls and usernames for 'items' number of URL from results
            // ------------------------------------------------------------
            const imagesData = extractURL(data.results, items);
            // ------------------------------------------------------------
            // add this array of images to redux state as determined by actionType prop
            // ------------------------------------------------------------
            updateState(actionType, imagesData);
            // ------------------------------------------------------------
            // begin transition sequence
            // ------------------------------------------------------------
            this.beginTransition();
        } catch (err) {
            console.error(err);
        }
    }
    // ------------------------------------------------------------
    // clear timer interval when component unmounts
    // ------------------------------------------------------------
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    // ------------------------------------------------------------
    // initiate automatic slider transition sequence
    // ------------------------------------------------------------
    beginTransition = (
        { progress } = this.state,
        { transitionTime, stayTime } = this.props
    ) => {
        // ------------------------------------------------------------
        // give some time and then start progress bar for first image
        // ------------------------------------------------------------
        setTimeout(() => {
            progress.complete = 400;
            progress.incomplete = 0;
            this.setState({
                progress
            });
        }, transitionTime * 1000);
        // ------------------------------------------------------------
        // as soon as stay time (as determined by progress bar) is complete
        // start interval timer & transition sequence with step 1
        // ------------------------------------------------------------
        this.timer = setInterval(() => {
            this.step1(
                this.state.first,
                this.state.second,
                this.state.progress
            );
        }, (stayTime + transitionTime) * 1000);
    };
    // ------------------------------------------------------------
    // 1st step in transition cycle
    // ------------------------------------------------------------
    step1 = (
        first,
        second,
        progress,
        { transitionTime, incompleteColor } = this.props
    ) => {
        // ------------------------------------------------------------
        // step 1 - first div moves left, second div moves left simultaneously
        // while transition is happening, progress bar color animates from complete color to incomplete color
        // transition current dot by setting dotId to second divs id
        // ------------------------------------------------------------
        first.position = -400;
        second.position = 0;
        progress.completeColor = incompleteColor;
        this.setState({
            first,
            second,
            dotId: second.id,
            progress
        });
        // ------------------------------------------------------------
        // as soon as transition completes
        // ------------------------------------------------------------
        setTimeout(() => {
            this.step2(first, second, progress);
        }, transitionTime * 1000);
    };
    // ------------------------------------------------------------
    // 2nd step in transition cycle
    // ------------------------------------------------------------
    step2 = (first, second, progress, { completeColor } = this.props) => {
        // ------------------------------------------------------------
        // turn off transition so that changes in width dont take time
        // set incomplete to full width
        // set complete to 0 width
        // change complete bar color back to completeColor
        // ------------------------------------------------------------
        progress.transition = false;
        progress.incomplete = 400;
        progress.complete = 0;
        progress.completeColor = completeColor;
        this.setState({
            progress
        });
        // ------------------------------------------------------------
        // once progress bar has been reset, start the progress bar again
        // enable transition so that the change in width takes the necessary time
        // ------------------------------------------------------------
        setTimeout(() => {
            progress.transition = true;
            progress.incomplete = 0;
            progress.complete = 400;
            this.setState({ progress });
        }, 100);
        // ------------------------------------------------------------
        // while progress bar gets ready to start in 100ms, call step3
        // ------------------------------------------------------------
        this.step3(first, second, progress);
    };
    // ------------------------------------------------------------
    // 3rd step in transition cycle
    // ------------------------------------------------------------
    step3 = (first, second) => {
        // ------------------------------------------------------------
        // turn off transition on first and second div
        // ------------------------------------------------------------
        first.transition = false;
        second.transition = false;
        this.setState({
            first,
            second
        });
        // ------------------------------------------------------------
        // once transitions are off, call step4
        // ------------------------------------------------------------
        this.step4(first, second);
    };
    // ------------------------------------------------------------
    // 4th step in transition cycle
    // ------------------------------------------------------------
    step4 = (first, second, { images } = this.props) => {
        // ------------------------------------------------------------
        // change first id to second id (so that it displays same image as second),
        // ------------------------------------------------------------
        first.id = second.id;
        // ------------------------------------------------------------
        // second should display next image in sequence (or first image if last)
        // ------------------------------------------------------------
        second.id = second.id + 1 === images.length ? 0 : second.id + 1;
        // ------------------------------------------------------------
        // first position is set to 0 (reset position of first)
        // ------------------------------------------------------------
        first.position = 0;
        // ------------------------------------------------------------
        // second position is set to 400 (reset position of second)
        // ------------------------------------------------------------
        second.position = 400;
        this.setState({
            first,
            second
        });
        // ------------------------------------------------------------
        // call step 5 as soon as set state has applied
        // ------------------------------------------------------------
        setTimeout(() => {
            this.step5(first, second);
        }, 100);
    };
    // ------------------------------------------------------------
    // 5th step in transition cycle
    // ------------------------------------------------------------
    step5 = (first, second) => {
        // ------------------------------------------------------------
        // turn transitions back on
        // ------------------------------------------------------------
        first.transition = true;
        second.transition = true;
        this.setState({
            first,
            second
        });
    };
    // ------------------------------------------------------------
    // render function
    // ------------------------------------------------------------
    render(
        { images, transitionTime, stayTime } = this.props,
        { first, second, dotId, progress } = this.state
    ) {
        // ------------------------------------------------------------
        // if images are present in array then render image cards
        // ------------------------------------------------------------
        if (images.length > 0) {
            return (
                <div style={s.container} className="card">
                    {/* first div container */}
                    <div
                        style={{
                            ...s.imgContainer,
                            ...s.firstContainer,
                            transition: first.transition
                                ? `${transitionTime}s ease-in-out left`
                                : "",
                            left: first.position
                        }}
                    >
                        {/* image in first container */}
                        <img
                            src={images[first.id].url}
                            style={{ ...s.image, ...s.firstImage }}
                        />
                        {/* username in first container */}
                        <div style={s.user}>{images[first.id].user}</div>
                    </div>
                    {/* second div container */}
                    <div
                        style={{
                            ...s.imgContainer,
                            ...s.secondContainer,
                            transition: second.transition
                                ? `${transitionTime}s ease-in-out left`
                                : "",
                            left: second.position
                        }}
                    >
                        {/* image in second container */}
                        <img
                            src={images[second.id].url}
                            style={{ ...s.image, ...s.secondImage }}
                        />
                        {/* username in second container */}
                        <div style={s.user}>{images[second.id].user}</div>
                    </div>
                    {/* info container stores dots */}
                    <div style={s.infoContainer}>
                        <div style={s.info}>
                            <div style={{ flex: 1 }} />
                            {/* render n number of dots based on images array length */}
                            <div style={s.dots}>
                                {images.map((image, id) => {
                                    return (
                                        <div
                                            style={{
                                                ...s.dot,
                                                transition: `${transitionTime}s ease-in-out background-color`,
                                                ...(dotId === id
                                                    ? s.selected
                                                    : s.unselected)
                                            }}
                                            key={id}
                                        />
                                    );
                                })}
                            </div>
                            {/* progress bar super imposes info container */}
                            <div style={s.progress}>
                                {/* complete bar */}
                                <div
                                    style={{
                                        backgroundColor: progress.completeColor,
                                        width: progress.complete,
                                        transition: progress.transition
                                            ? `${stayTime}s linear width, ${transitionTime}s ease-in-out background-color`
                                            : ""
                                    }}
                                />
                                {/* incomplete bar */}
                                <div
                                    style={{
                                        backgroundColor: this.props
                                            .incompleteColor,
                                        width: progress.incomplete,
                                        transition: progress.transition
                                            ? `${stayTime}s linear width, ${transitionTime}s ease-in-out background-color`
                                            : ""
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        // ------------------------------------------------------------
        // if images are empty, then render empty cards
        // ------------------------------------------------------------
        else {
            return (
                <div style={s.container} className="card">
                    <div />
                </div>
            );
        }
    }
}
// ------------------------------------------------------------
// export project showcase component with mapDispatch only
// ------------------------------------------------------------
export default withRedux(ProjectShowcase, false, true);
