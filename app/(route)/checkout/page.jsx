"use client";
import CheckoutProductItem from '@/app/_components/CheckoutProductItem';
import { CartContext } from '@/app/_context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';

function Checkout() {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useUser();
    const [loading,setLoading]=useState(false);
    const router = useRouter();

    // Calculate the total amount from the cart
    const calculate = () => {
        return cart.reduce((total, product) => total + Number(product.price), 0);
    };

    const onPaymentSuccess = async () => {
        setLoading(true);

        try {
            const result = await axios.post('/api/order', {
                orderDetail: cart,
                email: user?.primaryEmailAddress?.emailAddress,
            });

            if (result.status === 200) {
                setCart([]);
                toast.success("Payment successful! Check your email for the receipt.");
                router.push('/dashboard'); // Redirect to the dashboard
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("An error occurred while processing your order.");
        } finally {
            setLoading(false);
        }
    };

    const onPaymentError = () => {
        console.error("Payment Failed");
        toast.error("Payment failed. Please try again.");
    };

    const onPaymentCancel = () => {
        console.log("Payment Cancelled");
        toast.error("Payment cancelled.");
    };

    return (
        <div className="mt-10">
            <h2 className="font-bold text-3xl">Checkout</h2>
            <div className="grid gap-10 grid-cols-1 mt-5 md:grid-cols-2">
                {/* Cart Items */}
                <div className="flex flex-col gap-3">
                    {cart.map((product, index) => (
                        <CheckoutProductItem product={product} key={index} />
                    ))}
                </div>
                {/* Payment Section */}
                <div>
                    <Card className="p-5">
                        <h2 className="font-bold text-2xl flex justify-between">
                            Total: <span>₹{calculate()}</span>
                        </h2>
                        <hr className="border-black my-5" />
                        <p>Your payment receipt and product will be delivered to your registered email ID.</p>
                        <Badge className="text-black">{user?.primaryEmailAddress?.emailAddress}</Badge>
                        <div className="mt-10">
                           {calculate()&&<PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: calculate(),
                                                    currency_code: 'USD',
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={onPaymentSuccess}
                                onError={onPaymentError}
                                onCancel={onPaymentCancel}
                                style={{ layout: 'horizontal' }}
                            />
                           } 
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
