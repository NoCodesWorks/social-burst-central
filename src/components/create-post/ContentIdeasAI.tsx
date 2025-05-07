
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface ContentIdea {
  title: string;
  description: string;
}

export function ContentIdeasAI() {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  const generateIdeas = async () => {
    if (!keyword) {
      toast({
        title: "Please enter a keyword",
        description: "Enter a topic or keyword to generate content ideas.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey && !showApiInput) {
      setShowApiInput(true);
      return;
    }

    setIsLoading(true);

    // This would be replaced with actual API calls in a production environment
    try {
      // Simulating API call for now
      setTimeout(() => {
        const mockIdeas = [
          {
            title: `10 Ways to Improve Your ${keyword} Strategy`,
            description: `Explore effective techniques to enhance your ${keyword} approach and maximize results.`,
          },
          {
            title: `The Ultimate Guide to ${keyword}`,
            description: `Everything you need to know about ${keyword} - from basics to advanced strategies.`,
          },
          {
            title: `Why ${keyword} Matters in 2025`,
            description: `Understanding the importance of ${keyword} in today's rapidly evolving digital landscape.`,
          },
          {
            title: `${keyword} Tips for Beginners`,
            description: `Easy-to-follow advice to help newcomers navigate the world of ${keyword}.`,
          },
        ];
        
        setIdeas(mockIdeas);
        setIsLoading(false);
        
        toast({
          title: "Ideas generated!",
          description: "Content ideas have been created based on your keyword.",
        });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error generating ideas",
        description: "There was a problem connecting to the AI service.",
        variant: "destructive",
      });
    }
  };

  const useIdea = (idea: ContentIdea) => {
    // In a real app, this would set the content in the parent form
    toast({
      title: "Idea applied",
      description: `"${idea.title}" has been added to your post.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" /> 
          AI Content Ideas
        </CardTitle>
        <CardDescription>
          Generate content ideas based on keywords or topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showApiInput ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">AI API Key</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
              <p className="text-xs text-gray-500">
                We need your AI service API key to generate content ideas. This will be stored in your browser only.
              </p>
            </div>
          ) : null}
          
          <div className="flex gap-2">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter a topic or keyword"
              disabled={isLoading}
            />
            <Button 
              onClick={generateIdeas} 
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>
          
          {ideas.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medium">Generated Ideas:</h4>
              {ideas.map((idea, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => useIdea(idea)}
                >
                  <h5 className="font-medium">{idea.title}</h5>
                  <p className="text-sm text-gray-500">{idea.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Content suggestions are AI-generated and may require review.
      </CardFooter>
    </Card>
  );
}

export default ContentIdeasAI;
