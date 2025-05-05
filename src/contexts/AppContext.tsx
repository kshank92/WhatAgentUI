
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import whatsAppService, { WhatsAppConfig } from '@/services/whatsappService';
import aiService, { AIConfig } from '@/services/aiService';
import emailService, { EmailConfig } from '@/services/emailService';
import conversationService from '@/services/conversationService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
  const { currentAccount } = useAuth();

  // Initialize services when current account changes
  useEffect(() => {
    if (currentAccount) {
      initializeServices(
        currentAccount.whatsAppConfig,
        currentAccount.aiConfig,
        currentAccount.emailConfig,
        currentAccount.endKeywords,
        currentAccount.groupId
      );
    } else {
      setInitialized(false);
    }
  }, [currentAccount]);

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
