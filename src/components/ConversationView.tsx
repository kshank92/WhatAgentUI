
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, MoreVertical } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const mockConversations = [
  {
    id: "1",
    phoneNumber: "+1 555-123-4567",
    name: "John Smith",
    lastMessage: "I need information about your services",
    timestamp: "10:30 AM",
    unread: true,
    status: "active",
    messages: [
      { id: "m1", sender: "user", content: "Hello, I need information about your services.", time: "10:25 AM" },
      { id: "m2", sender: "bot", content: "Hi there! I'd be happy to help. What specific services are you interested in?", time: "10:26 AM" },
      { id: "m3", sender: "user", content: "I'm looking for pricing on your premium package.", time: "10:28 AM" },
      { id: "m4", sender: "bot", content: "Our premium package starts at $99/month and includes 24/7 support, advanced analytics, and priority service. Would you like me to send you a detailed brochure?", time: "10:30 AM" }
    ]
  },
  {
    id: "2",
    phoneNumber: "+1 555-987-6543",
    name: "Sarah Johnson",
    lastMessage: "Thanks for your help!",
    timestamp: "Yesterday",
    unread: false,
    status: "completed",
    messages: [
      { id: "m1", sender: "user", content: "Hi, I have a question about my recent order #45789", time: "Yesterday, 3:15 PM" },
      { id: "m2", sender: "bot", content: "Hello Sarah! I'd be happy to help with your order. Let me look that up for you.", time: "Yesterday, 3:16 PM" },
      { id: "m3", sender: "bot", content: "I see your order was shipped yesterday and should arrive by Friday. Is there anything specific you'd like to know?", time: "Yesterday, 3:17 PM" },
      { id: "m4", sender: "user", content: "That's perfect, thank you for checking!", time: "Yesterday, 3:20 PM" },
      { id: "m5", sender: "bot", content: "You're welcome! Is there anything else I can help you with today?", time: "Yesterday, 3:21 PM" },
      { id: "m6", sender: "user", content: "No, that's all. Thanks for your help!", time: "Yesterday, 3:25 PM" }
    ]
  },
  {
    id: "3",
    phoneNumber: "+1 555-555-5555",
    name: "Michael Brown",
    lastMessage: "When will my order arrive?",
    timestamp: "Yesterday",
    unread: false,
    status: "active",
    messages: [
      { id: "m1", sender: "user", content: "Hello, I placed order #34567 last week and I'm wondering when it will arrive?", time: "Yesterday, 2:10 PM" },
      { id: "m2", sender: "bot", content: "Hi Michael, let me check that for you right away.", time: "Yesterday, 2:12 PM" },
      { id: "m3", sender: "bot", content: "Your order is currently in transit and scheduled to be delivered tomorrow between 9 AM and 5 PM. You should receive a notification with a more specific time window soon.", time: "Yesterday, 2:14 PM" },
      { id: "m4", sender: "user", content: "When will my order arrive?", time: "Yesterday, 4:30 PM" }
    ]
  }
];

const ConversationView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredConversations = mockConversations.filter(convo => {
    const matchesSearch = convo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          convo.phoneNumber.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || convo.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <div className="md:col-span-1 border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-slate-50">
          <div className="flex items-center gap-2 mb-3">
            <Input 
              placeholder="Search conversations..." 
              className="h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="all" className="w-full" onValueChange={setFilterStatus}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-380px)]">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id} 
                className={`p-3 hover:bg-slate-50 cursor-pointer ${selectedConversation.id === conversation.id ? 'bg-slate-50' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{conversation.name}</div>
                      <div className="text-xs text-muted-foreground">{conversation.timestamp}</div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{conversation.phoneNumber}</div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-sm truncate">{conversation.lastMessage}</div>
                      <div className="flex items-center">
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <Badge variant={conversation.status === "active" ? "default" : "secondary"} className="ml-2 text-xs">
                          {conversation.status === "active" ? "Active" : "Completed"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="md:col-span-2">
        {selectedConversation ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b px-4 py-3 flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                  <CardDescription>{selectedConversation.phoneNumber}</CardDescription>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Send Transcript</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">End Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="p-0 flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-slate-100 text-slate-900' 
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <div>{message.content}</div>
                        <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-slate-500' : 'text-blue-100'}`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4 bg-slate-50">
                {selectedConversation.status === "active" ? (
                  <div className="flex items-center gap-2">
                    <Input placeholder="Type your response..." className="flex-1" />
                    <Button>Send</Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    This conversation has ended
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <p className="text-muted-foreground">Select a conversation to view</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConversationView;
