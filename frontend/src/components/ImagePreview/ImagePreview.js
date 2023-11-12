import "./ImagePreview.css";
import React from 'react';

const ImagePreview = ({ image, name }) => {
    return (
        <div className="image-preview-container">
            <img
                src={image ? image : "/images/user.png"}
                alt={name}
                className="image-preview"
            />
        </div>
    );
};

export default ImagePreview;