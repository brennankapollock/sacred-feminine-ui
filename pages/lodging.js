import Lodging from '@/src/components/Lodging';
import { useState } from 'react';
const LodgingPage = () => {
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const validCode = 'LODGE';

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === validCode) {
      setIsCodeValid(true);
    } else {
      alert('Invalid code. Please try again.');
    }
  };
  return (
    <>
      {!isCodeValid ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={handleCodeSubmit}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code"
              className="border p-2 mb-4"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Validate Code
            </button>
          </form>
        </div>
      ) : (
        <Lodging />
      )}
    </>
  );
};

export default LodgingPage;