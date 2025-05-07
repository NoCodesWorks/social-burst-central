
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const engagementData = [
  {
    name: "Mon",
    facebook: 10,
    instagram: 15,
    twitter: 7,
    youtube: 5,
  },
  {
    name: "Tue",
    facebook: 15,
    instagram: 20,
    twitter: 10,
    youtube: 8,
  },
  {
    name: "Wed",
    facebook: 13,
    instagram: 18,
    twitter: 9,
    youtube: 11,
  },
  {
    name: "Thu",
    facebook: 17,
    instagram: 23,
    twitter: 11,
    youtube: 13,
  },
  {
    name: "Fri",
    facebook: 20,
    instagram: 25,
    twitter: 15,
    youtube: 10,
  },
  {
    name: "Sat",
    facebook: 22,
    instagram: 30,
    twitter: 17,
    youtube: 15,
  },
  {
    name: "Sun",
    facebook: 25,
    instagram: 35,
    twitter: 20,
    youtube: 18,
  },
];

export default function PlatformPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Platform Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="reach">Reach</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="h-[300px]">
            <LineChart
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
              <Line type="monotone" dataKey="facebook" stroke="#1877F2" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="instagram" stroke="#E1306C" />
              <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" />
              <Line type="monotone" dataKey="youtube" stroke="#FF0000" />
            </LineChart>
          </TabsContent>
          <TabsContent value="followers" className="h-[300px]">
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a time range to view followers growth data
            </div>
          </TabsContent>
          <TabsContent value="reach" className="h-[300px]">
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a time range to view reach data
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-facebook mr-2"></div>
            <span className="text-sm">Facebook</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-instagram mr-2"></div>
            <span className="text-sm">Instagram</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-twitter mr-2"></div>
            <span className="text-sm">Twitter</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-youtube mr-2"></div>
            <span className="text-sm">YouTube</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
