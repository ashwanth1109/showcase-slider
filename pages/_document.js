// ------------------------------------------------------------
// import dependencies
// ------------------------------------------------------------
import Document, { Head, Main, NextScript } from "next/document"; // Import default Document from Next JS
// ------------------------------------------------------------
// Customizing the default Document
// ------------------------------------------------------------
class MyDoc extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />

                    {/* global styles go here - also hover, keyframe animations etc. */}
                    <style>{`
                        * {
                            margin: 0;
                            padding: 0;
                        }

                        .card {
                            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                        }
                        
                    `}</style>
                </Head>
                {/* Add body styles here */}
                <body
                    style={{
                        width: "100vw",
                        height: "100vh",
                        padding: "50px 0",
                        backgroundColor: "#ddd",
                        boxSizing: "border-box"
                    }}
                >
                    {/* from next js documentation */}
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
// ------------------------------------------------------------
// export customized document
// ------------------------------------------------------------
export default MyDoc;
