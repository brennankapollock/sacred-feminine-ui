import Layout from '@/src/layout/Layout';
import About from 'components/About';
import Contact from 'components/Contact';
import Home from 'components/Home';
import News from 'components/News';
import Retreat from 'components/Retreat';
import dynamic from 'next/dynamic';
const Resources = dynamic(() => import('components/Resources'), {
  ssr: false,
});
const Index = () => {
  return (
    <Layout>
      {/* HOME */}
      <Home />
      {/* /HOME */}
      {/* ABOUT */}
      <About />
      {/* /ABOUT */}
      {/* SERVICE */}
      <Retreat />
      {/* /SERVICE */}
      <div className="tokyo_tm_portfolio_titles" />
      {/* PORTFOLIO */}
      <Resources />
      {/* /PORTFOLIO */}
      {/* CONTACT */}
      <Contact />
      {/* /CONTACT */}
    </Layout>
  );
};
export default Index;
