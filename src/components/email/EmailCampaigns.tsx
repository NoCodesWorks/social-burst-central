
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Edit, Trash, Send } from "lucide-react";
import supabase from "@/lib/supabase";
import { format } from "date-fns";
import { toast } from "sonner";

interface EmailCampaignsProps {
  userId: string | undefined;
}

export default function EmailCampaigns({ userId }: EmailCampaignsProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!userId) return;
    
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('email_campaigns')
          .select('*, email_lists(*)')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error("Error fetching email campaigns:", error);
        toast.error("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, [userId]);
  
  const handleDeleteCampaign = async (campaignId: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('email_campaigns')
        .delete()
        .eq('id', campaignId);
        
      if (error) throw error;
      
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      toast.success("Campaign deleted successfully");
    } catch (error: any) {
      console.error("Error deleting campaign:", error);
      toast.error(error.message || "Failed to delete campaign");
    }
  };
  
  const handleSendCampaign = async (campaignId: string) => {
    if (!confirm("Are you sure you want to send this campaign now? This cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('email_campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', campaignId);
        
      if (error) throw error;
      
      setCampaigns(campaigns.map(campaign => 
        campaign.id === campaignId 
          ? {...campaign, status: 'sent', sent_at: new Date().toISOString()} 
          : campaign
      ));
      
      toast.success("Campaign sent successfully");
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      toast.error(error.message || "Failed to send campaign");
    }
  };

  const getCampaignStatus = (campaign: any) => {
    if (campaign.status === 'sent') {
      return { label: 'Sent', color: 'bg-green-100 text-green-800' };
    } else if (campaign.scheduled_for) {
      return { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' };
    } else {
      return { label: 'Draft', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-4">
      {campaigns.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            You don't have any email campaigns yet.
          </p>
          <Button asChild>
            <Link to="/email-campaign">Create Your First Campaign</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {campaigns.map(campaign => {
            const status = getCampaignStatus(campaign);
            
            return (
              <Card key={campaign.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{campaign.name}</h4>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {campaign.subject}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        List: {campaign.email_lists?.name || 'No list selected'}
                      </span>
                      {campaign.scheduled_for && (
                        <span>
                          Scheduled: {format(new Date(campaign.scheduled_for), 'MMM d, yyyy')}
                        </span>
                      )}
                      {campaign.sent_at && (
                        <span>
                          Sent: {format(new Date(campaign.sent_at), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    {campaign.status !== 'sent' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          asChild
                        >
                          <Link to={`/email-campaign/${campaign.id}`}>
                            <Edit size={16} />
                          </Link>
                        </Button>
                        
                        {campaign.status === 'draft' && campaign.recipient_list_id && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleSendCampaign(campaign.id)}
                          >
                            <Send size={16} className="text-green-600" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCampaign(campaign.id)}
                        >
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
