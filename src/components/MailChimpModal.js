import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useState } from 'react';
import { TokyoContext } from '../Context';

const MailchimpModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { navChange, nav, menus } = useContext(TokyoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
      } else if (
        response.status === 400 &&
        data.error === 'already_subscribed'
      ) {
        setError(data.message);
      } else {
        setError('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  if (isSubscribed) {
    return (
      <Alert className="flex flex-col items-center justify-center gap-4">
        <AlertTitle>Thank you for subscribing!</AlertTitle>
        <AlertDescription className="flex flex-col items-center text-center">
          <span className="mb-4">
            We'll keep you updated! Check out our current retreats here:
          </span>
          <Button
            className="text-black bg-dark_goldenrod font-psych text-lg px-8 py-6 hover:bg-chefchaouen_blue mt-2"
            onClick={() => {
              onClose();
              navChange('retreats');
            }}
          >
            Retreats
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert>
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="font-psych" htmlFor="firstName">
            First Name
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="font-psych" htmlFor="lastName">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label className="font-psych" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full font-psych text-black bg-dark_goldenrod hover:text-white hover:bg-dark_goldenrod-300"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default MailchimpModal;
