import React,{useEffect, useState} from 'react';
import happyImage from '../../images/giphy.gif';

import { getDatabaseCart,  removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Review = () => {
    const [orderPlaced,setOrderPlaced] = useState(false);
    console.log(setOrderPlaced)
    const history = useHistory()
    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }
    const [cart,setCart] = useState([]);
    const removeProduct = (productKey) =>{
       // console.log('remove clicked',productKey);
        const newCart = cart.filter(pd=>pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
            //cart
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

        /*    const cartProducts = productKeys.map(key => {
                const product = fakeData.find(pd=>pd.key===key);
                product.quantity =savedCart[key];
                return product;
            });
            setCart(cartProducts);  */
    },[])
    let thankYou ;
    if(orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            
            <div className="product-container">
            {
                cart.map(pd=><ReviewItem
                    key={pd.key}
                    removeProduct={removeProduct}
                     product={pd}>
                         
                     </ReviewItem>)
            }

            {
                thankYou
            }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;