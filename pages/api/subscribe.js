import mailchimp from '@mailchimp/mailchimp_marketing';
import { getSecret } from '../../lib/secrets';

const DEFAULT_AUDIENCE_ID = '749f2b97d8';

function getServerPrefix(apiKey) {
  const serverPrefix = apiKey.match(/-([a-z]+\d+)$/i)?.[1];

  if (!serverPrefix) {
    throw new Error(
      'MAILCHIMP_API_KEY must end with a Mailchimp server prefix such as -us19'
    );
  }

  return serverPrefix;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Mailchimp credentials may be stored in Doppler or directly in the
    // deployment environment. getSecret supports both locations.
    const [apiKey, audienceId] = await Promise.all([
      getSecret('MAILCHIMP_API_KEY'),
      getSecret('MAILCHIMP_AUDIENCE_ID', DEFAULT_AUDIENCE_ID),
    ]);

    mailchimp.setConfig({
      apiKey,
      server: getServerPrefix(apiKey),
    });

    await mailchimp.lists.addListMember(audienceId, {
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
    
    const isConfigurationError =
      error.message?.includes('Secret MAILCHIMP_') ||
      error.message?.includes('MAILCHIMP_API_KEY must end');

    console.error('Mailchimp subscription failed:', {
      status: error.status,
      title: error.response?.body?.title,
      message: error.message,
    });

    if (isConfigurationError) {
      return res.status(503).json({
        error: 'subscription_unavailable',
        message: 'Newsletter signup is temporarily unavailable.',
      });
    }

    return res.status(500).json({ error: 'Error subscribing to newsletter' });
  }
}
