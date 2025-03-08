import './Header.css'


type HeaderProps = {children: string}

const Header = ({children}: HeaderProps) => {
    return(

        <div className='header'>
            <h1 className='header-title'>{children}</h1>
            <hr className="header-underline" />
        
        </div>

        

    )
}

export default Header