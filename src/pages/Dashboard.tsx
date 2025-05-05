
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Settings, Trash2, LogOut, ArrowRightCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { user, accounts, currentAccount, switchAccount, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return navigate('/login');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Manage your WhatsApp AI accounts</p>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-500">{user.role}</Badge>
              <h2 className="text-lg font-medium">{user.name}</h2>
              <span className="text-gray-500">({user.email})</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your WhatsApp Accounts</CardTitle>
                  <CardDescription>
                    Manage and switch between your WhatsApp AI bot accounts
                  </CardDescription>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        New Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <DialogDescription>
                          Set up a new WhatsApp AI bot account
                        </DialogDescription>
                      </DialogHeader>
                      
                      <ScrollArea className="max-h-[60vh]">
                        <div className="p-4 space-y-4">
                          <p>This is where the account creation form would go.</p>
                          <p>In a real application, you would have a full form here to input all the required account details.</p>
                        </div>
                      </ScrollArea>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="button">Create Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map(account => (
                  <Card key={account.id} className={`border ${currentAccount?.id === account.id ? 'border-emerald-400 bg-emerald-50' : ''}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>
                        {account.whatsAppConfig.useBusinessApi ? 'Business API' : 'Regular API'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm truncate">
                        Phone ID: {account.whatsAppConfig.phoneNumberId}
                      </p>
                      <p className="text-sm truncate">
                        Model: {account.aiConfig.model}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Settings className="h-3.5 w-3.5" />
                        Settings
                      </Button>
                      
                      {currentAccount?.id === account.id ? (
                        <Badge className="bg-emerald-500">Current</Badge>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => switchAccount(account.id)}
                        >
                          <ArrowRightCircle className="h-3.5 w-3.5" />
                          Switch
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {accounts.length === 0 && (
                <div className="text-center py-12 px-4">
                  <div className="mb-4 text-gray-400">
                    <PlusCircle className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium">No accounts yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first WhatsApp AI account to get started.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Account</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <DialogDescription>
                          Set up a new WhatsApp AI bot account
                        </DialogDescription>
                      </DialogHeader>
                      
                      <ScrollArea className="max-h-[60vh]">
                        <div className="p-4 space-y-4">
                          <p>This is where the account creation form would go.</p>
                          <p>In a real application, you would have a full form here to input all the required account details.</p>
                        </div>
                      </ScrollArea>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="button">Create Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {currentAccount && (
          <div className="mb-6">
            <Button onClick={() => navigate('/')} className="flex items-center gap-2">
              Open Current Account Dashboard
            </Button>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="text-gray-500">
            <p>Activity data would be displayed here in a real application.</p>
            <p>This could include recent conversations, system notifications, etc.</p>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          WhatsApp Automation Agent &copy; {new Date().getFullYear()} - Multi-tenant Edition
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
