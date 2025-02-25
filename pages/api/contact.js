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
    // Send notification email to Sacred Feminine team
    const teamEmailResponse = await resend.emails.send({
      from: 'Sacred Feminine <noreply@team.sacredfeminine.co>',
      to: 'team@sacredfeminine.co',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email,
    });

    console.log('Team email response:', teamEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: 'Sacred Feminine <noreply@team.sacredfeminine.co>',
      to: email,
      subject: 'Thank you for Reaching Out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for Reaching Out!</h2>
          <p>Dear ${firstName},</p>
          <p>We have received your message and will get back to you soon.</p>
          <p>Best regards,</p>
          <p>The Sacred Feminine Team</p>
        </div>
      `,
      reply_to: 'team@sacredfeminine.co',
    });

    console.log('User email response:', userEmailResponse);

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
