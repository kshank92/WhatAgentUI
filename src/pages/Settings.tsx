
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Save, Shield, MessageSquare, Key, Mail, User, Settings2 } from "lucide-react";

const Settings = () => {
  const { user, currentAccount } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Check if user is logged in, if not redirect to login
  if (!user) {
    navigate('/login');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Handle form submissions
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveAccount = () => {
    toast({
      title: "Account Updated",
      description: "Your account settings have been saved successfully.",
    });
  };

  const handleSaveWhatsApp = () => {
    toast({
      title: "WhatsApp Settings Updated",
      description: "Your WhatsApp configuration has been saved successfully.",
    });
  };

  const handleSaveAI = () => {
    toast({
      title: "AI Settings Updated",
      description: "Your AI configuration has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500">Configure your account and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                  {currentAccount && (
                    <>
                      <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4" />
                        AI Config
                      </TabsTrigger>
                    </>
                  )}
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue={user.email} disabled />
                          <p className="text-xs text-gray-500">Email address cannot be changed</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Preferences</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select 
                            id="language" 
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                            defaultValue="en"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Time Zone</Label>
                          <select 
                            id="timezone" 
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                            defaultValue="utc"
                          >
                            <option value="utc">UTC</option>
                            <option value="est">Eastern Time (ET)</option>
                            <option value="cst">Central Time (CT)</option>
                            <option value="mst">Mountain Time (MT)</option>
                            <option value="pst">Pacific Time (PT)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="account" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current_password">Current Password</Label>
                          <Input id="current_password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new_password">New Password</Label>
                          <Input id="new_password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm_password">Confirm New Password</Label>
                          <Input id="confirm_password" type="password" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">2FA Status</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Not Enabled
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Key className="h-4 w-4" />
                            Enable 2FA
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveAccount} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
                
                {currentAccount && (
                  <TabsContent value="whatsapp" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">WhatsApp Configuration</h3>
                        <Badge className="bg-emerald-500">{currentAccount.name}</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">API Configuration</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone_number_id">Phone Number ID</Label>
                              <Input 
                                id="phone_number_id" 
                                defaultValue={currentAccount.whatsAppConfig.phoneNumberId} 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="api_key">API Key</Label>
                              <Input id="api_key" type="password" defaultValue="••••••••••••••••" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id="use_business_api" 
                                  className="mr-2" 
                                  defaultChecked={currentAccount.whatsAppConfig.useBusinessApi}
                                />
                                <Label htmlFor="use_business_api">Use Business API</Label>
                              </div>
                              <p className="text-xs text-gray-500">
                                Enable if you're using the WhatsApp Business API
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Webhook Configuration</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="webhook_url">Webhook URL</Label>
                              <Input 
                                id="webhook_url" 
                                defaultValue="https://yourapp.com/api/webhook" 
                                readOnly
                              />
                              <p className="text-xs text-gray-500">
                                Use this URL in your WhatsApp Business API configuration
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="webhook_secret">Webhook Secret</Label>
                              <div className="flex space-x-2">
                                <Input 
                                  id="webhook_secret" 
                                  type="password" 
                                  defaultValue="••••••••••••••••" 
                                  className="flex-1"
                                />
                                <Button variant="outline">Regenerate</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveWhatsApp} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                {currentAccount && (
                  <TabsContent value="ai" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">AI Configuration</h3>
                        <Badge className="bg-emerald-500">{currentAccount.name}</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Model Settings</h4>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="ai_model">AI Model</Label>
                              <select 
                                id="ai_model" 
                                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                                defaultValue={currentAccount.aiConfig.model}
                              >
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                <option value="claude-3">Claude 3</option>
                                <option value="gemini-pro">Gemini Pro</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="temperature">Temperature</Label>
                              <Input 
                                id="temperature" 
                                type="number" 
                                min="0" 
                                max="2" 
                                step="0.1" 
                                defaultValue="0.7" 
                              />
                              <p className="text-xs text-gray-500">
                                Controls randomness (0 = deterministic, 2 = very random)
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="max_tokens">Max Tokens</Label>
                              <Input 
                                id="max_tokens" 
                                type="number" 
                                min="100" 
                                defaultValue="2000" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">System Prompt</h4>
                          <div className="space-y-2">
                            <Label htmlFor="system_prompt">Default System Instructions</Label>
                            <textarea
                              id="system_prompt"
                              rows={6}
                              className="w-full p-3 border border-gray-300 rounded-md"
                              defaultValue="You are a helpful WhatsApp assistant. Be concise and provide accurate information."
                            />
                            <p className="text-xs text-gray-500">
                              This prompt guides the AI's behavior when responding to messages
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSaveAI} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                )}
                
                <TabsContent value="notifications" className="space-y-4">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <div>
                          <input type="checkbox" id="email_notifications" className="w-5 h-5" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">System Alerts</h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications about system status and issues
                          </p>
                        </div>
                        <div>
                          <input type="checkbox" id="system_alerts" className="w-5 h-5" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">New Message Notifications</h4>
                          <p className="text-sm text-gray-500">
                            Receive notifications when new messages arrive
                          </p>
                        </div>
                        <div>
                          <input type="checkbox" id="message_notifications" className="w-5 h-5" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">Marketing Updates</h4>
                          <p className="text-sm text-gray-500">
                            Receive updates about new features and improvements
                          </p>
                        </div>
                        <div>
                          <input type="checkbox" id="marketing_updates" className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          WhatsApp Automation Agent &copy; {new Date().getFullYear()} - Secure Configuration
        </div>
      </footer>
    </div>
  );
};

export default Settings;
