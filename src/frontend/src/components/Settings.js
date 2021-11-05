import React from "react";
import Select from "./Select";

function Settings(props) {
    const { models, onChange } = props;
    
    return (
        <>
            <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Settings
                </h3>
                <p className="mt-1 text-sm text-gray-900 mb-4">
                    Change image captioning model pipeline.
                </p>
            </div>
            <Select label="Vision model"
                name="vision"
                options={models.vision}
                onChange={onChange}
            />
            <Select label="Language model"
                name="language"
                options={models.language}
                onChange={onChange}
            />
        </>
    );
}

export default Settings;