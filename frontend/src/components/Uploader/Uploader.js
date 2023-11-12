import "./Uploader.scss";
import { useCallback, useState } from "react"
import { uploadImageService } from "../../redux/APIs/ImageUpload";
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from 'react-icons/fi';
import Loader from "../notification/Loader";

const Uploader = ({setImageUrl}) => {
    const [loading, setLoading] = useState(false);

    // upload image
    const onDrop = useCallback(async (imageFile) => {
        const file = new FormData();
        file.append("file", imageFile[0]);
        const data = await uploadImageService(file, setLoading);
        setImageUrl(data);
    }, [setImageUrl]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        multiple: false,
        onDrop,
    });
    return (
        <div className='form-upload-container'>
            {loading ? (
                <div className='loader'>
                    <Loader />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className='upload-container'
                    >
                    <input {...getInputProps()} />
                    <span className='upload-icon'>
                        <FiUploadCloud />
                    </span>
                    <p className='upload-text'>Drag your image here</p>
                    <em className='upload-hint'>
                        {isDragActive
                        ? "Drop it like it's hot"
                        : isDragReject
                        ? "Unsupported file type..."
                        : "only .jpg and .png files will be accepted"}
                    </em>
                </div>
            )}
        </div>
    );
}

export default Uploader;