import { FaSearch, FaArrowLeft, FaArrowRight, FaUser } from 'react-icons/fa'
import { DropdownState } from '../reducers/dropdownReducer';
import { IoMdArrowDropright, IoIosCloseCircle } from "react-icons/io";
import { ImCheckmark2, ImCancelCircle } from 'react-icons/im'
import { GrLike, GrDislike } from "react-icons/gr";
import { BsBookmarkPlus } from "react-icons/bs"
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";


export type ArrowProps = {
    dropdown: DropdownState
} & IconProps



export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const BookmarkIcon = (props: IconProps) => <BsBookmarkPlus  className='bookmark-icon' {...props} />

export const SearchIcon = (props: IconProps) => <FaSearch className='search-icon' {...props} />

// export const ArrowLeftIcon = ({isRotated, ...props}: ArrowProps) => 
//     <FaArrowLeft className={`arrow-left-icon ${isRotated ? 'rotated' : ''}`} {...props} />


// export const ArrowRightIcon = ({isRotated, ...props}: ArrowProps) => 
//     <FaArrowRight className={`arrow-right-icon ${isRotated ? 'rotated': ''}`} {...props} />


export const RightDropDownIcon = ({dropdown, ...props}: ArrowProps) => 
    <IoMdArrowDropright className={`right-dropdown-icon ${dropdown.isRotated ? 'rotated': ''}`} {...props} />


export const LikeIcon = (props: IconProps) => <GrLike className='like-icon'  {...props}/>

export const DislikeIcon = (props: IconProps) => <GrDislike className='dislike-icon'  {...props}/>


export const UserIcon = (props: IconProps) => <FaUser className='user-icon' {...props} />

export const CloseIcon = (props: IconProps) => <IoIosCloseCircle className='close-icon' {...props} />

export const CheckmarkIcon = (props: IconProps) => <ImCheckmark2 className='checkmark-icon' {...props}/>

export const CancelIcon = (props: IconProps) => <ImCancelCircle className='cancel-icon' {...props} />

export const RightArrow = (props: IconProps) => <MdArrowForwardIos className='right-arrow' {...props} />

export const LeftArrow = (props: IconProps) => <MdArrowBackIosNew className='left-arrow' {...props}/>



