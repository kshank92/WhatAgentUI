
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import whatsAppService, { WhatsAppConfig } from '@/services/whatsappService';
import aiService, { AIConfig } from '@/services/aiService';
import emailService, { EmailConfig } from '@/services/emailService';
import conversationService from '@/services/conversationService';
import { useToast } from '@/components/ui/use-toast';

interface AppContextProps {
  initialized: boolean;
  agentActive: boolean;
  setAgentActive: (active: boolean) => void;
  initializeServices: (
    whatsAppConfig: WhatsAppConfig, 
    aiConfig: AIConfig, 
    emailConfig: EmailConfig,
    endKeywords: string,
    groupId: string
  ) => void;
  processTestMessage: (phoneNumber: string, message: string) => Promise<string>;
  loading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [agentActive, setAgentActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize with default values on first load
  useEffect(() => {
    if (!initialized) {
      // Set default values for demonstration purposes
      const whatsAppConfig: WhatsAppConfig = {
        apiKey: 'demo-api-key',
        phoneNumberId: '1234567890',
        verificationToken: 'demo-token',
        businessAccountId: '1234567890',
        useBusinessApi: true, // Default to business API
        regularApiEndpoint: 'https://api.whatsapp.com/v1/messages' // Example endpoint
      };
      
      const aiConfig: AIConfig = {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 500,
        businessPrompt: 'You are a helpful assistant for a business that sells premium software services.'
      };
      
      const emailConfig: EmailConfig = {
        transcriptEmail: 'admin@example.com',
        notificationEmail: 'alerts@example.com'
      };
      
      initializeServices(
        whatsAppConfig,
        aiConfig,
        emailConfig,
        'thank you,goodbye,end,done',
        '123456789'
      );
    }
  }, [initialized]);

  const initializeServices = (
    whatsAppConfig: WhatsAppConfig, 
    aiConfig: AIConfig, 
    emailConfig: EmailConfig,
    endKeywords: string,
    groupId: string
  ) => {
    try {
      whatsAppService.initialize(whatsAppConfig);
      aiService.initialize(aiConfig);
      emailService.initialize(emailConfig);
      conversationService.configure(endKeywords, groupId);
      
      setInitialized(true);
      toast({
        title: "Services Initialized",
        description: "All services have been successfully configured.",
      });
    } catch (error) {
      console.error("Error initializing services:", error);
      toast({
        title: "Initialization Failed",
        description: "There was an error configuring the services.",
        variant: "destructive",
      });
    }
  };

  const processTestMessage = async (phoneNumber: string, message: string): Promise<string> => {
    setLoading(true);
    try {
      if (!agentActive) {
        return "Agent is currently inactive. Please activate it first.";
      }
      
      const response = await conversationService.processMessage(phoneNumber, message);
      return response;
    } catch (error) {
      console.error("Error processing test message:", error);
      return "Error processing message";
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ 
      initialized, 
      agentActive, 
      setAgentActive, 
      initializeServices,
      processTestMessage,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  
  return context;
};
