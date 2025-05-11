import { FaSearch, FaUser } from 'react-icons/fa'
import { DropdownState } from '../reducers/dropdownReducer';
import { IoMdArrowDropright, IoIosCloseCircle } from "react-icons/io";
import { ImCheckmark2, ImCancelCircle } from 'react-icons/im'
import { GrLike, GrDislike } from "react-icons/gr";
import { BsBookmarkPlus } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";


export type ArrowProps = {
    dropdown: DropdownState
} & IconProps


// import icon statemetns add later
// FaArrowLeft, FaArrowRight,

export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const BookmarkIcon = (props: IconProps) => <BsBookmarkPlus  className='bookmark-icon' {...props} />

export const SearchIcon = (props: IconProps) => <FaSearch className='search-icon' {...props} />

// export const ArrowLeftIcon = ({isRotated, ...props}: ArrowProps) => 
//     <FaArrowLeft className={`arrow-left-icon ${isRotated ? 'rotated' : ''}`} {...props} />


// export const ArrowRightIcon = ({isRotated, ...props}: ArrowProps) => 
//     <FaArrowRight className={`arrow-right-icon ${isRotated ? 'rotated': ''}`} {...props} />


export const HamburgerIcon = (props: IconProps) => <GiHamburgerMenu className='hamburger-icon' {...props}/>

export const CloseHamburgerIcon = (props: IconProps) => <AiOutlineClose className='hamburger-close-icon' {...props}/>

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



