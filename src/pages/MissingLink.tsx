
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Link2Off, Home, Search, HelpCircle } from "lucide-react";

const MissingLink = () => {
  const location = useLocation();
  
  // Log the missing URL for analytics purposes
  React.useEffect(() => {
    console.error(`404 Error: Path not found: ${location.pathname}`);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="bg-red-50 p-4 rounded-full mb-4 border-2 border-red-200">
              <Link2Off className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
            <p className="mt-3 text-xl text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6 border">
            <p className="text-gray-600 mb-4">
              You tried to access: <span className="font-medium text-gray-900">{location.pathname}</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <Link to="/" className="no-underline">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
              
              <Link to="/dashboard" className="no-underline">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <HelpCircle className="h-4 w-4" />
                Need help? Contact support for assistance.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
              WhatsApp Automation Agent &copy; {new Date().getFullYear()}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MissingLink;
