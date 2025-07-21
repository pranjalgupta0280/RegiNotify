const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }

  async sendWelcomeEmail(userDetails) {
    try {
      const { name, email, city, country } = userDetails;
      
      const mailOptions = {
        from: `"User Registration System" <${process.env.GMAIL_EMAIL}>`,
        to: email,
        subject: '🎉 Welcome! Registration Successful',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
              <h1>Welcome ${name}! 🎉</h1>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
              <h2>Registration Successful!</h2>
              <p>Thank you for registering with us. Here are your details:</p>
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>📧 Email:</strong> ${email}</p>
                <p><strong>🏙️ City:</strong> ${city}</p>
                <p><strong>🌍 Country:</strong> ${country}</p>
                <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <p>If you have any questions, feel free to contact our support team.</p>
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #666;">Best regards,<br>The Registration Team</p>
              </div>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Email service connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email service connection failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();