import React from "react";

import StripeCheckot from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51L0x4EIjOhrtZ479aWyM3XnGg205wxWXfpFVxTWankMXuyPlemCzNlCnT9WpVVqHOz0z77EFmKBVo4vnh9l2Bzeo00vScBxNCq'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckot
            label='Pay Now'
            name='CRWN Cloting Ltd.'
            billingAddress
            shippingAddress
            image= 'https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    );
};

export default StripeCheckoutButton;
