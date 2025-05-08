
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface EmailListsProps {
  userId: string | undefined;
}

export default function EmailLists({ userId }: EmailListsProps) {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [newList, setNewList] = useState({ name: "", description: "" });
  const [subscribersToImport, setSubscribersToImport] = useState("");
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) return;
    
    const fetchLists = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('email_lists')
          .select('*')
          .eq('user_id', userId);
          
        if (error) throw error;
        setLists(data || []);
      } catch (error) {
        console.error("Error fetching email lists:", error);
        toast.error("Failed to load subscriber lists");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLists();
  }, [userId]);
  
  const handleCreateList = async () => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('email_lists')
        .insert({
          user_id: userId,
          name: newList.name,
          description: newList.description,
          subscriber_count: 0
        })
        .select();
        
      if (error) throw error;
      
      toast.success("List created successfully");
      setLists([...lists, data[0]]);
      setNewList({ name: "", description: "" });
      setDialogOpen(false);
    } catch (error: any) {
      console.error("Error creating list:", error);
      toast.error(error.message || "Failed to create list");
    }
  };
  
  const handleImportSubscribers = async () => {
    if (!userId || !selectedListId) return;
    
    try {
      const emails = subscribersToImport.split(/[\n,]/)
        .map(email => email.trim())
        .filter(email => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
        
      if (emails.length === 0) {
        toast.error("No valid emails found");
        return;
      }
      
      // Batch insert into subscribers table
      const subscribers = emails.map(email => ({
        email,
        list_id: selectedListId,
        status: 'subscribed',
      }));
      
      const { error } = await supabase
        .from('subscribers')
        .insert(subscribers);
        
      if (error) throw error;
      
      // Update the subscriber count in the list
      await supabase
        .from('email_lists')
        .update({ subscriber_count: emails.length })
        .eq('id', selectedListId);
      
      // Update the list in state
      setLists(lists.map(list => 
        list.id === selectedListId 
          ? {...list, subscriber_count: list.subscriber_count + emails.length} 
          : list
      ));
      
      toast.success(`Successfully imported ${emails.length} subscribers`);
      setSubscribersToImport("");
      setImportDialogOpen(false);
    } catch (error: any) {
      console.error("Error importing subscribers:", error);
      toast.error(error.message || "Failed to import subscribers");
    }
  };
  
  const handleDeleteList = async (listId: string) => {
    if (!confirm("Are you sure you want to delete this list? All subscribers in this list will be lost.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('email_lists')
        .delete()
        .eq('id', listId);
        
      if (error) throw error;
      
      setLists(lists.filter(list => list.id !== listId));
      toast.success("List deleted successfully");
    } catch (error: any) {
      console.error("Error deleting list:", error);
      toast.error(error.message || "Failed to delete list");
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading lists...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Subscriber Lists</h3>
        <div className="space-x-2">
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload size={16} />
                <span>Import Subscribers</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Subscribers</DialogTitle>
                <DialogDescription>
                  Enter email addresses separated by commas or new lines.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="list">Select List</Label>
                  <select 
                    id="list"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    value={selectedListId || ""}
                    onChange={(e) => setSelectedListId(e.target.value)}
                  >
                    <option value="">Select a list</option>
                    {lists.map(list => (
                      <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="emails">Email Addresses</Label>
                  <Textarea 
                    id="emails"
                    placeholder="john@example.com, jane@example.com"
                    rows={10}
                    value={subscribersToImport}
                    onChange={(e) => setSubscribersToImport(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setImportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleImportSubscribers}
                  disabled={!selectedListId || !subscribersToImport.trim()}
                >
                  Import
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                <span>Create List</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
                <DialogDescription>
                  Create a new list to organize your subscribers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">List Name</Label>
                  <Input 
                    id="name"
                    value={newList.name}
                    onChange={(e) => setNewList({...newList, name: e.target.value})}
                    placeholder="Newsletter Subscribers"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={newList.description}
                    onChange={(e) => setNewList({...newList, description: e.target.value})}
                    placeholder="People who signed up for our newsletter"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleCreateList}
                  disabled={!newList.name.trim()}
                >
                  Create List
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {lists.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            You don't have any subscriber lists yet.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Create Your First List</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map(list => (
            <Card key={list.id} className="p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{list.name}</h4>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">{list.description}</p>
                <div className="bg-gray-100 px-2 py-1 rounded-md text-sm inline-block">
                  {list.subscriber_count} {list.subscriber_count === 1 ? 'subscriber' : 'subscribers'}
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    setSelectedListId(list.id);
                    setImportDialogOpen(true);
                  }}
                >
                  Import Subscribers
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
