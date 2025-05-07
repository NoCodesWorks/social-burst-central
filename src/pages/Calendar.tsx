
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Sample scheduled posts data
const scheduledPosts = [
  { id: 1, date: "2025-05-07", title: "New Product Launch", platforms: ["instagram", "facebook"] },
  { id: 2, date: "2025-05-10", title: "Weekly Tips", platforms: ["twitter"] },
  { id: 3, date: "2025-05-15", title: "Customer Story", platforms: ["instagram"] },
  { id: 4, date: "2025-05-20", title: "Product Demo", platforms: ["youtube"] },
  { id: 5, date: "2025-05-25", title: "Flash Sale", platforms: ["facebook", "instagram", "twitter"] },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const postsForDay = scheduledPosts.filter(post => post.date === date);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      
      days.push(
        <div 
          key={day} 
          className={cn(
            "h-24 border border-gray-100 p-1 relative",
            isToday && "bg-blue-50"
          )}
        >
          <div className={cn(
            "font-medium text-sm flex items-center justify-center w-6 h-6 mb-1",
            isToday && "bg-primary text-white rounded-full"
          )}>
            {day}
          </div>
          <div className="space-y-1">
            {postsForDay.map(post => (
              <div key={post.id} className="bg-gray-100 rounded px-2 py-1 text-xs truncate">
                {post.title}
              </div>
            ))}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="absolute bottom-1 right-1 w-6 h-6 p-0"
            aria-label="Add new post"
          >
            <Plus size={12} />
          </Button>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-gray-500">Schedule and manage your social media posts.</p>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <CardTitle>Content Calendar</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-0">
            {DAYS.map((day) => (
              <div 
                key={day} 
                className="h-8 flex items-center justify-center font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Scheduled Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledPosts
              .slice(0, 3)
              .map(post => (
                <div key={post.id} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 mr-4">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {post.platforms.map(platform => (
                      <Badge 
                        key={platform}
                        className={cn(
                          platform === "facebook" && "bg-facebook text-white",
                          platform === "instagram" && "bg-instagram text-white",
                          platform === "twitter" && "bg-twitter text-white",
                          platform === "youtube" && "bg-youtube text-white"
                        )}
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
          <Button variant="link" className="mt-4 w-full">View All Scheduled Posts</Button>
        </CardContent>
      </Card>
    </div>
  );
}
