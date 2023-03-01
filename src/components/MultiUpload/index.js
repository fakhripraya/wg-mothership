import './style.scss';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from "../../assets/svg/upload-image.svg";

export default function MultiUpload(props) {

    let {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        validator: multiFileValidator
    });

    function multiFileValidator(file) {
        var maxSize = 3000000;
        if (file.size > maxSize) return {
            code: "size-too-large",
            message: `Size is larger than ${maxSize} byte`
        };
        return null
    }

    React.useEffect(() => {
        const formData = new FormData();
        acceptedFiles.forEach((val, index) => formData.append(props.formName, val, val.name));
        if (acceptedFiles.length > 0) props.setFiles(formData.getAll(props.formName));
    }, [acceptedFiles])

    const AcceptedFileItems = () => {
        acceptedFiles.map(file => {
            return <li key={file.path}>
                <label className='multi-upload-file-text'>
                    {file.path} - {file.size} bytes
                </label>
            </li>
        });
    }

    const FileRejectionItems = () => {
        return fileRejections.map(({ file, errors }) => {
            return <li key={file.path}>
                <label className='multi-upload-file-text'>
                    {file.path} - {file.size} bytes
                </label>
                <ul>
                    {errors.map(e => (
                        <li key={e.code}><label className='multi-upload-file-text'>{e.message}</label></li>
                    ))}
                </ul>
            </li>
        });
    }

    return (
        <div className="multi-upload-picture-box darker-bg-color">
            <div className="multi-upload-picture-field">
                <section className="multi-upload-dropzone-container">
                    <div {...getRootProps({ className: 'multi-upload-dropzone-box' })}>
                        <input {...getInputProps()} />
                        <label className='multi-upload-custom-typography'>{props.label}</label>
                        <br />
                        <img className='multi-upload-custom-img' src={UploadIcon} alt={"asdasdasda"}></img>
                        <br />
                        <label className='multi-upload-custom-typography'>{props.subLabel}</label>
                    </div>
                </section>
            </div>
            <div className="multi-upload-picture-list">
                <AcceptedFileItems />
                <FileRejectionItems />
            </div>
        </div>
    );
}