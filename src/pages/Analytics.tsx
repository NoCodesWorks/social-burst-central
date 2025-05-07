
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Sample data for analytics
const engagementData = [
  { name: "Week 1", facebook: 120, instagram: 150, twitter: 80, youtube: 90 },
  { name: "Week 2", facebook: 140, instagram: 160, twitter: 90, youtube: 100 },
  { name: "Week 3", facebook: 150, instagram: 180, twitter: 100, youtube: 120 },
  { name: "Week 4", facebook: 180, instagram: 220, twitter: 110, youtube: 150 },
];

const followerData = [
  { name: "Jan", facebook: 1200, instagram: 1500, twitter: 800, youtube: 900 },
  { name: "Feb", facebook: 1400, instagram: 1600, twitter: 900, youtube: 1000 },
  { name: "Mar", facebook: 1500, instagram: 1800, twitter: 1000, youtube: 1200 },
  { name: "Apr", facebook: 1800, instagram: 2200, twitter: 1100, youtube: 1500 },
  { name: "May", facebook: 2000, instagram: 2500, twitter: 1300, youtube: 1800 },
];

const postTypeData = [
  { name: "Image", value: 50 },
  { name: "Video", value: 30 },
  { name: "Text", value: 15 },
  { name: "Link", value: 5 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-gray-500">Track your social media performance across platforms.</p>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Time Range:</span>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Followers</p>
              <p className="text-3xl font-bold mt-1">24.5K</p>
              <p className="text-sm text-green-500 mt-1">+12.5% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
              <p className="text-3xl font-bold mt-1">4.8%</p>
              <p className="text-sm text-green-500 mt-1">+2.1% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Posts Published</p>
              <p className="text-3xl font-bold mt-1">42</p>
              <p className="text-sm text-green-500 mt-1">+8 from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Avg. Reach</p>
              <p className="text-3xl font-bold mt-1">2.3K</p>
              <p className="text-sm text-green-500 mt-1">+15.2% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Platform</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart
              width={500}
              height={300}
              data={engagementData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="facebook" fill="#1877F2" />
              <Bar dataKey="instagram" fill="#E1306C" />
              <Bar dataKey="twitter" fill="#1DA1F2" />
              <Bar dataKey="youtube" fill="#FF0000" />
            </BarChart>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Followers Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <AreaChart
              width={500}
              height={300}
              data={followerData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="instagram" stackId="1" stroke="#E1306C" fill="#E1306C" />
              <Area type="monotone" dataKey="facebook" stackId="1" stroke="#1877F2" fill="#1877F2" />
              <Area type="monotone" dataKey="twitter" stackId="1" stroke="#1DA1F2" fill="#1DA1F2" />
              <Area type="monotone" dataKey="youtube" stackId="1" stroke="#FF0000" fill="#FF0000" />
            </AreaChart>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Types Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={postTypeData}
                cx={150}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {postTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8B5CF6', '#3B82F6', '#EC4899', '#10B981'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Best Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium">Summer Collection Preview</h3>
                  <p className="text-sm text-gray-500">Instagram • Image Post</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">4,320</p>
                  <p className="text-sm text-gray-500">Engagements</p>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium">Product Demo Video</h3>
                  <p className="text-sm text-gray-500">YouTube • Video Post</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3,845</p>
                  <p className="text-sm text-gray-500">Engagements</p>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium">Customer Story Feature</h3>
                  <p className="text-sm text-gray-500">Facebook • Image Post</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3,210</p>
                  <p className="text-sm text-gray-500">Engagements</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Industry News Update</h3>
                  <p className="text-sm text-gray-500">Twitter • Text Post</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2,780</p>
                  <p className="text-sm text-gray-500">Engagements</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
