import { FaSearch } from 'react-icons/fa'
import { FC } from 'react'




export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}