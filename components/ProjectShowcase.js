import { projectShowcase as s } from "../styles/component";

class ProjectShowcase extends React.Component {
    render() {
        return (
            <div style={s.container}>
                <div />
            </div>
        );
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

export default ProjectShowcase;
