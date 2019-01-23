import { projectShowcase as s } from "../styles/component";
import withRedux from "../HOC/withRedux";
import { extractURL } from "../utility";

class ProjectShowcase extends React.Component {
    state = {
        first: {
            t: true,
            id: 0,
            position: 0
        },
        second: {
            t: true,
            id: 1,
            position: 400
        },
        dotId: 0,
        progress: {
            complete: 0,
            incomplete: 400,
            transition: true,
            completeColor: this.props.completeColor
        }
    };

    async componentDidMount(
        { progress } = this.state,
        {
            updateState,
            actionType,
            query,
            items,
            stayTime,
            transitionTime
        } = this.props
    ) {
        try {
            const queryParams = [
                `client_id=${process.env.ACCESS_KEY}`,
                `query=${query}`
            ];
            const unsplashURL =
                "https://api.unsplash.com/search/photos/?" +
                queryParams.join("&");
            const res = await fetch(unsplashURL);
            const data = await res.json();
            const imagesData = extractURL(data.results, items);
            updateState(actionType, imagesData);
            setTimeout(() => {
                progress.complete = 400;
                progress.incomplete = 0;
                this.setState({
                    progress
                });
            }, transitionTime * 1000);
            this.timer = setInterval(() => {
                this.step1(
                    this.state.first,
                    this.state.second,
                    this.state.progress
                );
            }, (stayTime + transitionTime) * 1000);
        } catch (err) {
            console.error(err);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // ------------------------------------------------------------
    // first moves left, second moves left simultaneously
    // ------------------------------------------------------------
    step1 = (first, second, progress, { transitionTime } = this.props) => {
        first.position = -400;
        second.position = 0;
        progress.completeColor = this.props.incompleteColor;
        this.setState({
            first,
            second,
            dotId: second.id,
            progress
        });
        setTimeout(() => {
            progress.transition = false;
            progress.incomplete = 400;
            progress.complete = 0;
            progress.completeColor = this.props.completeColor;
            this.setState({
                progress
            });
            this.step2(first, second, progress);
            setTimeout(() => {
                progress.transition = true;
                progress.incomplete = 0;
                progress.complete = 400;
                this.setState({ progress });
            }, 100);
        }, transitionTime * 1000);
    };
    // ------------------------------------------------------------
    // turn off transition
    // ------------------------------------------------------------
    step2 = (first, second) => {
        first.t = false;
        second.t = false;
        this.setState({
            first,
            second
        });
        this.step3(first, second);
    };

    // ------------------------------------------------------------
    // expand first and contract second, change first id to 1, second to 2
    // ------------------------------------------------------------
    step3 = (first, second, { images } = this.props) => {
        first.id = second.id;
        first.position = 0;
        second.id = second.id + 1 === images.length ? 0 : second.id + 1;
        second.position = 400;
        this.setState({
            first,
            second
        });
        setTimeout(() => {
            this.step4(first, second);
        }, 100);
    };
    // ------------------------------------------------------------
    // turn transitions back on
    // ------------------------------------------------------------
    step4 = (first, second) => {
        first.t = true;
        second.t = true;
        this.setState({
            first,
            second
        });
    };

    render(
        { images, transitionTime, stayTime } = this.props,
        { first, second, dotId, progress } = this.state
    ) {
        if (images.length > 0) {
            return (
                <div style={s.container} className="card">
                    <div
                        style={{
                            ...s.imgContainer,
                            ...s.firstContainer,
                            transition: first.t
                                ? `${transitionTime}s ease-in-out left`
                                : "",
                            left: first.position
                        }}
                    >
                        <img
                            src={images[first.id].url}
                            style={{ ...s.image, ...s.firstImage }}
                        />
                        <div style={s.user}>{images[first.id].user}</div>
                    </div>
                    <div
                        style={{
                            ...s.imgContainer,
                            ...s.secondContainer,
                            transition: second.t
                                ? `${transitionTime}s ease-in-out left`
                                : "",
                            left: second.position
                        }}
                    >
                        <img
                            src={images[second.id].url}
                            style={{ ...s.image, ...s.secondImage }}
                        />
                        <div style={s.user}>{images[second.id].user}</div>
                    </div>
                    <div style={s.infoContainer}>
                        <div style={s.info}>
                            <div style={{ flex: 1 }} />
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
                            <div style={s.progress}>
                                <div
                                    style={{
                                        backgroundColor: progress.completeColor,
                                        width: progress.complete,
                                        transition: progress.transition
                                            ? `${stayTime}s linear width, ${transitionTime}s ease-in-out background-color`
                                            : ""
                                    }}
                                />
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
        } else {
            return (
                <div style={s.container}>
                    <div />
                </div>
            );
        }
    }
}

export default withRedux(ProjectShowcase, true, true);
