import SectionContainer from './SectionContainer';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const socialIcon = [
  {
    id: 1,
    iconName: 'icon-facebook-squared',
    link: 'https://www.facebook.com/',
  },
  {
    id: 2,
    iconName: 'icon-twitter-squared',
    link: 'https://twitter.com/',
  },

  {
    id: 3,
    iconName: 'icon-linkedin-squared',
    link: 'https://www.linkedin.com/',
  },
];
const Home = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout-sessions/create', {
      method: 'POST',
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <SectionContainer name={'home'}>
      <div className="container">
        <div className="tokyo_tm_home w-full min-h-[100vh] clear-both flex items-center justify-center relative bg-lime-500">
          <div className="home_content flex items-center ">
            <div
              className="avatar min-w-[300px] min-h-[300px] relative rounded-full"
              data-type="circle"
            >
              {' '}
              <div
                className="image absolute inset-0 bg-no-repeat bg-center bg-cover"
                data-img-url="assets/img/logo/logo.png"
              />
            </div>
            <div className="details ml-[80px]">
              <p className="job text-black text-center font-bagnard max-w-[450px] mb-[25px]">
                The way of the sacred feminine is about joining things that were
                never meant to be apart: the mind and body, our power and our
                vulnerability, the self and the other, our sense of the realness
                of right here, and the vastness and mystery of the unknown.
              </p>
              <div className="tokyo_tm_button flex items-center justify-evenly rounded-lg">
                <a
                  className="text-black font-psych "
                  href="#"
                  onClick={handleCheckout}
                >
                  Join The Fun!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
export default Home;
