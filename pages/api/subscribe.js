require('dotenv').config();

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us19',
});

console.log(process.env.MAILCHIMP_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await mailchimp.lists.addListMember('749f2b97d8', {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });

    return res.status(201).json({ message: 'Successfully subscribed' });
  } catch (error) {
    // Check if error is due to member already existing
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return res.status(400).json({ 
        error: 'already_subscribed',
        message: 'You are already subscribed to our newsletter!'
      });
    }
    
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error subscribing to newsletter' });
  }
}
