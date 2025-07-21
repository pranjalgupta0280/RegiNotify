const twilio = require('twilio');

class WhatsAppService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  // Format phone number for WhatsApp (ensure it starts with +)
  formatPhoneNumber(phone) {
    let formatted = phone.replace(/\s|-|\(|\)/g, '');
    if (!formatted.startsWith('+')) {
      // Add country code if not present (assuming +1 for demo)
      formatted = '+1' + formatted;
    }
    return `whatsapp:${formatted}`;
  }

  async sendWelcomeMessage(userDetails) {
    try {
      const { name, phone, city, country } = userDetails;
      const formattedPhone = this.formatPhoneNumber(phone);

      const message = `🎉 *Welcome ${name}!*

✅ Your registration was successful!

*Your Details:*
📧 Phone: ${phone}
🏙️ City: ${city}
🌍 Country: ${country}
📅 Date: ${new Date().toLocaleDateString()}

Thank you for joining us! If you have any questions, feel free to reach out to our support team.

Best regards,
The Registration Team`;

      const result = await this.client.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: formattedPhone
      });

      console.log('✅ WhatsApp message sent successfully:', result.sid);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('❌ WhatsApp message sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyConnection() {
    try {
      // Test the connection by fetching account info
      await this.client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
      console.log('✅ WhatsApp service connection verified');
      return true;
    } catch (error) {
      console.error('❌ WhatsApp service connection failed:', error);
      return false;
    }
  }
}

module.exports = new WhatsAppService();
