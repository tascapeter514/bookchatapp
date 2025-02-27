import { FaSearch, FaArrowLeft } from 'react-icons/fa'
import { FC } from 'react'




export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}

export type ArrowLeftProps = {
    isRotated: boolean
} & IconProps

export const ArrowLeftIcon: FC<ArrowLeftProps> = ({isRotated, ...props}) => {


    return <FaArrowLeft className={`icon ${isRotated ? 'rotated' : ''}`} {...props}></FaArrowLeft>
}