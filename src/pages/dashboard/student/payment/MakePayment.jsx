import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { totalPrice } from '../SelectedClasses';
import PaymentForm from './PaymentForm';
import useAxios from '../../../../customHooks/useAxios';

const MakePayment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_pk)
    const [clientSecret, setClientSecret] = useState("");
    const [instance] = useAxios()
    const price = totalPrice;

    useEffect(() => {
        instance.post(`/create-payment-intent`, { price })
            .then(result => {
                setClientSecret(result.data.clientSecret);
            })
            .catch(err => {
                console.log(err);
            });
    }, [price, instance]);

    return (
        <div>
            <h1 className='text-3xl font-bold p-5 text-center'>Payment</h1>
            <h1 className='text-center'>Price : $ {price}</h1>
            <Elements stripe={stripePromise}>
                <PaymentForm clientSecret={clientSecret} />
            </Elements>
        </div>
    );
};

export default MakePayment;