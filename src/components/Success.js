import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };
  const { session_id } = router.query;

  return (
    <div className="success-page">
      <h1>Payment Successful</h1>
      <p>We Can't Wait to See You On Retreat!</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}
