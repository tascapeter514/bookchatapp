import { FaSearch, FaArrowLeft } from 'react-icons/fa'

import { FC } from 'react'




export type IconProps = React.ComponentPropsWithoutRef<'svg'>

export const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}

export type ArrowLeftProps = React.ComponentPropsWithoutRef<'svg'>

export const ArrowLeftIcon: FC<ArrowLeftProps> = (props) => {
    return <FaArrowLeft {...props}></FaArrowLeft>
}