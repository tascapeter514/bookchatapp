import './Header.css'


type HeaderProps = {children: string}

const Header = ({children}: HeaderProps) => {
    return(

        <div className='header'>
            <h2 className='header-title'>{children}</h2>
            <hr className="header-underline" />
        </div>

        

    )
}

export default Header