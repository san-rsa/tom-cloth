import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';
import Nav, { SearchNav } from '../components/sub component/Nav';
import Style from "../styles/Checkout.module.css"

// Use your Stripe Publishable Key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handlePay = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/success`,
//       },
//     });
//     if (error) console.error(error.message);
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handlePay}>
//       <PaymentElement />
//       <button disabled={loading}>Pay Now</button>
//     </form>
//   );
// }



export default function CheckoutContainer() {
  const [clientSecret, setClientSecret] = useState('');
  console.log(clientSecret);
  

  const startCheckout = async () => {
    const res = await fetch(process.env.REACT_APP_API_LINK +'payment/pay', {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user_99', productId: 'prod_456', amount: 29.99 })
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
  };


  return (
    <div>
      {!clientSecret ? (
        <button onClick={startCheckout}>Buy Now </button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: {theme: 'stripe'}  }}>
          <CheckoutForms />
        </Elements>
      )}
    </div>
  );
}





// export default function App() {
//   const options = {
//     // Pass the clientSecret fetched from your backend server step
//     clientSecret: '{{CLIENT_SECRET_FROM_BACKEND}}',
//     appearance: { theme: 'stripe' },
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// }


 function CheckoutForms() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe redirects here after authentication (e.g., 3D Secure)
        return_url: `${window.location.origin}/`,
                receipt_email: email, 

      },
    });

    if (error) {
      setErrorMessage(error.message);
    }



    setIsProcessing(false);
  };

  return (
    <div >
        {/* <Nav />
        <SearchNav /> */}

            <form className={Style.form} onSubmit={handleSubmit}>

        <div style={{padding: '10px'}} >
            <h3> Address </h3>
            <AddressElement options={{ mode: 'shipping', allowedCountries: ['IE'], fields: {phone: 'always', },  validation: {
            phone: { required: 'always' }

          } }} />


        <div style={{ marginBottom: '20px'  }}>
        <label>Email Address</label>
        <input 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '10px', marginTop: '5px' }}
        />
      </div>


        </div>
                
        <div style={{padding: '10px '}} >
            <h3> Card </h3>

      <PaymentElement  />
      <button disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div>{errorMessage}</div>}
        </div>

    </form>

    </div>
  );
}





export {CheckoutForms, }