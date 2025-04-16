import './BooksPage.css'
// import Carousel from '../Carousel/Carousel'
import { useGetBooksQuery,  } from '../../slices/bookApiSlice'
import SlideHeader from '../Headers/SlideHeader/SlideHeader'
import { Book } from '../../types'
import { useState } from 'react'
import Carousel from '../Carousel/Carousel'


const BooksPage = () => {

    const {data, isLoading, isError, error} = useGetBooksQuery()

    if (!data) return null

    const {best_sellers, drama, literary_fiction, science_fiction, 
          contemporary_fiction, fantasy, detective_fiction } = data
    


   
    console.log('books page data:', data)
    console.log('books page fantasy:', fantasy)

        return(
            <div className='books-main-content'>
                    <div className='content best-sellers'>
                   <SlideHeader>Bestsellers</SlideHeader>
                     <Carousel>{best_sellers}</Carousel>
                 </div>
                 <div className='content drama'>
                    <SlideHeader>Drama</SlideHeader>
                    <Carousel>{drama}</Carousel>
                </div>
                 <div className='content literary-fiction'>
                   <SlideHeader>Classic Fiction</SlideHeader>
                   <Carousel>{literary_fiction}</Carousel>
                 </div>
               <div className='content science-fiction'>
                    <SlideHeader>Science Fiction</SlideHeader>
                     <Carousel>{science_fiction}</Carousel>
                </div>
                <div className='content contemporary-fiction'>
                    <SlideHeader>Contemporary Classics</SlideHeader>
                     <Carousel>{contemporary_fiction}</Carousel>
                 </div>
                <div className='content fantasy'>
                    <SlideHeader>Fantasy</SlideHeader>
                     <Carousel>{fantasy}</Carousel>
                </div>
                <div className='content detective-mystery-fiction'>
                     <SlideHeader>Detective and Mystery Fiction</SlideHeader>
                    <Carousel>{detective_fiction}</Carousel>
                </div>

            




                
              
                
                
                
                
                
            </div>

        )

}

export default BooksPage


