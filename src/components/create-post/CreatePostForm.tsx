
import { useState } from "react";
import { Upload, Image as ImageIcon, Video, Calendar, AlignLeft, Hash, Clock, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CreatePostForm() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postType, setPostType] = useState<string>("text");
  const [caption, setCaption] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };
  
  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddHashtag();
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Platform Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3">Select Platforms</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedPlatforms.includes("facebook") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("facebook") ? "bg-facebook text-white" : "border-facebook text-facebook",
                  "gap-2"
                )}
                onClick={() => togglePlatform("facebook")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                Facebook
              </Button>
              <Button
                variant={selectedPlatforms.includes("instagram") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("instagram") ? "bg-instagram text-white" : "border-instagram text-instagram",
                  "gap-2"
                )}
                onClick={() => togglePlatform("instagram")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                Instagram
              </Button>
              <Button
                variant={selectedPlatforms.includes("twitter") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("twitter") ? "bg-twitter text-white" : "border-twitter text-twitter",
                  "gap-2"
                )}
                onClick={() => togglePlatform("twitter")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                Twitter
              </Button>
              <Button
                variant={selectedPlatforms.includes("youtube") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("youtube") ? "bg-youtube text-white" : "border-youtube text-youtube",
                  "gap-2"
                )}
                onClick={() => togglePlatform("youtube")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                YouTube
              </Button>
              <Button
                variant={selectedPlatforms.includes("tiktok") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("tiktok") ? "bg-tiktok text-white" : "border-tiktok text-tiktok",
                  "gap-2"
                )}
                onClick={() => togglePlatform("tiktok")}
              >
                TikTok
              </Button>
              <Button
                variant={selectedPlatforms.includes("threads") ? "default" : "outline"}
                className={cn(
                  selectedPlatforms.includes("threads") ? "bg-threads text-white" : "border-threads text-threads",
                  "gap-2"
                )}
                onClick={() => togglePlatform("threads")}
              >
                Threads
              </Button>
            </div>
          </div>
          
          {/* Post Type Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3">Post Type</h3>
            <Tabs defaultValue="text" value={postType} onValueChange={setPostType} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <AlignLeft size={16} /> Text
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon size={16} /> Image
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video size={16} /> Video
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="pt-4">
                <Textarea 
                  placeholder="What's on your mind?" 
                  className="min-h-[120px]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="image" className="pt-4">
                <div className="border-2 border-dashed rounded-md p-8 text-center mb-4">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline">Select Image</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
                <Textarea 
                  placeholder="Write a caption..." 
                  className="min-h-[80px]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="video" className="pt-4">
                <div className="border-2 border-dashed rounded-md p-8 text-center mb-4">
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline">Select Video</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">MP4, MOV up to 100MB</p>
                </div>
                <Textarea 
                  placeholder="Write a caption..." 
                  className="min-h-[80px]"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Hashtags */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Hash size={18} /> Hashtags
            </h3>
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Add a hashtag (without #)" 
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" onClick={handleAddHashtag}>Add</Button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveHashtag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Schedule */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Calendar size={18} /> Schedule
            </h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="publish-now" />
                <Label htmlFor="publish-now">Publish now</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="schedule-post" defaultChecked />
                <Label htmlFor="schedule-post">Schedule for later</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="post-date">Date</Label>
                <Input id="post-date" type="date" />
              </div>
              <div>
                <Label htmlFor="post-time">Time</Label>
                <Input id="post-time" type="time" />
              </div>
            </div>
          </div>
          
          {/* Canva Integration (mock) */}
          <div>
            <div className="border rounded-md p-4 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-md">
                    <ImageIcon size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Design with Canva</h3>
                    <p className="text-sm text-gray-600">Create professional designs for your posts</p>
                  </div>
                </div>
                <Button variant="outline" className="bg-white">
                  Open Canva
                </Button>
              </div>
            </div>
          </div>
          
          {/* AI Assistant (mock) */}
          <div className="border rounded-md p-4 bg-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-700">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Generate captions and hashtag suggestions</p>
                </div>
              </div>
              <Button variant="outline" className="bg-white">
                Generate Ideas
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button>
              {selectedPlatforms.length === 0 ? "Create Post" : `Post to ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? "s" : ""}`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
