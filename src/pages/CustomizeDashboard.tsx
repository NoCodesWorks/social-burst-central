
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function CustomizeDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    displayName: "",
    theme: "light",
    platforms: {
      facebook: true,
      instagram: true,
      twitter: true,
      youtube: false,
    },
    widgets: {
      quickStats: true,
      upcomingPosts: true,
      recentActivity: true,
      platformPerformance: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving preferences
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard customized!",
        description: "Your preferences have been saved.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-2">Customize Your Dashboard</h1>
      <p className="text-gray-500 mb-8">Set your preferences to personalize your experience.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName"
                  value={preferences.displayName} 
                  placeholder={preferences.displayName || "Your Name"}
                  onChange={(e) => setPreferences({...preferences, displayName: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Select platforms you want to manage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-full">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Facebook</h3>
                    <p className="text-sm text-gray-500">Show Facebook in your dashboard</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.platforms.facebook}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      platforms: {...preferences.platforms, facebook: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-pink-600 flex items-center justify-center rounded-full">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <p className="text-sm text-gray-500">Show Instagram in your dashboard</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.platforms.instagram}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      platforms: {...preferences.platforms, instagram: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-sky-500 flex items-center justify-center rounded-full">
                    <Twitter className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Twitter / X</h3>
                    <p className="text-sm text-gray-500">Show Twitter/X in your dashboard</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.platforms.twitter}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      platforms: {...preferences.platforms, twitter: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-full">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">YouTube</h3>
                    <p className="text-sm text-gray-500">Show YouTube in your dashboard</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.platforms.youtube}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      platforms: {...preferences.platforms, youtube: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Widgets</CardTitle>
              <CardDescription>Choose which widgets to display on your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Quick Stats</h3>
                  <p className="text-sm text-gray-500">Display summary statistics</p>
                </div>
                <Switch 
                  checked={preferences.widgets.quickStats}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      widgets: {...preferences.widgets, quickStats: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Upcoming Posts</h3>
                  <p className="text-sm text-gray-500">Show scheduled posts</p>
                </div>
                <Switch 
                  checked={preferences.widgets.upcomingPosts}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      widgets: {...preferences.widgets, upcomingPosts: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Recent Activity</h3>
                  <p className="text-sm text-gray-500">Display recent engagement</p>
                </div>
                <Switch 
                  checked={preferences.widgets.recentActivity}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      widgets: {...preferences.widgets, recentActivity: checked}
                    })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Platform Performance</h3>
                  <p className="text-sm text-gray-500">Show analytics across platforms</p>
                </div>
                <Switch 
                  checked={preferences.widgets.platformPerformance}
                  onCheckedChange={(checked) => 
                    setPreferences({
                      ...preferences, 
                      widgets: {...preferences.widgets, platformPerformance: checked}
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Skip for Now
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving preferences..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
