
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Home,
  BarChart2,
  Settings,
  PlusCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
}

export default function Sidebar({ isMobile, isOpen }: SidebarProps) {
  const location = useLocation();

  const primaryNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
    { name: "Email Marketing", path: "/email-marketing", icon: Mail },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  if (!isOpen && isMobile) return null;

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        isMobile ? "fixed inset-y-0 left-0 z-40 w-64" : "w-64 h-[calc(100vh-60px)] sticky top-[60px]",
        !isOpen && !isMobile && "w-16"
      )}
    >
      <div className="p-4">
        <Button className="w-full gap-2 bg-primary hover:bg-primary/90" asChild>
          <Link to="/create">
            <PlusCircle size={18} />
            {(isOpen || !isMobile) && <span>Create Post</span>}
          </Link>
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {primaryNavItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-colors",
              location.pathname === item.path 
                ? "bg-primary/10 text-primary" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {(isOpen || !isMobile) && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <h3 className={cn("text-xs text-gray-500 mb-2", !isOpen && !isMobile && "sr-only")}>
          Connected Platforms
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="icon" className="bg-facebook/10 border-facebook/20 text-facebook hover:bg-facebook/20">
            <Facebook size={20} />
          </Button>
          <Button variant="outline" size="icon" className="bg-instagram/10 border-instagram/20 text-instagram hover:bg-instagram/20">
            <Instagram size={20} />
          </Button>
          <Button variant="outline" size="icon" className="bg-twitter/10 border-twitter/20 text-twitter hover:bg-twitter/20">
            <Twitter size={20} />
          </Button>
          <Button variant="outline" size="icon" className="bg-youtube/10 border-youtube/20 text-youtube hover:bg-youtube/20">
            <Youtube size={20} />
          </Button>
          {(isOpen || !isMobile) && (
            <Button variant="ghost" size="icon">
              <PlusCircle size={20} className="text-gray-400" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
