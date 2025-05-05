import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const AISettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 500,
    autoTranscript: true,
    endKeywords: "thank you,goodbye,end,done",
    businessPrompt: "You are a helpful assistant for a business that sells premium software services. Be polite, professional, and helpful. Only answer questions related to our products, services, and business hours. If someone asks about something unrelated, politely redirect them to topics you can help with."
  });

  const [emails, setEmails] = useState({
    transcriptEmail: "admin@example.com",
    notificationEmail: "alerts@example.com"
  });

  const [whatsapp, setWhatsapp] = useState({
    groupId: "123456789",
    apiKey: "your-api-key-here",
    phoneNumberId: "1234567890",
    verificationToken: "verification-token"
  });

  const handleSettingChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEmailChange = (key: string, value: string) => {
    setEmails(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWhatsAppChange = (key: string, value: string) => {
    setWhatsapp(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveChanges = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const testConnection = () => {
    toast({
      title: "Connection Tested",
      description: "WhatsApp API connection successful!",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI & System Settings</h2>
      
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-1/2">
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
              <CardDescription>Configure how the AI responds to WhatsApp messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="ai-model">AI Model</Label>
                  <Select 
                    value={settings.model}
                    onValueChange={value => handleSettingChange("model", value)}
                  >
                    <SelectTrigger id="ai-model" className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Temperature (Creativity)</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      value={[settings.temperature]} 
                      min={0} 
                      max={1} 
                      step={0.1} 
                      onValueChange={([value]) => handleSettingChange("temperature", value)}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{settings.temperature}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="max-tokens">Max Response Tokens</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    value={[settings.maxTokens]} 
                    min={100} 
                    max={2000} 
                    step={50} 
                    onValueChange={([value]) => handleSettingChange("maxTokens", value)}
                    className="flex-1"
                  />
                  <span className="w-20 text-center">{settings.maxTokens}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="business-prompt">Business Context Prompt</Label>
                <Textarea 
                  id="business-prompt" 
                  className="h-36"
                  value={settings.businessPrompt}
                  onChange={(e) => handleSettingChange("businessPrompt", e.target.value)}
                  placeholder="Enter the context about your business to help the AI provide relevant responses..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This prompt defines how the AI responds and what business information it knows.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="end-keywords">Conversation End Keywords</Label>
                <Input 
                  id="end-keywords" 
                  value={settings.endKeywords}
                  onChange={(e) => handleSettingChange("endKeywords", e.target.value)}
                  placeholder="thank you,goodbye,end,done"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated list of words that trigger conversation end and transcript sending
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-transcript">Automatic Transcript Sharing</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically send conversation transcripts when a chat ends
                  </p>
                </div>
                <Switch 
                  id="auto-transcript" 
                  checked={settings.autoTranscript}
                  onCheckedChange={(checked) => handleSettingChange("autoTranscript", checked)}
                />
              </div>
              
              <Button onClick={() => saveChanges("AI")} className="w-full">Save AI Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Set up email recipients for transcripts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="transcript-email">Transcript Email Recipients</Label>
                <Input 
                  id="transcript-email" 
                  value={emails.transcriptEmail}
                  onChange={(e) => handleEmailChange("transcriptEmail", e.target.value)}
                  placeholder="admin@example.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email addresses to receive conversation transcripts (comma-separated for multiple)
                </p>
              </div>
              
              <div>
                <Label htmlFor="notification-email">System Notification Recipients</Label>
                <Input 
                  id="notification-email" 
                  value={emails.notificationEmail}
                  onChange={(e) => handleEmailChange("notificationEmail", e.target.value)}
                  placeholder="alerts@example.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email addresses to receive system notifications and alerts
                </p>
              </div>
              
              <Button onClick={() => saveChanges("Email")} className="w-full">Save Email Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatsapp" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business API Configuration</CardTitle>
              <CardDescription>Configure WhatsApp API connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="api-key">WhatsApp API Key</Label>
                <Input 
                  id="api-key" 
                  type="password"
                  value={whatsapp.apiKey}
                  onChange={(e) => handleWhatsAppChange("apiKey", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="phone-number-id">Phone Number ID</Label>
                <Input 
                  id="phone-number-id" 
                  value={whatsapp.phoneNumberId}
                  onChange={(e) => handleWhatsAppChange("phoneNumberId", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="verification-token">Verification Token</Label>
                <Input 
                  id="verification-token" 
                  value={whatsapp.verificationToken}
                  onChange={(e) => handleWhatsAppChange("verificationToken", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="group-id">Transcript Group ID</Label>
                <Input 
                  id="group-id" 
                  value={whatsapp.groupId}
                  onChange={(e) => handleWhatsAppChange("groupId", e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ID of the WhatsApp group to receive conversation transcripts
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={() => testConnection()} variant="outline" className="flex-1">
                  Test Connection
                </Button>
                <Button onClick={() => saveChanges("WhatsApp API")} className="flex-1">
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISettings;
