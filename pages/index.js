import Layout from '@/src/layout/Layout';
import About from 'components/About';
import Contact from 'components/Contact';
import Events from 'components/Events';
import Home from 'components/Home';
import Retreats from '@/src/components/Retreats';
import dynamic from 'next/dynamic';
const Resources = dynamic(() => import('components/Resources'), {
  ssr: false,
});
const Index = () => {
  return (
    <Layout>
      <Home />
      <About />
      <Retreats />
      <Events />
      <div className="tokyo_tm_portfolio_titles" />
      <Resources />
      <Contact />
    </Layout>
  );
};
export default Index;
