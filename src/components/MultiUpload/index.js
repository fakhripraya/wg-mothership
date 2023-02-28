import './style.scss';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from "../../assets/svg/upload-image.svg";
import db from '../../config/indexeddb';
import { getBase64 } from '../../utils/functions/global';

//TODO: can't upload multiple images to local storage, too large, use indexedDB or FileSystem instead

export default function MultiUpload(props) {

    let {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: props.extensions,
        validator: multiFileValidator
    });

    function multiFileValidator(file) {
        var maxSize = 3000000;
        if (file.size > maxSize) {
            return {
                code: "size-too-large",
                message: `Size is larger than ${maxSize} byte`
            };
        }

        return null
    }

    function clearFiles(storage_key, callback) {

        db.transaction('rw', db[storage_key], function* () {
            yield db[storage_key].clear();
        }).catch(e => {
            // TODO: Handle error disini, callback
            console.error(e);
        });

        callback();
    }

    function setFiles(files, storage_key, callback) {

        // validate the files parameter
        if (files === null) return;
        if (files.length === 0) return;

        // loop the files
        files.forEach((file) => {
            // read the file with file reader
            getBase64(file).then((base64) => {

                // do the database transaction to add data to the database
                db.transaction('rw', db[storage_key], function* () {
                    // add the temporary uploaded data files
                    yield db[storage_key].add({
                        base64_string: base64,
                    });
                }).catch(e => {
                    // TODO: Handle error disini
                    console.error(e);
                });

            });
        });

        callback();
    }

    React.useEffect(() => {
        // clear indexed db datas first
        // clearTableDatas(props.storage_key, () => {
        //     localStorage.removeItem(props.storage_key);
        // });

        // add datas to the indexed db
        // setFiles(acceptedFiles, props.storage_key, () => {
        //     localStorage.setItem(props.storage_key, acceptedFiles.length.toString());
        // });
    }, [acceptedFiles])

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            <label className='multi-upload-file-text'>
                {file.path} - {file.size} bytes
            </label>
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            <label className='multi-upload-file-text'>
                {file.path} - {file.size} bytes
            </label>
            <ul>
                {errors.map(e => (
                    <li key={e.code}><label className='multi-upload-file-text'>{e.message}</label></li>
                ))}
            </ul>
        </li>
    ));

    return (
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
    );
}