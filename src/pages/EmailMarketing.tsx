
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Mail, Plus, Users } from "lucide-react";
import supabase from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import EmailLists from "@/components/email/EmailLists";
import EmailCampaigns from "@/components/email/EmailCampaigns";
import { toast } from "sonner";

export default function EmailMarketing() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    totalCampaigns: 0,
    totalLists: 0,
    openRate: 0,
    clickRate: 0
  });

  useEffect(() => {
    const fetchEmailStats = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get total subscribers count
        const { count: subscriberCount, error: subError } = await supabase
          .from('subscribers')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'subscribed');
          
        if (subError) throw subError;
        
        // Get total campaigns
        const { count: campaignCount, error: campError } = await supabase
          .from('email_campaigns')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (campError) throw campError;
        
        // Get total lists
        const { count: listCount, error: listError } = await supabase
          .from('email_lists')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (listError) throw listError;

        // For now, use placeholder values for rates
        // In a real app, these would be calculated from actual email performance data
        
        setStats({
          totalSubscribers: subscriberCount || 0,
          totalCampaigns: campaignCount || 0,
          totalLists: listCount || 0,
          openRate: 28.4, // Placeholder
          clickRate: 4.2   // Placeholder
        });
      } catch (error) {
        console.error("Error fetching email stats:", error);
        toast.error("Failed to load email marketing statistics");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmailStats();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Marketing</h1>
          <p className="text-gray-500">Create and manage email campaigns and subscriber lists.</p>
        </div>
        <Link to="/email-campaign">
          <Button className="gap-2">
            <Plus size={16} />
            <span>Create Campaign</span>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">{stats.totalSubscribers}</h2>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">{stats.totalCampaigns}</h2>
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Lists</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">{stats.totalLists}</h2>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Open Rate</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">{stats.openRate}%</h2>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Click Rate</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold">{stats.clickRate}%</h2>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="lists">Lists</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <EmailCampaigns userId={user?.id} />
        </TabsContent>
        <TabsContent value="lists">
          <EmailLists userId={user?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
