import React,{useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import Product from '../Header/Product/Product';

const ProductDetail = () => {
    const {productKey} =  useParams();
    const[product,setProduct]=useState([]);
    useEffect(()=>{
        fetch('https://frozen-wildwood-00529.herokuapp.com/product/'+ productKey)
        .then(res=>res.json())
        .then(data => setProduct(data))
    },[productKey])

    // const product =fakeData.find(pd=>pd.key===productKey);
    console.log(product);
    return (
        <div>
            <h1>Your product details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;