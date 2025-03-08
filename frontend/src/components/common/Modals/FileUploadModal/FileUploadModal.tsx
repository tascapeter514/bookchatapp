import './FileUploadModal.css'
import FileUploader from '../../../common/FileUploader/FIleUploader'
import Button from '../../../common/Buttons/Button/Button'
import { Ref } from 'react'


interface FileUploadModal {
    id: string,
    uploadFileRef: Ref<HTMLDialogElement>,
    closeImageModal: () => void
}


const FileUploadModal = ({id, uploadFileRef, closeImageModal}: FileUploadModal) => {

    return (
        <dialog className='uploadFile-modal' ref={uploadFileRef}>
            <div>
                <FileUploader id={id ?? ''}></FileUploader>
                <Button onClick={closeImageModal}>Cancel</Button>
            </div>
        </dialog>
    )

}

export default FileUploadModal