import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!email || !firstName || !lastName || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // For testing: Use the email you used to sign up for Resend
    const testEmail = 'mail@brennankapollock.com';

    // Send email to team (during testing, this goes to your email)
    const teamEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's sandbox domain
      to: testEmail,
      subject: `Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Team email response:', teamEmailResponse); // Add logging

    // Send confirmation email to user (during testing, this also goes to your email)
    const userEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's sandbox domain
      to: testEmail, // During testing, send to your email instead of user's email
      subject: 'We received your message - Sacred Feminine',
      html: `
        <h2>Thank you for contacting Sacred Feminine</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your message and will get back to you soon.</p>
        <p>Best regards,</p>
        <p>The Sacred Feminine Team</p>
      `,
    });

    console.log('User email response:', userEmailResponse); // Add logging

    return res.status(200).json({
      message: 'Message sent successfully',
      teamEmailId: teamEmailResponse.id,
      userEmailId: userEmailResponse.id,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({
      error: 'Error sending message',
      details: error.message,
    });
  }
}
