import Layout from '@/src/layout/Layout';
import About from 'components/About';
import Contact from 'components/Contact';
import Home from 'components/Home';
import News from 'components/News';
import Retreat from 'components/Retreat';
import Checkout from 'components/Checkout';
import dynamic from 'next/dynamic';
const Resources = dynamic(() => import('components/Resources'), {
  ssr: false,
});
const Index = () => {
  return (
    <Layout>
      <Home />
      <About />
      <Retreat />
      <div className="tokyo_tm_portfolio_titles" />
      <Resources />
      <Contact />
    </Layout>
  );
};
export default Index;
