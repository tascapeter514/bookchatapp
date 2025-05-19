import React from 'react'
import { SearchResultData } from '../../types'
import { useReducer, useRef, Dispatch } from 'react'
import ModalButtons from '../Buttons/ModalButtons/ModalButtons'
import './Dialog.css'


export type DialogSelectionState = {
    selectedId: number
}

export type DialogSelectionAction = {
    type: "SELECT_ITEM_ID",
    payload: number
}

const selectItemReducer = (
    state: DialogSelectionState,
    action: DialogSelectionAction
) => {
    switch(action.type) {
        case 'SELECT_ITEM_ID':
            return {
                ...state,
                selectedId: action.payload
            }

        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }

    }
}

type OpenModal = () => void

interface Props<T extends SearchResultData> {
    data: T[],
    button: (openModal: OpenModal) => React.ReactNode | Element,
    title: string,
    handleSubmit: (id: number) => Promise<void>,
    children: (data: T[], dispatch: Dispatch<DialogSelectionAction>) => React.ReactNode,
    
}



const Dialog = <T extends SearchResultData>({
    data, 
    title,
    button, 
    handleSubmit, 
    children
}: Props<T>) => {

    const modalRef = useRef<HTMLDialogElement>(null)
    const openModal = () => modalRef.current?.showModal()
    const closeModal = () => modalRef.current?.close()
    const [state, dispatch] = useReducer(selectItemReducer, {selectedId: NaN})

    console.log('dialog data:', data)

    return(

        <>  
            {button(openModal)}
            <dialog 
                className='modal-dialog'
                ref={modalRef}
            
            >
                <h2 className='modal-dialog-title'>{title}</h2>
                <hr className='modal-dialog-divider'/>
                {children(data, dispatch)}
                <ModalButtons
                    submitHandler={() => handleSubmit(state.selectedId)}
                    closeModal={closeModal} 
                
                />   
            </dialog>

        </>

        
    )

}

export default Dialog