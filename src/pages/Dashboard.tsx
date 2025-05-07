
import QuickStats from "@/components/dashboard/QuickStats";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PlatformPerformance from "@/components/dashboard/PlatformPerformance";
import TrendRecommendations from "@/components/dashboard/TrendRecommendations";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome to your social media management dashboard.</p>
      </div>
      
      <QuickStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingPosts />
        <RecentActivity />
      </div>
      
      <TrendRecommendations />
      
      <PlatformPerformance />
    </div>
  );
}
