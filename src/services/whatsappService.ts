
/**
 * WhatsApp API integration service
 * This service handles communication with the WhatsApp Business API
 */

export interface WhatsAppConfig {
  apiKey: string;
  phoneNumberId: string;
  verificationToken: string;
  businessAccountId: string;
}

export interface WhatsAppMessage {
  id: string;
  from: string; // Phone number
  timestamp: string;
  text: string;
}

export interface WhatsAppSendResult {
  messageId: string;
  success: boolean;
  error?: string;
}

class WhatsAppService {
  private config: WhatsAppConfig | null = null;
  
  /**
   * Initialize the WhatsApp service with configuration
   */
  public initialize(config: WhatsAppConfig): void {
    this.config = config;
    console.log("WhatsApp service initialized with phone number ID:", config.phoneNumberId);
  }
  
  /**
   * Verify webhook challenge from WhatsApp API
   */
  public verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (!this.config) {
      console.error("WhatsApp service not initialized");
      return null;
    }
    
    if (mode === 'subscribe' && token === this.config.verificationToken) {
      console.log("Webhook verified");
      return challenge;
    }
    
    console.error("Webhook verification failed");
    return null;
  }
  
  /**
   * Process incoming webhook data from WhatsApp
   */
  public processWebhook(body: any): WhatsAppMessage | null {
    try {
      if (!body.object || body.object !== 'whatsapp_business_account') {
        return null;
      }
      
      const entry = body.entry?.[0];
      if (!entry) return null;
      
      const changes = entry.changes?.[0];
      if (!changes || changes.field !== 'messages') return null;
      
      const value = changes.value;
      const messageData = value.messages?.[0];
      
      if (!messageData || !messageData.from) return null;
      
      return {
        id: messageData.id,
        from: messageData.from,
        timestamp: messageData.timestamp,
        text: messageData.text?.body || ''
      };
    } catch (error) {
      console.error("Error processing webhook:", error);
      return null;
    }
  }
  
  /**
   * Send a message to a WhatsApp user
   */
  public async sendMessage(to: string, text: string): Promise<WhatsAppSendResult> {
    if (!this.config) {
      return { 
        messageId: '', 
        success: false, 
        error: "WhatsApp service not initialized" 
      };
    }
    
    try {
      console.log(`Sending WhatsApp message to ${to}: ${text}`);
      
      // In a real implementation, this would make an API call to WhatsApp
      // For this demo, we'll simulate a successful response
      
      return {
        messageId: `mock_${Date.now()}`,
        success: true
      };
      
      /* Real implementation would look like:
      
      const response = await fetch(
        `https://graph.facebook.com/v17.0/${this.config.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: to,
            type: 'text',
            text: { body: text }
          })
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        return {
          messageId: '',
          success: false,
          error: data.error?.message || 'Unknown error'
        };
      }
      
      return {
        messageId: data.messages[0].id,
        success: true
      };
      */
      
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return {
        messageId: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Send a message to a WhatsApp group
   */
  public async sendToGroup(groupId: string, text: string): Promise<WhatsAppSendResult> {
    // Similar to sendMessage but for groups
    console.log(`Sending message to WhatsApp group ${groupId}: ${text}`);
    
    return {
      messageId: `mock_group_${Date.now()}`,
      success: true
    };
  }
}

// Singleton instance
const whatsAppService = new WhatsAppService();
export default whatsAppService;
