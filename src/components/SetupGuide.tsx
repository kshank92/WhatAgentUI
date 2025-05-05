
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ChevronRight, Terminal, FileCode, MessageSquare, Zap, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const steps = [
  {
    id: 1,
    title: "Create Meta Developer Account",
    description: "Sign up for a Meta for Developers account to access WhatsApp Business API",
    expanded: true,
    completed: false,
    content: (
      <>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to <a href="https://developers.facebook.com" target="_blank" className="text-blue-600 hover:underline">Meta for Developers</a> and create an account</li>
          <li>Create a new app with the "Business" type</li>
          <li>Add the "WhatsApp" product to your app</li>
          <li>Note your App ID and App Secret</li>
        </ol>
        <Alert className="mt-4" variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            You'll need to complete Meta's business verification process to get full API access.
          </AlertDescription>
        </Alert>
      </>
    )
  },
  {
    id: 2,
    title: "Set Up WhatsApp Business Number",
    description: "Connect a phone number to your WhatsApp Business account",
    expanded: false,
    completed: false,
    content: (
      <>
        <ol className="list-decimal pl-5 space-y-2">
          <li>In your Meta Developer dashboard, go to the WhatsApp section</li>
          <li>Follow the steps to add a phone number to your account</li>
          <li>Choose between using an existing number or getting a new one</li>
          <li>Complete the verification process for your number</li>
          <li>Note your Phone Number ID for configuration</li>
        </ol>
      </>
    )
  },
  {
    id: 3,
    title: "Configure Webhooks",
    description: "Set up webhook endpoints to receive incoming messages",
    expanded: false,
    completed: false,
    content: (
      <>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Deploy this application to your server or cloud provider</li>
          <li>In your Meta Developer dashboard, set up a webhook with your endpoint URL:<br />
            <code className="bg-slate-100 px-2 py-1 rounded text-sm">https://your-domain.com/api/whatsapp/webhook</code>
          </li>
          <li>Generate a verification token and add it to your WhatsApp API settings in this app</li>
          <li>Subscribe to message and messaging_postbacks webhook fields</li>
        </ol>
        <div className="mt-4 bg-slate-100 p-3 rounded-md">
          <p className="text-sm font-medium mb-2">Example webhook verification code:</p>
          <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
{`// Verify webhook
app.get('/api/whatsapp/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});`}
          </pre>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "Configure Email Service",
    description: "Set up the email service to send conversation transcripts",
    expanded: false,
    completed: false,
    content: (
      <>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Choose an email service provider (SendGrid, SMTP, etc.)</li>
          <li>Obtain API keys or SMTP credentials</li>
          <li>Add the email configuration to your environment variables</li>
          <li>Test sending a transcript email</li>
        </ol>
        <div className="mt-4 bg-slate-100 p-3 rounded-md">
          <p className="text-sm font-medium mb-2">Example SendGrid configuration:</p>
          <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
{`// Send email using SendGrid
const sendTranscriptEmail = async (recipient, subject, content) => {
  const msg = {
    to: recipient,
    from: 'your-verified-sender@example.com',
    subject: subject,
    text: content,
  };
  
  try {
    await sgMail.send(msg);
    console.log('Transcript email sent');
    return true;
  } catch (error) {
    console.error('Error sending transcript email:', error);
    return false;
  }
};`}
          </pre>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "Set Up AI Integration",
    description: "Connect to OpenAI API for the conversational AI capabilities",
    expanded: false,
    completed: false,
    content: (
      <>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Create an account with OpenAI or your preferred AI provider</li>
          <li>Generate an API key</li>
          <li>Add the API key to your environment variables</li>
          <li>Configure the AI settings in the app</li>
          <li>Test the AI response system</li>
        </ol>
        <Alert className="mt-4" variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Store your API keys securely and never expose them in client-side code.
          </AlertDescription>
        </Alert>
      </>
    )
  }
];

const SetupGuide = () => {
  const [setupSteps, setSetupSteps] = useState(steps);
  
  const toggleExpand = (id: number) => {
    setSetupSteps(setupSteps.map(step => 
      step.id === id ? { ...step, expanded: !step.expanded } : { ...step, expanded: false }
    ));
  };
  
  const markCompleted = (id: number) => {
    setSetupSteps(setupSteps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };
  
  const completedSteps = setupSteps.filter(step => step.completed).length;
  const progress = (completedSteps / setupSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">WhatsApp AI Agent Setup Guide</h2>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-40" />
          <span className="text-sm text-muted-foreground">{completedSteps}/{setupSteps.length} completed</span>
        </div>
      </div>

      <div className="space-y-4">
        {setupSteps.map((step) => (
          <Card key={step.id} className={step.completed ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="p-4 cursor-pointer" onClick={() => toggleExpand(step.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? "bg-green-500 text-white" 
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {step.completed ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${step.expanded ? "rotate-90" : ""}`} />
              </div>
            </CardHeader>
            {step.expanded && (
              <CardContent className="pt-0 pb-4 px-4 ml-11 border-l-2 border-slate-200">
                <div className="text-sm text-muted-foreground mb-4">
                  {step.content}
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant={step.completed ? "outline" : "default"} 
                    onClick={(e) => {
                      e.stopPropagation();
                      markCompleted(step.id);
                    }}
                  >
                    {step.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto flex items-center justify-start gap-2 py-3">
            <FileCode className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">API Documentation</p>
              <p className="text-xs text-muted-foreground">WhatsApp Business API Docs</p>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto flex items-center justify-start gap-2 py-3">
            <MessageSquare className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">Community Forum</p>
              <p className="text-xs text-muted-foreground">Get help from the community</p>
            </div>
          </Button>
          
          <Button variant="outline" className="h-auto flex items-center justify-start gap-2 py-3">
            <Zap className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium">Quick Start Guide</p>
              <p className="text-xs text-muted-foreground">Step-by-step tutorial</p>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupGuide;
