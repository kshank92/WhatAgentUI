
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, BellRing, User, LogOut, LayoutDashboard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, currentAccount, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <span className="font-bold text-lg">WhatsApp AI Agent</span>
          </div>
          
          {currentAccount && (
            <div className="hidden md:flex items-center">
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-600">{currentAccount.name}</span>
            </div>
          )}
        </div>
        
        {user && (
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2" 
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <BellRing className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                <div className="px-2 py-1.5 text-xs text-gray-500">{user.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
