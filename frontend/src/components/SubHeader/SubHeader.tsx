import './SubHeader.css'


type SubHeaderProps = {children: string}


const SubHeader = ({children}: SubHeaderProps) => {

    return (
        <>
            <h2 className="subheader">{children}</h2>
        </>
    )
        
    

    

}

export default SubHeader