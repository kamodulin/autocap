import React from "react"
import Loader from "./Loader";

function Caption(props) {
    const { processing, caption } = props;
    return (
        <>
            {
                (processing || caption) &&
                <div className="text-md leading-6 text-gray-900 mt-4">
                    <div>
                        {processing
                            ?
                            <Loader text="Processing..." />
                            :
                            <h3>Caption: {caption}</h3>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Caption;