
/**
 * WhatsApp API integration service
 * This service handles communication with both regular WhatsApp API and the WhatsApp Business API
 */

export interface WhatsAppConfig {
  apiKey: string;
  phoneNumberId: string;
  verificationToken: string;
  businessAccountId: string;
  useBusinessApi: boolean; // Flag to determine which API to use
  regularApiEndpoint?: string; // Endpoint for regular WhatsApp API
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
    const apiType = config.useBusinessApi ? "Business API" : "Regular API";
    console.log(`WhatsApp service initialized with ${apiType}. Phone number ID:`, config.phoneNumberId);
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
      if (!this.config) {
        console.error("WhatsApp service not initialized");
        return null;
      }
      
      if (this.config.useBusinessApi) {
        return this.processBusinessWebhook(body);
      } else {
        return this.processRegularWebhook(body);
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
      return null;
    }
  }
  
  private processBusinessWebhook(body: any): WhatsAppMessage | null {
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
  }
  
  private processRegularWebhook(body: any): WhatsAppMessage | null {
    // Process webhook data from regular WhatsApp API
    // Structure may differ from business API
    const messageData = body.messages?.[0];
    
    if (!messageData || !messageData.from) return null;
    
    return {
      id: messageData.id || `reg_${Date.now()}`,
      from: messageData.from,
      timestamp: messageData.timestamp || new Date().toISOString(),
      text: messageData.text || messageData.body || ''
    };
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
      
      if (this.config.useBusinessApi) {
        return this.sendBusinessApiMessage(to, text);
      } else {
        return this.sendRegularApiMessage(to, text);
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return {
        messageId: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  private async sendBusinessApiMessage(to: string, text: string): Promise<WhatsAppSendResult> {
    // For demo/simulation purposes
    return {
      messageId: `mock_business_${Date.now()}`,
      success: true
    };
    
    /* Real implementation would look like:
    
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${this.config!.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config!.apiKey}`
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
  }
  
  private async sendRegularApiMessage(to: string, text: string): Promise<WhatsAppSendResult> {
    // Implementation for regular WhatsApp API
    // For demo/simulation purposes
    return {
      messageId: `mock_regular_${Date.now()}`,
      success: true
    };
    
    /* Real implementation would look like:
    
    if (!this.config?.regularApiEndpoint) {
      return {
        messageId: '',
        success: false,
        error: 'Regular API endpoint not configured'
      };
    }
    
    const response = await fetch(
      this.config.regularApiEndpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          phone: to,
          message: text
        })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        messageId: '',
        success: false,
        error: data.error || 'Unknown error'
      };
    }
    
    return {
      messageId: data.id || `reg_${Date.now()}`,
      success: true
    };
    */
  }
  
  /**
   * Send a message to a WhatsApp group
   */
  public async sendToGroup(groupId: string, text: string): Promise<WhatsAppSendResult> {
    if (!this.config) {
      return { 
        messageId: '', 
        success: false, 
        error: "WhatsApp service not initialized" 
      };
    }
    
    try {
      console.log(`Sending message to WhatsApp group ${groupId}: ${text}`);
      
      // Implementation varies between regular and business API
      if (this.config.useBusinessApi) {
        // Business API group message
        return {
          messageId: `mock_business_group_${Date.now()}`,
          success: true
        };
      } else {
        // Regular API group message
        return {
          messageId: `mock_regular_group_${Date.now()}`,
          success: true
        };
      }
    } catch (error) {
      console.error("Error sending group message:", error);
      return {
        messageId: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Singleton instance
const whatsAppService = new WhatsAppService();
export default whatsAppService;
