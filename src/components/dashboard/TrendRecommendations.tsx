
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Simulated trend data - in a real app, this would come from an API
const trendRecommendations = [
  {
    id: 1,
    title: "Video content performs 3x better",
    description: "Your video posts receive 3x more engagement than image posts. Consider creating more video content.",
    action: "Create video post",
    path: "/create"
  },
  {
    id: 2,
    title: "Optimal posting time: 6-8 PM",
    description: "Posts published between 6-8 PM receive 40% more engagement. Consider scheduling your next posts during this timeframe.",
    action: "View calendar",
    path: "/calendar"
  },
  {
    id: 3,
    title: "Hashtag performance",
    description: "Posts with 5-7 hashtags perform better than those with more or fewer hashtags.",
    action: "Learn more",
    path: "/analytics"
  }
];

export default function TrendRecommendations() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend-Based Recommendations</CardTitle>
        <CardDescription>
          Personalized recommendations based on your performance analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-base mb-1">{recommendation.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{recommendation.description}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto flex items-center text-primary"
                onClick={() => navigate(recommendation.path)}
              >
                {recommendation.action} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
