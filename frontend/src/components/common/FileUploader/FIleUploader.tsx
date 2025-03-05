import './FileUploader.css'
import { ChangeEvent, useState } from 'react'
import Button from '../Button/Button'





type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'



const FileUploader = () => {

    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>('idle')


    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files) {
            setFile(e.target.files[0])
        }

    }

    function handleFileUpload() {
        
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
        </div>
    )

}

export default FileUploader