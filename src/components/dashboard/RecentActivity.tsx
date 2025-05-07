
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    action: "Post Published",
    details: "Product showcase image on Instagram",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Post Scheduled",
    details: "Weekly team update on Facebook",
    time: "5 hours ago",
  },
  {
    id: 3,
    action: "Analytics Report",
    details: "April monthly report is ready",
    time: "Yesterday",
  },
  {
    id: 4,
    action: "New Comment",
    details: "Jane commented on your latest post",
    time: "2 days ago",
  },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        <Clock size={18} className="text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-6 pb-4 border-l border-gray-200 last:pb-0">
              <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary" />
              <h3 className="font-medium">{activity.action}</h3>
              <p className="text-sm text-gray-600">{activity.details}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
