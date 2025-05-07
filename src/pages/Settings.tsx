
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your account and platform preferences.</p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="john@example.com" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Brand</Label>
                  <Input id="company" placeholder="Acme Inc." defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-facebook flex items-center justify-center rounded-full">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Facebook</h3>
                    <p className="text-sm text-gray-500">Connected as Acme Inc.</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-instagram flex items-center justify-center rounded-full">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Instagram</h3>
                    <p className="text-sm text-gray-500">Connected as @acme</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-twitter flex items-center justify-center rounded-full">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Twitter</h3>
                    <p className="text-sm text-gray-500">Connected as @acme</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-youtube flex items-center justify-center rounded-full">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">YouTube</h3>
                    <p className="text-sm text-gray-500">Connected as Acme Channel</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Connect New Platform</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Configure API keys for direct integration with social media platforms.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-api">Facebook API Key</Label>
                  <Input id="facebook-api" placeholder="Enter API key" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter-api">Twitter API Key</Label>
                  <Input id="twitter-api" placeholder="Enter API key" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Save API Keys</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Post Published</h3>
                  <p className="text-sm text-gray-500">Get notified when your posts are published.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Scheduled Reminders</h3>
                  <p className="text-sm text-gray-500">Get reminders for scheduled posts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Analytics Reports</h3>
                  <p className="text-sm text-gray-500">Receive weekly analytics reports.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications via email.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">AI Caption Suggestions</h3>
                  <p className="text-sm text-gray-500">Enable AI-powered caption suggestions.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Canva Integration</h3>
                  <p className="text-sm text-gray-500">Enable Canva design integration.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto Hashtags</h3>
                  <p className="text-sm text-gray-500">Automatically suggest relevant hashtags.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <select 
                  id="timezone" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
