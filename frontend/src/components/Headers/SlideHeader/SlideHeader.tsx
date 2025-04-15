import './SlideHeader.css'


interface Props {
    children: string
}


const SlideHeader = ({children}: Props) => {

    return(
        <h2 className='slider-header'>{children}</h2>
    )

}

export default SlideHeader