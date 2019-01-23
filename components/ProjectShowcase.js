import { projectShowcase as s } from "../styles/component";
import withRedux from "../HOC/withRedux";

class ProjectShowcase extends React.Component {
    state = {
        first: {
            w: 400,
            t: true,
            id: 0,
            position: 0
        },
        second: {
            w: 0,
            t: true,
            id: 1,
            position: 400
        },
        dotId: 0,
        progress: {
            complete: 0,
            incomplete: 400,
            transition: true,
            completeColor: "#ffffff80",
            incompleteColor: "#00000080"
        }
    };

    componentDidMount({ progress } = this.state) {
        setTimeout(() => {
            progress.complete = 400;
            progress.incomplete = 0;
            this.setState({
                progress
            });
        }, 2000);
        this.timer = setInterval(() => {
            this.step1(
                this.state.first,
                this.state.second,
                this.state.progress
            );
        }, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // ------------------------------------------------------------
    // first moves left, second moves left simultaneously
    // ------------------------------------------------------------
    step1 = (first, second, progress) => {
        first.position = -400;
        second.position = 0;
        progress.completeColor = "#00000080";
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
            progress.completeColor = "#ffffff80";
            this.setState({
                progress
            });
            setTimeout(() => {
                progress.transition = true;
                progress.incomplete = 0;
                progress.complete = 400;
                this.setState({ progress });
                this.step2(first, second);
            }, 100);
        }, 1900);
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
        { images } = this.props,
        { first, second, dotId, progress } = this.state
    ) {
        if (images.length > 0) {
            return (
                <div style={s.container} className="card">
                    <div
                        style={{
                            ...s.imgContainer,
                            ...s.firstContainer,
                            transition: first.t ? "2s ease-in-out left" : "",
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
                            transition: second.t ? "2s ease-in-out left" : "",
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
                                            ? "2s linear width, 2s ease-in-out background-color"
                                            : ""
                                    }}
                                />
                                <div
                                    style={{
                                        backgroundColor:
                                            progress.incompleteColor,
                                        width: progress.incomplete,
                                        transition: progress.transition
                                            ? "2s linear width, 2s ease-in-out background-color"
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

export default withRedux(ProjectShowcase, true, false);
