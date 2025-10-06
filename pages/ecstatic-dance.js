export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/events',
      permanent: false,
    },
  };
};

const EcstaticDanceRedirect = () => null;

export default EcstaticDanceRedirect;
