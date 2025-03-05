import './FileUploader.css'
import { ChangeEvent, useState } from 'react'
import Button from '../Button/Button'





type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface FileUploaderProps {
    id: string | number
}

const FileUploader = (props: FileUploaderProps) => {

    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>('idle')


    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            setFile(e.target.files[0])
        }

    }

    async function handleFileUpload() {

        if (!file) return;

        setStatus('uploading');

        const formData = new FormData();
        formData.append('file', file);

        try {

                await fetch(`http://localhost:8000/api/fileUpload${props.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                
                body: formData
            })

            setStatus('success')



        } catch (err) {

            setStatus('error');

        }


    }

    return(
        <div className='file-container'>
            <input className='file-input' type="file" onChange={handleFileChange}/>
            {file && (
                <div className='file-info'>
                    <p>File name: {file.name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {(file.type)}</p>
                </div>
            )}
            {file && status !== 'uploading' && (<Button onClick={handleFileUpload}>Upload</Button>)}
            {status === 'success' && (
                <p>
                    File uploaded successfully!
                </p>
            )}

            {status === 'error' && (
                <p>
                    Upload failed. Please try again.
                </p>
            )}
        </div>
    )

}

export default FileUploader