import './ProductDetails.css'
import { ISBN_Identifier } from '../../types'


interface Props {
    
    pageCount: number,
    publisher: string,
    ISBNIdentifiers: ISBN_Identifier[]

}

const ProductDetails = ({pageCount, publisher,  ISBNIdentifiers}: Props) => {

    return (
        <aside className="product-details-wrapper">
            <hr />
            <h3>Product Details</h3>
            <div className="product-details-content">
                <p>{pageCount} pages</p>
                <p>Published by {publisher}</p>
                <ul>
                    {ISBNIdentifiers && 
                        ISBNIdentifiers.map((obj: ISBN_Identifier) => (
                            <li key={obj.identifier}> {obj.type} : {obj.identifier}</li>
                        ))
                    }                  
                </ul>
            </div>
        </aside>
    )

}

export default ProductDetails