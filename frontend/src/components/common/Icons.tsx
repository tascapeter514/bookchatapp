import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { IoMdArrowDropright } from "react-icons/io";
import { GrLike, GrDislike } from "react-icons/gr";

import { FC } from 'react'

export type ArrowProps = {
    isRotated: boolean
} & IconProps



export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon = (props: IconProps) => {
    return  <FaSearch {...props}></FaSearch>
}



export const ArrowLeftIcon = ({isRotated, ...props}: ArrowProps) => {


    return <FaArrowLeft className={`arrow-left-icon ${isRotated ? 'rotated' : ''}`} {...props}></FaArrowLeft>
}

export const ArrowRightIcon = ({isRotated, ...props}: ArrowProps) => {
    return <FaArrowRight className={`arrow-right-icon ${isRotated ? 'rotated': ''}`} {...props}></FaArrowRight>
}

export const RightDropDownIcon = ({isRotated, ...props}: ArrowProps) => {
    return <IoMdArrowDropright className={`right-dropdown-icon ${isRotated ? 'rotated': ''}`} {...props} />
}

export const LikeIcon = (props: IconProps) => {
    return <GrLike className='like-icon'  {...props}/>
}

export const DislikeIcon = (props: IconProps) => {
    return <GrDislike className='dislike-icon'  {...props}/>
}



