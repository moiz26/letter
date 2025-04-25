import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from 'nodemailer';
import type { TransportOptions } from 'nodemailer';
import { insertResponseSchema } from "@shared/schema";

// Create reusable transporter object using GMAIL
const createTransporter = () => {
  const transportConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || 'mrukknown967@gmail.com',
      pass: process.env.EMAIL_PASS || 'pukl esaa ojkz kngr'
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  return nodemailer.createTransport(transportConfig);
};

// Create transporter instance for each request to handle serverless environment
const getTransporter = () => {
  const transporter = createTransporter();
  return transporter;
};

// Verify transporter configuration immediately
console.log('Checking email configuration...');
console.log('Environment variables:', {
  EMAIL_USER: process.env.EMAIL_USER || 'Using default',
  EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Using default',
  RECEIVER_EMAIL: process.env.RECEIVER_EMAIL || 'Using default'
});

getTransporter().verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Route to validate user credentials
  app.post('/api/validate', (req, res) => {
    const { name, dob } = req.body;
    
    console.log('Received validation request:', {
      name,
      dob,
      nameMatch: name.toLowerCase() === 'zuibyah' || name.toLowerCase() === 'zubiyah kounain',
      expectedDob: '29-07-2005'
    });

    // Validate name
    if (name.toLowerCase() !== 'zuibyah' && name.toLowerCase() !== 'zubiyah kounain') {
      console.log('Name validation failed:', { provided: name });
      return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Validate date of birth
    if (dob !== '29-07-2005') {
      console.log('DOB validation failed:', { 
        provided: dob,
        expected: '29-07-2005'
      });
      return res.status(400).json({ message: 'Invalid credentials. Please try again.' });
    }

    console.log('Validation successful!');
    res.json({ message: 'success' });
  });

  // Route to submit responses
  app.post('/api/submit-response', async (req, res) => {
    try {
      const validatedData = insertResponseSchema.parse(req.body);
      const response = await storage.createResponse(validatedData);
      
      // Get transporter instance for this request
      const transporter = getTransporter();
      const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;
      
      if (receiverEmail) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: receiverEmail,
          subject: '💌 New Response from Zubiyah',
          text: `
🌟 New Response Received!
──────────────────────

📅 Annual Day Response:
${validatedData.annualDay || 'No response provided'}

💭 Additional Message:
${validatedData.additionalInfo || 'No additional message provided'}

──────────────────────
Received on: ${new Date().toLocaleString()}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h2 style="color: #f857a6; text-align: center; margin-bottom: 30px;">💌 New Response from Zubiyah</h2>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin-bottom: 10px;">📅 Annual Day Response:</h3>
                <p style="color: #555; background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 0;">
                  ${validatedData.annualDay || 'No response provided'}
                </p>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #333; margin-bottom: 10px;">💭 Additional Message:</h3>
                <p style="color: #555; background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 0;">
                  ${validatedData.additionalInfo || 'No additional message provided'}
                </p>
              </div>
              
              <div style="text-align: center; color: #888; font-size: 0.9em; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                Received on: ${new Date().toLocaleString()}
              </div>
            </div>
          `
        };
        
        try {
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Failed to send email:', error);
          // Continue with the response even if email fails
        }
      }
      
      return res.status(200).json({ success: true, id: response.id });
    } catch (error) {
      console.error('Error submitting response:', error);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid response data' 
      });
    }
  });

  // Test route for email
  app.get('/api/test-email', async (req, res) => {
    try {
      const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;
      
      if (!receiverEmail) {
        console.error('No receiver email configured');
        return res.status(500).json({ message: 'Email configuration missing' });
      }

      console.log('Attempting to send test email with config:', {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: '🧪 Test Email from Letter App',
        text: `This is a test email sent at ${new Date().toLocaleString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Test Email from Letter App</h1>
            <p>This is a test email sent at ${new Date().toLocaleString()}</p>
            <p>If you received this email, your email configuration is working correctly!</p>
          </div>
        `
      };

      const info = await getTransporter().sendMail(mailOptions);
      console.log('Test email sent successfully:', info);
      res.json({ 
        message: 'Test email sent successfully',
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
      });
    } catch (error) {
      console.error('Failed to send test email:', error);
      res.status(500).json({ 
        message: 'Failed to send test email', 
        error: error instanceof Error ? error.message : 'Unknown error',
        config: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER ? 'Configured' : 'Missing',
            pass: process.env.EMAIL_PASS ? 'Configured' : 'Missing'
          }
        }
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
