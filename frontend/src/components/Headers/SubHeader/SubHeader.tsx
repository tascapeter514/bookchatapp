import './SubHeader.css'


type SubHeaderProps = {children: string}


const SubHeader = ({children}: SubHeaderProps) => {

    return (
        <>
            <h3 className="subheader">{children}</h3>
        </>
    )
        
    

    

}

export default SubHeader