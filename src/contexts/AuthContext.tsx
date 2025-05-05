
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Types for our authentication system
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface WhatsAppAccount {
  id: string;
  name: string;
  whatsAppConfig: {
    apiKey: string;
    phoneNumberId: string;
    verificationToken: string;
    businessAccountId: string;
    useBusinessApi: boolean;
    regularApiEndpoint: string;
  };
  aiConfig: {
    model: string;
    temperature: number;
    maxTokens: number;
    businessPrompt: string;
  };
  emailConfig: {
    transcriptEmail: string;
    notificationEmail: string;
  };
  endKeywords: string;
  groupId: string;
}

interface AuthContextProps {
  user: User | null;
  accounts: WhatsAppAccount[];
  currentAccount: WhatsAppAccount | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createAccount: (account: Omit<WhatsAppAccount, 'id'>) => Promise<boolean>;
  switchAccount: (accountId: string) => void;
  updateAccount: (accountId: string, accountData: Partial<WhatsAppAccount>) => Promise<boolean>;
  deleteAccount: (accountId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Demo users for testing - in a real app, this would come from a database
const DEMO_USERS: User[] = [
  { id: '1', email: 'admin@example.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'user@example.com', name: 'Regular User', role: 'user' },
];

// Demo accounts - in a real app, this would come from a database and be per-user
const DEMO_ACCOUNTS: WhatsAppAccount[] = [
  {
    id: '1',
    name: 'Marketing Bot',
    whatsAppConfig: {
      apiKey: 'demo-api-key-1',
      phoneNumberId: '1234567890',
      verificationToken: 'demo-token-1',
      businessAccountId: '1234567890',
      useBusinessApi: true,
      regularApiEndpoint: 'https://api.whatsapp.com/v1/messages'
    },
    aiConfig: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 500,
      businessPrompt: 'You are a helpful marketing assistant.'
    },
    emailConfig: {
      transcriptEmail: 'marketing@example.com',
      notificationEmail: 'alerts@example.com'
    },
    endKeywords: 'thank you,goodbye,end,done',
    groupId: '123456789'
  },
  {
    id: '2',
    name: 'Support Bot',
    whatsAppConfig: {
      apiKey: 'demo-api-key-2',
      phoneNumberId: '0987654321',
      verificationToken: 'demo-token-2',
      businessAccountId: '0987654321',
      useBusinessApi: false,
      regularApiEndpoint: 'https://api.whatsapp.com/v1/messages'
    },
    aiConfig: {
      model: 'gpt-4',
      temperature: 0.5,
      maxTokens: 800,
      businessPrompt: 'You are a helpful customer support assistant.'
    },
    emailConfig: {
      transcriptEmail: 'support@example.com',
      notificationEmail: 'alerts@example.com'
    },
    endKeywords: 'thank you,goodbye,end,done,resolved',
    groupId: '987654321'
  }
];

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<WhatsAppAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if we have a saved session
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('whatsapp_agent_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
          loadUserAccounts(parsedUser.id);
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          localStorage.removeItem('whatsapp_agent_user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const loadUserAccounts = (userId: string) => {
    // In a real app, this would fetch accounts from an API based on the user
    // For demo purposes, we'll use our demo accounts
    setAccounts(DEMO_ACCOUNTS);
    
    // Set the current account to the first one, if available
    if (DEMO_ACCOUNTS.length > 0) {
      setCurrentAccount(DEMO_ACCOUNTS[0]);
      
      // Save current account to localStorage
      localStorage.setItem('whatsapp_current_account', DEMO_ACCOUNTS[0].id);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to validate credentials
      // For demo purposes, we'll check against our demo users
      const foundUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === 'password') { // Simple demo password check
        setUser(foundUser);
        localStorage.setItem('whatsapp_agent_user', JSON.stringify(foundUser));
        loadUserAccounts(foundUser.id);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        navigate('/dashboard');
        return true;
      }
      
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAccounts([]);
    setCurrentAccount(null);
    localStorage.removeItem('whatsapp_agent_user');
    localStorage.removeItem('whatsapp_current_account');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const createAccount = async (account: Omit<WhatsAppAccount, 'id'>): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to create an account
      // For demo purposes, we'll add it to our local state
      const newAccount: WhatsAppAccount = {
        ...account,
        id: Math.random().toString(36).substring(2, 11), // Generate a random ID
      };
      
      setAccounts([...accounts, newAccount]);
      
      // If this is the first account, make it the current one
      if (accounts.length === 0) {
        setCurrentAccount(newAccount);
        localStorage.setItem('whatsapp_current_account', newAccount.id);
      }
      
      toast({
        title: "Account Created",
        description: `${newAccount.name} has been added to your accounts.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Account Creation Failed",
        description: "Failed to create new account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const switchAccount = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    if (account) {
      setCurrentAccount(account);
      localStorage.setItem('whatsapp_current_account', accountId);
      toast({
        title: "Account Switched",
        description: `Now using ${account.name}`,
      });
    }
  };

  const updateAccount = async (accountId: string, accountData: Partial<WhatsAppAccount>): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to update the account
      // For demo purposes, we'll update our local state
      const updatedAccounts = accounts.map(account => {
        if (account.id === accountId) {
          return { ...account, ...accountData };
        }
        return account;
      });
      
      setAccounts(updatedAccounts);
      
      // Update current account if it's the one being modified
      if (currentAccount?.id === accountId) {
        const updatedAccount = updatedAccounts.find(a => a.id === accountId);
        if (updatedAccount) {
          setCurrentAccount(updatedAccount);
        }
      }
      
      toast({
        title: "Account Updated",
        description: "Account settings have been updated successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Error updating account:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update account settings. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteAccount = async (accountId: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to delete the account
      // For demo purposes, we'll update our local state
      const updatedAccounts = accounts.filter(account => account.id !== accountId);
      setAccounts(updatedAccounts);
      
      // If we deleted the current account, switch to another one if available
      if (currentAccount?.id === accountId) {
        if (updatedAccounts.length > 0) {
          setCurrentAccount(updatedAccounts[0]);
          localStorage.setItem('whatsapp_current_account', updatedAccounts[0].id);
        } else {
          setCurrentAccount(null);
          localStorage.removeItem('whatsapp_current_account');
        }
      }
      
      toast({
        title: "Account Deleted",
        description: "The account has been removed successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      accounts,
      currentAccount,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      createAccount,
      switchAccount,
      updateAccount,
      deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  
  return context;
};
