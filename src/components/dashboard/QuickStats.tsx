
import { ArrowUpRight, BarChart, Activity, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function QuickStats() {
  const stats = [
    {
      title: "Posts Published",
      value: "24",
      change: "+14%",
      icon: BarChart,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
    },
    {
      title: "Engagement Rate",
      value: "5.2%",
      change: "+2.1%",
      icon: Activity,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
    },
    {
      title: "Total Followers",
      value: "18.3K",
      change: "+5.4%",
      icon: Users,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-md ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
