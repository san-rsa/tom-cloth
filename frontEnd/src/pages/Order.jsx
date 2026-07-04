import React, { useEffect, useState } from 'react';
import styles from '../styles/Order.module.css'; // Import styles as a JS object
import Nav, { SearchNav } from '../components/sub component/Nav';
import { CheckoutCard } from '../components/sub component/list/Generallist';
import { useParams } from 'react-router-dom';

// Mock data simulating an API response
const MOCK_ORDER = {
  id: "ORD-98721A",
  date: "June 29, 2026",
  status: "Delivered",
  shippingAddress: {
    name: "Alex Mercer",
    street: "123 Innovation Way, Suite 400",
    city: "Dublin",
    postalCode: "D04 X2K3",
    country: "Ireland"
  },
  paymentMethod: "Visa ending in 4242",
  items: [
    { id: 1, name: "Mechanical Wireless Keyboard", sku: "KB-MX80", quantity: 1, price: 129.99 },
    { id: 2, name: "Ergonomic Vertical Mouse", sku: "MS-ERGO", quantity: 1, price: 79.50 },
    { id: 3, name: "Premium Desk Mat (Extra Large)", sku: "DM-XL01", quantity: 2, price: 24.99 }
  ],
  subtotal: 259.47,
  shipping: 15.00,
  tax: 54.49,
  total: 328.96
};

export default function Order() {

    const [data, setData] = useState()
    let link = useParams().id






                 useEffect(() => {
                      
                        
            fetch(process.env.REACT_APP_API_LINK + 'getone/order/' + link, {
                          method: 'GET',
                          credentials: "include",
                          headers: {'Content-Type': 'application/json'},
                        }).then((res) =>  res.json())
                  .then((data) => setData(data ) ); 
                                          
                                 },   []);
  const order = MOCK_ORDER;

  return (
    <div className={styles.app} >
        <Nav />
        <SearchNav />

        <div className={styles.container}>
      {/* Page Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Order Details</h1>
          <p className={styles.subtitle}>
            Order ID: <span className={styles.boldText}>{link}</span>     {/*  • Placed on {order.date} */}
          </p>
        </div>
        <span className={`${styles.badge} ${styles.badgeDelivered}` } style={{background: data?.Delivered ? 'green' : 'yellow'}} >
          {data?.Delivered ? 'Deliered' : 'Shipment on the way'}
        </span>
      </header>

      {/* Grid Layout for Metadata split */}
      <div className={styles.metaGrid}>
        {/* Shipping Info Card */}
        {data?.address ?         <div className={styles.card}>
          <h2 className={styles.cardTitle}>Shipping Address</h2>
          <p className={styles.addressLine}>{data?.address.street}</p>
          <p className={styles.addressLine}>{data?.address.city}</p>
          <p className={styles.addressLine}>
            {data?.address.county}, {data?.address.zipCode}
          </p>
          <p className={styles.addressLine}>Ireland</p>
        </div> :         <div className={styles.card}>
          <h2 className={styles.cardTitle}>Shipping Address</h2>
          <p className={styles.addressLine}> No address found </p>
         
        </div> }

        {/* Payment Info Card */}
        {/* <div className={styles.card}>
          <h2 className={styles.cardTitle}>Payment Information</h2>
          <p className={styles.infoText}>{order.paymentMethod}</p>
          <p className={styles.subtext}>Billed & authorized securely</p>
        </div>
       */}
</div>
      {/* Items Table Section */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Items Ordered</h2>
        <div className={styles.tableResponsive}>

              {data?.products?.map((item) => (
            <CheckoutCard
                name={item.productId.name}
                image={item.productId?.img[0].url}
                quantity={item.quantity}
                color={item.color}
                c={item.productId.size.find((items => items._id === item.sizeId) )?.size}
                total={item.total}

                 /> 
              ))}
          
        </div>
      </div>

      {/* Financial Summary Section */}
      <div className={styles.summaryWrapper}>
        <div className={styles.summaryCard}>
          {/* <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>€{order.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Estimated Shipping</span>
            <span>€{order.shipping.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>VAT / Tax</span>
            <span>€{order.tax.toFixed(2)}</span>
          </div> */}

          <div className={`${styles.summaryLine} ${styles.totalLine}`}>
            <span>Total</span>
            <span>€{data?.totalCost?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}