
/**
 * Email service for sending conversation transcripts and notifications
 */

export interface EmailConfig {
  transcriptEmail: string;
  notificationEmail: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPassword?: string;
}

export interface TranscriptData {
  phoneNumber: string;
  userName: string;
  conversationId: string;
  messages: Array<{
    sender: 'user' | 'bot';
    content: string;
    timestamp: string;
  }>;
}

class EmailService {
  private config: EmailConfig | null = null;
  
  /**
   * Initialize the email service with configuration
   */
  public initialize(config: EmailConfig): void {
    this.config = config;
    console.log("Email service initialized for transcript recipient:", config.transcriptEmail);
  }
  
  /**
   * Send a conversation transcript via email
   */
  public async sendTranscript(data: TranscriptData): Promise<boolean> {
    if (!this.config) {
      console.error("Email service not initialized");
      return false;
    }
    
    try {
      console.log(`Sending transcript email for conversation with ${data.phoneNumber}`);
      
      // Format the conversation transcript
      const formattedMessages = data.messages.map(msg => {
        const sender = msg.sender === 'user' ? data.userName : 'AI Assistant';
        return `${msg.timestamp} - ${sender}: ${msg.content}`;
      }).join('\n\n');
      
      const emailContent = `
Conversation Transcript
=======================
User: ${data.userName} (${data.phoneNumber})
Conversation ID: ${data.conversationId}
Date: ${new Date().toLocaleString()}

${formattedMessages}
      `;
      
      // In a real implementation, this would send an actual email
      // For this demo, we'll just log the content
      console.log("Email content:", emailContent);
      console.log(`Would send email to: ${this.config.transcriptEmail}`);
      
      return true;
      
      /* Real implementation would look like:
      
      const transporter = nodemailer.createTransport({
        host: this.config.smtpHost,
        port: this.config.smtpPort,
        secure: this.config.smtpPort === 465,
        auth: {
          user: this.config.smtpUser,
          pass: this.config.smtpPassword
        }
      });
      
      const info = await transporter.sendMail({
        from: this.config.smtpUser,
        to: this.config.transcriptEmail,
        subject: `WhatsApp Conversation Transcript - ${data.userName}`,
        text: emailContent
      });
      
      console.log("Email sent:", info.messageId);
      return true;
      */
      
    } catch (error) {
      console.error("Error sending transcript email:", error);
      return false;
    }
  }
  
  /**
   * Send a system notification via email
   */
  public async sendNotification(subject: string, message: string): Promise<boolean> {
    if (!this.config) {
      console.error("Email service not initialized");
      return false;
    }
    
    console.log(`Sending notification email: ${subject}`);
    console.log(`Would send notification to: ${this.config.notificationEmail}`);
    
    return true;
  }
}

// Singleton instance
const emailService = new EmailService();
export default emailService;
