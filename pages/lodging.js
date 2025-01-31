import Lodging from '@/src/components/Lodging';
import Head from 'next/head';
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

  if (isCodeValid) {
    return <Lodging />;
  }

  return (
    <>
      <Head>
        <title>Lodging Information | Sacred Feminine</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#f8f3ef] to-[#f0e9e4] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <h1 className="font-cormorant text-4xl md:text-5xl text-[#2c2c2c] mb-4">
              Lodging Information
            </h1>
            <p className="text-[#666666] text-lg max-w-md mx-auto font-light">
              Enter your access code to view retreat lodging details
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 md:p-10">
            <form onSubmit={handleCodeSubmit} className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-[#4a4a4a] mb-2"
                >
                  Access Code
                </label>
                <div className="relative">
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Enter your code"
                    className="w-full px-4 py-4 rounded-lg border-2 border-[#e5e5e5] focus:outline-none focus:border-[#b5a397] text-[#2c2c2c] placeholder-[#999] text-lg transition-colors duration-200"
                    required
                  />
                </div>
                <p className="text-sm text-[#888] mt-2">
                  This code was provided in your retreat welcome package
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#b5a397] to-[#a39185] hover:from-[#a39185] hover:to-[#927f73] text-white py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] font-cormorant text-xl tracking-wide shadow-sm"
              >
                View Lodging Details
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#666666]">
              Need assistance? Contact{' '}
              <a
                href="mailto:team@sacredfeminine.co"
                className="text-[#b5a397] hover:text-[#927f73] underline"
              >
                team@sacredfeminine.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LodgingPage;
