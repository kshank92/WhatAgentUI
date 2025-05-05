
/**
 * Conversation management service
 * Handles active conversations, state management, and transcript generation
 */

import whatsAppService from './whatsappService';
import aiService from './aiService';
import emailService from './emailService';

export interface Conversation {
  id: string;
  phoneNumber: string;
  userName: string;
  status: 'active' | 'completed';
  lastActivity: Date;
  messages: Array<{
    id: string;
    sender: 'user' | 'bot';
    content: string;
    timestamp: string;
  }>;
}

class ConversationService {
  private conversations: Map<string, Conversation> = new Map();
  private endKeywords: string = "thank you,goodbye,end,done";
  private groupId: string = "";
  
  /**
   * Configure the conversation service
   */
  public configure(endKeywords: string, groupId: string): void {
    this.endKeywords = endKeywords;
    this.groupId = groupId;
    console.log("Conversation service configured with end keywords:", endKeywords);
  }
  
  /**
   * Get all active conversations
   */
  public getConversations(): Conversation[] {
    return Array.from(this.conversations.values());
  }
  
  /**
   * Get a specific conversation by ID
   */
  public getConversation(id: string): Conversation | undefined {
    return this.conversations.get(id);
  }
  
  /**
   * Process a new incoming message
   */
  public async processMessage(phoneNumber: string, message: string): Promise<string> {
    console.log(`Processing message from ${phoneNumber}: ${message}`);
    
    // Find or create a conversation for this user
    let conversation = this.getConversationByPhone(phoneNumber);
    
    if (!conversation) {
      // Create a new conversation
      conversation = this.createConversation(phoneNumber);
    }
    
    // Add the user message to the conversation
    this.addMessage(conversation.id, 'user', message);
    
    // Check if this is an end message
    if (aiService.isConversationEnd(message, this.endKeywords)) {
      return this.endConversation(conversation.id);
    }
    
    // Generate AI response
    const conversationHistory = conversation.messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
    
    const response = await aiService.generateResponse(message, conversationHistory);
    
    // Add the AI response to the conversation
    this.addMessage(conversation.id, 'bot', response);
    
    // Send the response via WhatsApp
    await whatsAppService.sendMessage(phoneNumber, response);
    
    return response;
  }
  
  /**
   * End a conversation and send transcripts
   */
  public async endConversation(conversationId: string): Promise<string> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      return "Conversation not found";
    }
    
    // Mark as completed
    conversation.status = 'completed';
    
    // Generate a goodbye message
    const goodbyeMessage = "Thank you for contacting us! Your conversation has ended. We'll send you a transcript shortly.";
    
    // Add the goodbye message
    this.addMessage(conversationId, 'bot', goodbyeMessage);
    
    // Send goodbye message via WhatsApp
    await whatsAppService.sendMessage(conversation.phoneNumber, goodbyeMessage);
    
    // Generate and send transcript
    await this.sendTranscripts(conversation);
    
    return goodbyeMessage;
  }
  
  /**
   * Create a new conversation
   */
  private createConversation(phoneNumber: string): Conversation {
    const id = `conv_${Date.now()}`;
    
    const conversation: Conversation = {
      id,
      phoneNumber,
      userName: `User (${phoneNumber.substring(phoneNumber.length - 4)})`, // Basic name
      status: 'active',
      lastActivity: new Date(),
      messages: []
    };
    
    this.conversations.set(id, conversation);
    console.log(`New conversation created for ${phoneNumber} with ID ${id}`);
    return conversation;
  }
  
  /**
   * Find a conversation by phone number
   */
  private getConversationByPhone(phoneNumber: string): Conversation | undefined {
    for (const conversation of this.conversations.values()) {
      if (conversation.phoneNumber === phoneNumber && conversation.status === 'active') {
        return conversation;
      }
    }
    return undefined;
  }
  
  /**
   * Add a message to a conversation
   */
  private addMessage(conversationId: string, sender: 'user' | 'bot', content: string): void {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return;
    
    const message = {
      id: `msg_${Date.now()}`,
      sender,
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    
    conversation.messages.push(message);
    conversation.lastActivity = new Date();
  }
  
  /**
   * Send conversation transcripts (both email and WhatsApp)
   */
  private async sendTranscripts(conversation: Conversation): Promise<void> {
    // Format transcript for WhatsApp
    const whatsAppTranscript = this.formatWhatsAppTranscript(conversation);
    
    // Send to WhatsApp group if configured
    if (this.groupId) {
      await whatsAppService.sendToGroup(this.groupId, whatsAppTranscript);
    }
    
    // Send email transcript
    await emailService.sendTranscript({
      phoneNumber: conversation.phoneNumber,
      userName: conversation.userName,
      conversationId: conversation.id,
      messages: conversation.messages
    });
  }
  
  /**
   * Format a transcript for WhatsApp
   */
  private formatWhatsAppTranscript(conversation: Conversation): string {
    const header = `*Conversation Transcript*\nUser: ${conversation.userName}\nPhone: ${conversation.phoneNumber}\nDate: ${new Date().toLocaleString()}\n\n`;
    
    const messages = conversation.messages.map(msg => {
      const sender = msg.sender === 'user' ? conversation.userName : 'AI Assistant';
      return `*${sender} (${msg.timestamp})*:\n${msg.content}`;
    }).join('\n\n');
    
    return header + messages;
  }
}

// Singleton instance
const conversationService = new ConversationService();
export default conversationService;
