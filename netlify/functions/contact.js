import nodemailer from 'nodemailer'

export async function handler(event) {
  // CORS handling if invoked from different origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}')

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please provide name, email, and message.' }),
      }
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com'
    const port = parseInt(process.env.SMTP_PORT || '587', 10)
    // In Nodemailer, port 465 requires secure: true. Port 587 uses STARTTLS (secure: false).
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : (port === 465)
    const user = process.env.SMTP_USER || process.env.SMTP_FROM_EMAIL || 'ashok.j2346@gmail.com'
    const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS
    const fromName = process.env.SMTP_FROM_NAME || 'MeshWorks'
    const toEmail = process.env.CONTACT_TO || 'bharathdev2513@gmail.com'

    if (!user || !pass) {
      console.error('SMTP error: user or pass environment variables are missing.')
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Server configuration error: SMTP credentials not set.',
        }),
      }
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })

    const mailOptions = {
      from: `"${fromName}" <${user}>`,
      replyTo: `"${name}" <${email}>`,
      to: toEmail,
      subject: `[MeshWorks Project Inquiry] from ${name}`,
      text: `New message from MeshWorks website:\n\nName: ${name}\nEmail: ${email}\n\nProject Details:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px;">
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; color: #111111; border-bottom: 2px solid #111111; padding-bottom: 10px;">
            New Project Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 80px;"><strong>Client:</strong></td>
              <td style="padding: 8px 0; color: #111111; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #111111; font-size: 14px;">
                <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="background-color: #f5f5f5; border-radius: 6px; padding: 16px; margin-top: 10px;">
            <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #888888; font-weight: 600;">Project Details</p>
            <p style="margin: 0; color: #222222; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 12px;">
            Sent automatically via MeshWorks contact form. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Message sent successfully.' }),
    }
  } catch (err) {
    console.error('Nodemailer error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Failed to send email.' }),
    }
  }
}
