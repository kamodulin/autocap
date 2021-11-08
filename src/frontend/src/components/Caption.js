import React from "react"
import Loader from "./Loader";

function Caption(props) {
    const { status, caption } = props;
    return (
        <div className="text-md leading-6 text-gray-900">
            <div>
                {
                    (() => {
                        switch (status) {
                            case "processing":
                                return <Loader text="Processing..." />;
                            case "success":
                                return <h3>Caption: {caption}</h3>;
                            case "error":
                                return <h3>There was an error creating the caption.</h3>;
                            default:
                                return "";
                        }
                    })()
                }
            </div>
        </div>
    )
}

export default Caption;