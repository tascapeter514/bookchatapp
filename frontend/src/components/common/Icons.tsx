import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoMdArrowDropright } from "react-icons/io";

import { FC } from 'react'




export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}

export type ArrowProps = {
    isRotated: boolean
} & IconProps

export const ArrowLeftIcon = ({isRotated, ...props}: ArrowProps) => {


    return <FaArrowLeft className={`arrow-left-icon ${isRotated ? 'rotated' : ''}`} {...props}></FaArrowLeft>
}

export const ArrowRightIcon = ({isRotated, ...props}: ArrowProps) => {
    return <FaArrowRight className={`arrow-right-icon ${isRotated ? 'rotated': ''}`} {...props}></FaArrowRight>
}

export const RightDropDownIcon = ({isRotated, ...props}: ArrowProps) => {
    return <IoMdArrowDropright className={`right-dropdown-icon ${isRotated ? 'rotated': ''}`} {...props} />
}

