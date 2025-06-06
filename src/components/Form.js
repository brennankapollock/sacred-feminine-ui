import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const products = [
  {
    id: 1,
    name: 'Rest in Peace',
    price: 20,
    image: 'product1.jpg',
    quantity: 1,
  },
];

export default function Form() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert('Please select a product to proceed.');
      return;
    }
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout-sessions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: [selectedProduct],
        returnUrl: window.location.origin,
      }),
    });
    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <section>
      <div className="product-cards flex flex-col items-center justify-center h-screen m-4">
        <h1 className="product-title text-4xl font-bold font-psych">
          Rest In Peace
        </h1>
        {!selectedProduct &&
          products.map((product) => (
            <div key={product.id} className="product-card gap-8">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-xl font-bold">Price: ${product.price}</p>
              <button
                className="product-card-button border-black rounded-md p-4"
                onClick={() => handleProductSelect(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        {selectedProduct && (
          <div className="product-card-confirmation">
            <h3 className="text-2xl font-bold">Your Cart</h3>
            <p className="text-xl font-bold">{selectedProduct.name}</p>
            <p className="text-xl font-bold">Price: ${selectedProduct.price}</p>
            <div className="product-card-button-group">
              <button
                className="product-card-remove"
                onClick={() => handleProductSelect(null)}
              >
                Remove
              </button>
              <button className="product-card-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
