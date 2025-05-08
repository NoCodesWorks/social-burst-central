
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function EmailCampaign() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingCampaign, setLoadingCampaign] = useState(!!id);
  const [emailLists, setEmailLists] = useState<any[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [campaign, setCampaign] = useState({
    name: "",
    subject: "",
    content: "",
    recipientListId: "",
    scheduled: false
  });

  useEffect(() => {
    const fetchEmailLists = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('email_lists')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        setEmailLists(data || []);
      } catch (error) {
        console.error("Error fetching email lists:", error);
        toast.error("Failed to load subscriber lists");
      }
    };
    
    const fetchCampaign = async () => {
      if (!id || !user) return;
      
      try {
        setLoadingCampaign(true);
        const { data, error } = await supabase
          .from('email_campaigns')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setCampaign({
            name: data.name,
            subject: data.subject,
            content: data.content,
            recipientListId: data.recipient_list_id || "",
            scheduled: !!data.scheduled_for
          });
          
          if (data.scheduled_for) {
            setDate(new Date(data.scheduled_for));
          }
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        toast.error("Failed to load campaign details");
        navigate("/email-marketing");
      } finally {
        setLoadingCampaign(false);
      }
    };
    
    fetchEmailLists();
    if (id) fetchCampaign();
  }, [user, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a campaign");
      return;
    }
    
    try {
      setLoading(true);
      
      const campaignData = {
        user_id: user.id,
        name: campaign.name,
        subject: campaign.subject,
        content: campaign.content,
        recipient_list_id: campaign.recipientListId || null,
        status: 'draft',
        scheduled_for: campaign.scheduled && date ? date.toISOString() : null
      };
      
      let result;
      
      if (id) {
        // Update existing campaign
        result = await supabase
          .from('email_campaigns')
          .update(campaignData)
          .eq('id', id)
          .select();
      } else {
        // Create new campaign
        result = await supabase
          .from('email_campaigns')
          .insert(campaignData)
          .select();
      }
      
      if (result.error) throw result.error;
      
      toast.success(id ? "Campaign updated successfully" : "Campaign created successfully");
      navigate("/email-marketing");
    } catch (error: any) {
      console.error("Error saving campaign:", error);
      toast.error(error.message || "Failed to save campaign");
    } finally {
      setLoading(false);
    }
  };
  
  if (loadingCampaign) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loading Campaign...</h1>
        </div>
        <div className="space-y-4">
          <div className="w-full h-8 bg-gray-200 animate-pulse rounded-md" />
          <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded-md" />
          <div className="w-full h-40 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {id ? "Edit Campaign" : "Create Email Campaign"}
        </h1>
        <p className="text-gray-500">
          {id ? "Update your email campaign details" : "Create a new email campaign to reach your audience"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Set up the basic information for your email campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input 
                id="name"
                value={campaign.name}
                onChange={(e) => setCampaign({...campaign, name: e.target.value})}
                placeholder="Monthly Newsletter"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input 
                id="subject"
                value={campaign.subject}
                onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                placeholder="Your May Newsletter is here!"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient-list">Recipient List</Label>
              <Select
                value={campaign.recipientListId}
                onValueChange={(value) => setCampaign({...campaign, recipientListId: value})}
              >
                <SelectTrigger id="recipient-list">
                  <SelectValue placeholder="Select a subscriber list" />
                </SelectTrigger>
                <SelectContent>
                  {emailLists.length > 0 ? (
                    emailLists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name} ({list.subscriber_count} subscribers)
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-lists" disabled>
                      No lists available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {emailLists.length === 0 && (
                <p className="text-sm text-amber-600 mt-1">
                  You need to create a subscriber list first.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="scheduled">Schedule Campaign</Label>
                <input
                  type="checkbox"
                  id="scheduled"
                  checked={campaign.scheduled}
                  onChange={(e) => setCampaign({...campaign, scheduled: e.target.checked})}
                  className="accent-primary h-4 w-4"
                />
              </div>
              
              {campaign.scheduled && (
                <div className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
            <CardDescription>Compose the content of your email</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={campaign.content}
              onChange={(e) => setCampaign({...campaign, content: e.target.value})}
              placeholder="Write your email content here..."
              className="min-h-[200px]"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Use plain text for now. Rich HTML editor coming soon.
            </p>
          </CardContent>
        </Card>
        
        <Separator />
        
        <div className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => navigate("/email-marketing")}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button 
              variant="secondary" 
              type="submit" 
              disabled={loading} 
              onClick={(e) => {
                e.preventDefault();
                // Logic to save as draft
                handleSubmit(e);
              }}
            >
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading || !campaign.recipientListId}>
              {loading ? "Saving..." : (campaign.scheduled ? "Schedule Campaign" : "Send Campaign")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
