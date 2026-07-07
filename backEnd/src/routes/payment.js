const express = require("express");
const router = new express.Router();
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const Cloth = require("../models/clothes");
const {auth, send_mail} = require("../middleware/mid");
const Order = require("../models/order");
const User = require("../models/user");
const Guest = require("../models/guest");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);














const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/3', auth, async (req, res) => {

    const user = req.userId

    const data = await Cart.findOne({userId: user})  //.populate({path: "products", populate: {path: "productId"}})


  const session = await stripe.checkout.sessions.create({
    customer_email: 'customer@example.com',
    submit_type: 'pay',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['IE', 'NG'],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: data.products.total,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});





router.post("/o", auth, async (req, res) => {

  const id = await User.findOne({_id: req.userId})  //.populate({path: "products", populate: {path: "productId"}})
  const cart = await Cart.findOne({userId: req.userId})  //.populate({path: "products", populate: {path: "productId"}})


  const paymentMethods = await stripe.paymentMethods.list({
    customer: id.paymentId,
    type: "card",
  });


   if (!id.paymentId || !paymentMethods.data[0]?.id) {
    

  // Create a PaymentIntent with the order amount and currency

  const customer = await stripe.customers.create();

  const user = await User.findOneAndUpdate({_id: req.userId}, {paymentId: customer.id}, {
    new: true
  });

  console.log(paymentMethods);


  user.save()


  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    receipt_email: 'sanuthrahman@gmail.com',
   //  submit_type: 'pay',
    // billing_address_collection: 'auto',
     shipping: {
      allowed_countries: ['IE', 'NG'],
    },

    //mode: 'payment',

    amount: 200 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),

    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
        enabled: true,
      },
    
  },


      console.log(cart)

);  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  }

  

  else if(id.paymentId) {
    chargeCustomer(id.paymentId, cart , res)
  }
    
  console.log(id);








});








router.post("/", auth, async (req, res) => {

  const id = await User.findOne({_id: req.userId})  //.populate({path: "products", populate: {path: "productId"}})
  const cart = await Cart.findOne({userId: req.userId})  //.populate({path: "products", populate: {path: "productId"}})

  // Create a PaymentIntent with the order amount and currency
    const customer = await stripe.customers.create();

    console.log('====================================');
    console.log();
    console.log('====================================');
if (!id.paymentId) {
  
    const user = await User.findOneAndUpdate({_id: req.userId}, {paymentId: customer.id}, {
      new: true
    });
  
    // console.log(paymentMethods);
  
  
    user.save()
}


  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    receipt_email: 'sanuthrahman@gmail.com',

   //  submit_type: 'pay',
    // billing_address_collection: 'auto',
    //  shipping: 'auto',
    

    //mode: 'payment',

    amount: 500 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),

    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
        enabled: true,
      },
    
  },



);  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  

  


  console.log(id);








});












// This is your test secret API key.
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_4ab892302ab6ec4892387cc1022520047132237e528a41829b78d9a521aa17be'// ||   process.env.STRIPE_ENDPOINT;


router.post('/webhooks', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});













router.post('/webhook',  express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

 const rawBody = req.rawBody;


  let event;
  if (endpointSecret) {
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig,  process.env.STRIPE_ENDPOINT);
    } catch (err) {
        res.status(400).send(`⚠️  Webhook signature verification failed: ${err.message}`);
        console.log(`⚠️  Webhook signature verification failed.`, err.message);

        return;
    }



    
    // if (event.type === 'payment_intent.succeeded') {
    //     async function order (err) {  
    //           const user = event.data.object.customer // request.userId 

    //        const carts = await Cart.findOne({paymentId: user})  //.populate({path: "products", populate: {path: "productId"}})
    //        const order = await Order.findOne({userId: user})  //.populate({path: "products", populate: {path: "productId"}})

    //        console.log(event.receipt_email)
    //       if (err) {
    //         console.log(err+44);
    //         return res.redirect("/checkout");
    //       }

    //               const cart = await Cart.findOne({ userId: user });
    //               const product = await Cloth.find();
    //               const userInfo = await User.findById(user );
    //               const send_email = []
          
          
    //               //--If Cart Exists ----
          
    //                   if (cart) {
    //                   //---- Check if index exists ----
    //                   // const indexFound = cart.products.findIndex(
    //                   //     (item) =>
    //                   //         item.productId.toString() === productId.toString() &&
    //                   //         item.sizeId.toString() === size.toString() &&
    //                   //         item.color === color );
          
    //                   for (let i = 0; i < cart.products.length; i++) {
          
          
    //               const {productId, size, quantity, color,  } = cart.products[i]
          
          
    //              // let productDetailss = await productById(productId);
    //               const productDetails = await Cloth.findById( productId );
          
          
          
    //               send_email.push({
                             
    //                             name: productDetails.name, productModel: productDetails.categoryId[0],
    //                             img: productDetails.img[0].url,
                          
    //                             sizeId: productDetails.size.find((item => item._id == size) )?.size, 
    //                             quantity: quantity, color,
                          
          
    //                             price: productDetails.size.find((item => item._id == size) )?.price,
                          
    //                             total: productDetails.size.find((item => item._id == size) )?.price * quantity,
    //               })
                      
    //               productDetails.ordered +=  1
          
          
    //               productDetails.save()
          
          
          
    //               } 
          
          
          
    //               if (userInfo) {
          
    //                   if (phone ) {
    //                       userInfo.phone = phone
    //                       userInfo.address.street =  street
    //                       userInfo.address.city =  city
    //                       userInfo.address.county =  county
    //                       userInfo.address.zipcode = zipcode
          
    //                       userInfo.save()
          
    //                           if (cart.products.length !== 0) {
    //                       const data = await Order.create({
    //                       userId: userInfo._id,
    //                       products: cart.products,
    //                       // transactionId, paymentStatus, Delivered,                 
    //                       totalCost: cart.totalCost
          
    //                     });
                        
          
          
          
    //                     send_mail(userInfo, data, send_email )
          
          
    //                     const del = await Cart.deleteOne({ userId: user });
          
          
    //                   res.status(200).json({
    //                       type: "success",
    //                       mgs: "Process successful",
    //                       data: data
    //                   })
                      
    //               }
                      
          
          
    //               }
    //               }
          
    //               }
          
    //       const orders = new Order({
    //         userId: user._id,
            
    //           totalCost: cart.totalCost,
    //           products: cart.products,
          
    //       //   address: req.body.address,
    //         transactionId:  event.data.object.id,
    //         paymentStatus: event.data.object.payment_status,

    //       });
    //       orders.save();
    //       // req.session?.cart = null;
    //                       Cart.findByIdAndDelete(cart._id);

    //            cart.save();
      
    //     }

    //     console.log(event)
      
    //      order()
   
    //         }

  }

    const paymentIntent = event.data.object;
    const stripePaymentIntentId = paymentIntent.id;
  // Handle the event
  switch (event.type) {

    case 'payment_intent.succeeded':
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);

    console.log('====================================');
  
    // Pull the structural business data saved in step 3
    const { userId, cartId } = paymentIntent.metadata;
    const amount = paymentIntent.amount / 100; // Cents to Dollars
    const currency = paymentIntent.currency;
    const shippingAddress = paymentIntent.shipping?.address || paymentIntent.billing_details?.address;
    const shippingName = paymentIntent.shipping?.name.split(' ')
    const email = paymentIntent.receipt_email
        const send_email = []
    const shippingPhone = paymentIntent.shipping?.phone 


    const amountPaid = paymentIntent.amount;

    // const cart = 

    const cart = await Order.findOne({stripePaymentIntentId})  //.populate({path: "products", populate: {path: "productId"}})

    console.log(cart, email, );



        //--If Cart Exists ----

            if (cart) {
        const userInfo = await User.findById(userId );

            for (let i = 0; i < cart.products.length; i++) {


        const {productId, sizeId, quantity, color,  } = cart.products[i]



       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );



        send_email.push({
                   
                      name: productDetails.name, productModel: productDetails.categoryId[0],
                      img: productDetails.img[0].url,
                
                      quantity: quantity, color,
                
                      sizeId: productDetails.size.find((item => item._id == String(sizeId)) )?.size, 

                      price: productDetails.size.find((item => item._id == String(sizeId)) )?.price,
                
                      total: productDetails.size.find((item => item._id == String(sizeId)) )?.price * quantity,
        })
            
        productDetails.ordered +=  1


        productDetails.save()        



        } 



        if (userInfo) {

            if (email ) {
                userInfo.address.street = shippingAddress.line1
                userInfo.address.city =  shippingAddress.city
                userInfo.address.county =  shippingAddress.state
                userInfo.address.zipcode = shippingAddress.postal_code
                userInfo.phone = shippingPhone



                userInfo.save()




            //   const del = await Cart.deleteOne({ _id: cartId });
            


        }

                const data = await Order.findOneAndUpdate(
                { stripePaymentIntentId },
                {
            //   products:cart.products,

            totalCost: amountPaid / 100 ,
            address: {street: shippingAddress.line1, city: shippingAddress.city, county: shippingAddress.state, zipCode: shippingAddress.postal_code,
        },
            expireAt:'',
                paymentStatus: 'completed'
                },
                { upsert: true, new: true }
            );        

              send_mail(userInfo, data, send_email )

        }
        else {


                    const guest = await Guest.findOne({
                       email,
                    })
            
                    if (guest) {

                        
                    const data =  await Order.findOneAndUpdate(
                { stripePaymentIntentId },
                {
            //   products:cart.products,


            guestId: guest._id,

            totalCost: amountPaid / 100,
            address: {street: shippingAddress.line1, city: shippingAddress.city, county: shippingAddress.state, zipCode: shippingAddress.postal_code,
        },
            expireAt:'',
                paymentStatus: 'completed'
                },
                { upsert: true, new: true }

            );    


            send_mail(guest, data, send_email )

                    
          } else {

                        const save = await Guest.create({
                        name: {first: shippingName[0], last: shippingName[1]},  email, phone: shippingPhone,  address: {street: shippingAddress.line1, city: shippingAddress.city, county: shippingAddress.state, zipCode: shippingAddress.postal_code},

                        } )                        
                         const data = await Order.findOneAndUpdate(
                            { stripePaymentIntentId },
                            {
                        //   products:cart.products,
                        guestId: save._id,

                        totalCost: amountPaid,
                        address: {street: shippingAddress.line1, city: shippingAddress.city, county: shippingAddress.state, zipCode: shippingAddress.postal_code,
                    },
                        expireAt:'',
                            paymentStatus: 'completed'
                            },
                            { upsert: true, new: true }
                        ); 
                        
                        
                        send_mail(save, data, send_email )

                    }



            


            await Order.findOneAndUpdate(
                { stripePaymentIntentId },
                {
            //   products:cart.products,

            totalCost: amountPaid,
            address: {street: shippingAddress.line1, city: shippingAddress.city, county: shippingAddress.state, zipCode: shippingAddress.postal_code,
        },
            expireAt:'',
                paymentStatus: 'completed'
                },
                { upsert: true, new: true }
            );    
        }

        }

    try {
      // Use upsert or findOne to secure absolute idempotency





      
      console.log(`✅ Order fulfilled successfully for Intent: ${stripePaymentIntentId}7777`);
      return res.status(200).json({ received: true });
    } catch (dbError) {
      console.error('❌ Database save failure:', dbError);
      // Return 500 so Stripe knows to attempt redelivery later
      return res.status(500).send('Database storage failed');
    }
  
        break;


    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled': {
      try {
        // STRATEGY 1: Hard delete from MongoDB entirely
        await Order.deleteOne({ stripePaymentIntentId });
        console.log(`🗑️ Order DELETED from DB due to failure/cancellation: ${stripePaymentIntentId}`);

        /* 
        // STRATEGY 2: Better Practice (Keep the record but mark it failed)
        await Order.findOneAndUpdate(
          { stripePaymentIntentId },
          { status: 'failed' }
        );
        console.log(`❌ Order marked FAILED in DB: ${stripePaymentIntentId}`);
        */

        return res.status(200).json({ received: true });
      } catch (dbError) {
        console.error('❌ Database deletion failure:', dbError);
        return res.status(500).send('Database removal failed');
      }
    }

    break;
    break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;

    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    case 'payment_intent.created':
      const payment_intentcreated = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});





















const chargeCustomer = async (customerId, cart, res) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });

  console.log(paymentMethods);
  
  try {
    // Charge the customer and payment method immediately

    const paymentIntent = await stripe.paymentIntents.create({
      // customer: customerId,
      // setup_future_usage: "off_session",
     receipt_email: 'sanuthrahman@gmail.com',
      // submit_type: 'pay',
      // billing_address_collection: 'auto',
      shipping: {
        allowed_countries: ['IE', 'NG'],
      },
      //   payment_method: paymentMethods.data[0].id,
      // off_session: true,
      // confirm: true,
      // mode: 'payment',
  
      // amount: 200 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),
  
    


      amount: 1099,
      currency: "eur",
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  
      
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", err);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  const customer = await stripe.customers.create();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});





router.post('/webhookvvv b', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  console.log(req.body, req.headers, req.rawBody);

  try {
    event = stripe.webhooks.constructEvent(req.body, sig,  process.env.STRIPE_ENDPOINT);
  } catch (err) {
    console.error(`❌ Webhook Signature Verification Failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful one-time payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('====================================');
  
    // Pull the structural business data saved in step 3
    const { userId, productId } = paymentIntent.metadata;
    const stripePaymentIntentId = paymentIntent.id;
    const amount = paymentIntent.amount / 100; // Cents to Dollars
    const currency = paymentIntent.currency;

    try {
      // Use upsert or findOne to secure absolute idempotency
      await Order.findOneAndUpdate(
        { stripePaymentIntentId },
        {
          userId,
        //   productId,
        //   amount,
        //   currency,
          paymentStatus: 'completed'
        },
        { upsert: true, new: true }
      );
      
      console.log(`✅ Order fulfilled successfully for Intent: ${stripePaymentIntentId}`);
      return res.status(200).json({ received: true });
    } catch (dbError) {
      console.error('❌ Database save failure:', dbError);
      // Return 500 so Stripe knows to attempt redelivery later
      return res.status(500).send('Database storage failed');
    }
  }

  // Fallback 200 for unhandled events
  res.json({ received: true });
});







router.post('/pay', auth, async (req, res) => {
  const { productId, amount } = req.body;
  const userId = req.userId;

  try {
            const cart = await Cart.findOne({ userId: userId });
            const userInfo = await User.findById(userId );
            const send_email = []

            const cartId = cart._id.toString()
    
  
            //--If Cart Exists ----

                const paymentIntent = await stripe.paymentIntents.create({
                amount: cart.totalCost * 100, // Stripe processes in cents (e.g., $10.00 = 1000)
                currency: 'eur',
                automatic_payment_methods: { enabled: true },
                metadata: { userId, cartId  } // productId } 
        });  
                   
        
  
    // 2. Create a placeholder transaction in your DB
    const data = await Order.create({
      userId: userInfo._id,
      products:cart.products,
      totalCost: cart.totalCost,
      expireAt: new Date(Date.now() + 30 * 60 * 1000),
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: 'pending'
    });

        



    // 3. Return client secret to react frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post('/pay-guest', async (req, res) => {
  const { cart, amount,  } = req.body;

  try {
    

                const {productId, quantity, size, color, products, category, name, price, c} = req.body

    console.log(req.body );


    
    if (!cart ) {
        return res.status(500).json({
            type: "Not Found",
            msg: "no cart items"
        })
    }

        const cart_items = [];


        if (cart) {
                    
            
            for (let i = 0; i < cart.length; i++) {


        const {productId, category, quantity, size, color, products, name, price, c} = cart[i]


       // let productDetailss = await productById(productId);
        const productDetails = await Cloth.findById( productId );


          if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "no product found"
            })
        }

        cart_items.push({
                   
                      productId: productDetails._id, productModel: productDetails.categoryId[0],
                
                      sizeId: size, quantity: quantity, color,
                

                      price: productDetails.size.find((item => item._id == size) )?.price,
                
                      total: productDetails.size.find((item => item._id == size) )?.price * quantity,
        })

   
        }

            
            }
       


                const paymentIntent = await stripe.paymentIntents.create({
                amount: cart.totalCost, // Stripe processes in cents (e.g., $10.00 = 1000)
                currency: 'eur',
                automatic_payment_methods: { enabled: true },
                metadata: { userId, cartId: '000000000000000000000'  } // productId } 
        });  
                   
        
  
    // 2. Create a placeholder transaction in your DB
    const data = await Order.create({
      products:cart_items,
      totalCost: cart_items.map(item => item.total).reduce((acc, next) => acc + next),
      expireAt: new Date(Date.now() + 30 * 60 * 1000),
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: 'pending'
    });

        
    // 3. Return client secret to react frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });    
} 
   catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;