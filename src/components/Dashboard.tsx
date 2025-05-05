
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { MessageSquare, Users, Mail, Clock, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const mockData = [
  { name: "Mon", conversations: 4 },
  { name: "Tue", conversations: 7 },
  { name: "Wed", conversations: 5 },
  { name: "Thu", conversations: 6 },
  { name: "Fri", conversations: 8 },
  { name: "Sat", conversations: 3 },
  { name: "Sun", conversations: 2 }
];

const Dashboard = () => {
  const [agentActive, setAgentActive] = useState(true);
  const { toast } = useToast();

  const handleAgentToggle = (checked: boolean) => {
    setAgentActive(checked);
    toast({
      title: checked ? "Agent Activated" : "Agent Deactivated",
      description: checked 
        ? "The WhatsApp AI agent is now responding to messages." 
        : "The WhatsApp AI agent is now offline.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">AI Agent:</span>
          <Switch checked={agentActive} onCheckedChange={handleAgentToggle} />
          <Badge variant={agentActive ? "default" : "secondary"}>
            {agentActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-2xl font-bold">24</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transcripts Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">18</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">1.8s</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversation Analytics</CardTitle>
          <CardDescription>Weekly conversation volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="#4f46e5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <CardDescription>System activity from the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New conversation started</p>
                    <p className="text-sm text-muted-foreground">From: +1 555-123-4567</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Transcript sent</p>
                    <p className="text-sm text-muted-foreground">To: admin@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">3h ago</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Zap className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">AI model updated</p>
                    <p className="text-sm text-muted-foreground">System maintenance</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">6h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                <MessageSquare className="h-5 w-5 mb-1" />
                <span>Start Test Conversation</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                <Users className="h-5 w-5 mb-1" />
                <span>View All Users</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                <Mail className="h-5 w-5 mb-1" />
                <span>Email Settings</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center" variant="outline">
                <Zap className="h-5 w-5 mb-1" />
                <span>Knowledge Base</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
