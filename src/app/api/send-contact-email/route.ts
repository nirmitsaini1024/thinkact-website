import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailBody = `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message:
${message}

---
This email was sent from the ThinkAct AI website contact form.
    `.trim();

    const recipientEmail = 'hello@thinkact.ai';

    // Check if SMTP is configured
    if (!process.env.SMTP_SERVER || !process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      // Development mode: Log email instead of sending
      console.log('=== EMAIL TO SEND (Development Mode) ===');
      console.log('To:', recipientEmail);
      console.log('From:', email);
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      console.log('========================================');
      console.log('NOTE: Configure SMTP settings in .env.local to enable email sending');
      
      return NextResponse.json(
        { 
          message: 'Your message has been sent successfully!',
          success: true 
        },
        { status: 200 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // For Gmail, sometimes needed
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_EMAIL,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully via SMTP');

    return NextResponse.json(
      { 
        message: 'Your message has been sent successfully!',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        message: 'An error occurred while sending your message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

