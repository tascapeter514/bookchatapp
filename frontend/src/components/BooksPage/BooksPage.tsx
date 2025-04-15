import './BooksPage.css'
import BookSlider from '../BookSlider/BookSlider'
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
            {/* //     <div className='content best-sellers'>
            //         <SlideHeader>Bestsellers</SlideHeader>
            //         <BookSlider>{best_sellers}</BookSlider>
            //     </div>
            //     <div className='content drama'>
            //         <SlideHeader>Drama</SlideHeader>
            //         <BookSlider>{drama}</BookSlider>
            //     </div>
            //     <div className='content literary-fiction'>
            //         <SlideHeader>Classic Fiction</SlideHeader>
            //         <BookSlider>{literary_fiction}</BookSlider>
            //     </div>
            //     <div className='content science-fiction'>
            //         <SlideHeader>Science Fiction</SlideHeader>
            //         <BookSlider>{science_fiction}</BookSlider>
            //     </div>
            //     <div className='content contemporary-fiction'>
            //         <SlideHeader>Contemporary Classics</SlideHeader>
            //         <BookSlider>{contemporary_fiction}</BookSlider>
            //     </div>
            //     <div className='content fantasy'>
            //         <SlideHeader>Fantasy</SlideHeader>
            //         <BookSlider>{fantasy}</BookSlider>
            //     </div>
            //     <div className='content detective-mystery-fiction'>
            //         <SlideHeader>Detective and Mystery Fiction</SlideHeader>
            //         <BookSlider>{detective_fiction}</BookSlider>
            //     </div> */}

            <Carousel>{best_sellers}</Carousel>




                
              
                
                
                
                
                
            </div>

        )

}

export default BooksPage


