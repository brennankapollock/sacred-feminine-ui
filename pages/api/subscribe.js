import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: '18bb7c68d85e0d869246603e57babbd6-us19',
  server: 'us19',
});

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
    console.error('Error subscribing to Mailchimp:', error);

    return res
      .status(500)
      .json({ error: error.message || 'Error subscribing to newsletter' });
  }
}