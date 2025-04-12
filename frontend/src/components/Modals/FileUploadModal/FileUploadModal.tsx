import './FileUploadModal.css'
import Button from '../../Buttons/Button/Button'
import FileUploader from '../../FileUploader/FIleUploader'
import {useRef } from 'react'


interface Props {
    id: number,
}


const FileUploadModal = ({ id }: Props) => {

    const ref = useRef<HTMLDialogElement>(null)
    const openModal = () => ref.current?.showModal()
    const closeModal = () => ref.current?.close()

    return (

        <>  
            <Button onClick={openModal}>Change Image</Button>
            <dialog className='uploadFile-modal' ref={ref}>
                <div>
                    <FileUploader id={id ?? ''}></FileUploader>
                    <Button onClick={closeModal}>Cancel</Button>
                </div>
            </dialog>
        </>
    )

}

export default FileUploadModal