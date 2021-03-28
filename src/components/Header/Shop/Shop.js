import React, { useState,useEffect } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Shop = () => {
   // const first10 = fakeData.slice(0,10);
    const[products,setProducts]=useState([]);
    const[cart,setCart]=useState([]);

    useEffect(()=>{
        fetch('https://frozen-wildwood-00529.herokuapp.com/products')
        .then(res=>res.json())
        .then(data => setProducts(data))
    },[])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://frozen-wildwood-00529.herokuapp.com/productsByKeys',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])

    const handleAddProduct = (product)=>{
        const ToBeAddedKey = product.key
        const sameProduct = cart.find(pd=>pd.key===ToBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct){
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key!==ToBeAddedKey);
            newCart = [...others,sameProduct]
        }else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        
        setCart(newCart);
        
        addToDatabaseCart(product.key,count);

    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
            
                
                    {
                         products.map(pd=><Product
                            key = {pd.key}
                            showAddToCart ={true}
                            handleAddProduct = {handleAddProduct}
                             product={pd}>

                             </Product>)
                    }
                
            </div>
            <div className="cart">
                <Cart cart={cart}></Cart>
                    <Link to='/review'>
                        <button className="main-button">Order Review</button>
                    </Link>
            </div>
        </div>
    );
};

export default Shop;