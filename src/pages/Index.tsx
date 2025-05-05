
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Dashboard from "@/components/Dashboard";
import SetupGuide from "@/components/SetupGuide";
import ConversationView from "@/components/ConversationView";
import AISettings from "@/components/AISettings";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const { currentAccount } = useAuth();
  const navigate = useNavigate();

  const handleStatusCheck = () => {
    toast({
      title: "System Status",
      description: "All systems operational. WhatsApp API connected.",
    });
  };

  if (!currentAccount) {
    // Redirect to dashboard to select an account if none is selected
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>WhatsApp AI Agent</CardTitle>
                  <CardDescription>
                    Managing your automated WhatsApp conversations for <strong>{currentAccount.name}</strong>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    System Online
                  </Badge>
                  <Button size="sm" onClick={handleStatusCheck}>
                    Check Status
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start px-6 border-b rounded-none">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                  <TabsTrigger value="settings">AI Settings</TabsTrigger>
                  <TabsTrigger value="setup">Setup Guide</TabsTrigger>
                </TabsList>
                
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <TabsContent value="dashboard" className="p-6">
                    <Dashboard />
                  </TabsContent>
                  
                  <TabsContent value="conversations" className="p-6">
                    <ConversationView />
                  </TabsContent>
                  
                  <TabsContent value="settings" className="p-6">
                    <AISettings />
                  </TabsContent>

                  <TabsContent value="setup" className="p-6">
                    <SetupGuide />
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          WhatsApp Automation Agent &copy; {new Date().getFullYear()} - Secure Conversations
        </div>
      </footer>
    </div>
  );
};

export default Index;
