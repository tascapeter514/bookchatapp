import './Header.css'


type HeaderProps = {children: string}

const Header = ({children}: HeaderProps) => {
    return(

        <>
            <h1 className='header-title'>{children}</h1>
            <hr className="header-underline" />
        
        </>

        

    )
}

export default Header