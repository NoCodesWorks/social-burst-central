
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const posts = [
  {
    id: 1,
    title: "New Product Launch",
    date: "Today, 9:00 AM",
    platforms: ["facebook", "instagram", "twitter"],
    type: "image",
  },
  {
    id: 2,
    title: "Weekly Tips Video",
    date: "Tomorrow, 12:00 PM",
    platforms: ["youtube", "facebook"],
    type: "video",
  },
  {
    id: 3,
    title: "Customer Testimonial",
    date: "May 9, 10:30 AM",
    platforms: ["instagram", "twitter"],
    type: "image",
  },
];

export default function UpcomingPosts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
        <Calendar size={18} className="text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center space-x-4">
              <div className={cn(
                "h-10 w-10 rounded-md flex items-center justify-center text-white",
                post.type === "image" ? "bg-blue-500" : "bg-red-500"
              )}>
                {post.type === "image" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
              <div className="flex space-x-1">
                {post.platforms.map((platform) => (
                  <Badge 
                    key={platform} 
                    className={cn(
                      "px-2 py-1",
                      platform === "facebook" && "bg-facebook text-white",
                      platform === "instagram" && "bg-instagram text-white",
                      platform === "twitter" && "bg-twitter text-white",
                      platform === "youtube" && "bg-youtube text-white"
                    )}
                  >
                    {platform.charAt(0).toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
