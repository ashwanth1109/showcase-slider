import { projectShowcase as s } from "../styles/component";
import withRedux from "../HOC/withRedux";

class ProjectShowcase extends React.Component {
    render() {
        return (
            <div style={s.container}>
                <div />
            </div>
        );
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
    }
}

// class ProjectShowcase extends React.Component {
//     state = {
//         width: "0px"
//     };
//     componentDidMount() {
//         setTimeout(() => {
//             this.setState({
//                 width: "400px"
//             });
//         }, 500);
//     }
//     render() {
//         return (
//             <div
//                 style={{
//                     width: this.state.width,
//                     height: "200px",
//                     backgroundColor: "#fff",
//                     transition: "4s ease-in-out width",
//                     objectFit: "cover",
//                     overflow: "hidden",
//                     maxHeight: "200px"
//                 }}
//             >
//                 <img
//                     src="https://www.w3schools.com/w3css/img_lights.jpg"
//                     style={{
//                         width: "400px",
//                         height: "200px",
//                         objectFit: "cover"
//                     }}
//                 />
//             </div>
//         );
//     }
// }
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
