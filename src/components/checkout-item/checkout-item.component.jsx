import React from 'react';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='name'>{quantity}</span>
        <span className='name'>{price}</span>
        <div className='remove-button'>&#10005;</div>
    </div>
);

export default CheckoutItem;

