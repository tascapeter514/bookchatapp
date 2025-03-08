import { FaSearch, FaArrowLeft, FaArrowRight, FaUser } from 'react-icons/fa'
import { IoMdArrowDropright, IoIosCloseCircle } from "react-icons/io";
import { GrLike, GrDislike } from "react-icons/gr";


export type ArrowProps = {
    isRotated: boolean
} & IconProps



export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon = (props: IconProps) => <FaSearch {...props} />

export const ArrowLeftIcon = ({isRotated, ...props}: ArrowProps) => 
    <FaArrowLeft className={`arrow-left-icon ${isRotated ? 'rotated' : ''}`} {...props} />


export const ArrowRightIcon = ({isRotated, ...props}: ArrowProps) => 
    <FaArrowRight className={`arrow-right-icon ${isRotated ? 'rotated': ''}`} {...props} />


export const RightDropDownIcon = ({isRotated, ...props}: ArrowProps) => 
    <IoMdArrowDropright className={`right-dropdown-icon ${isRotated ? 'rotated': ''}`} {...props} />


export const LikeIcon = (props: IconProps) => <GrLike className='like-icon'  {...props}/>

export const DislikeIcon = (props: IconProps) => <GrDislike className='dislike-icon'  {...props}/>


export const UserIcon = (props: IconProps) => <FaUser className='user-icon' {...props} />

export const CloseIcon = (props: IconProps) => <IoIosCloseCircle {...props} />



