
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Edit, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">SocialBurst</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          The all-in-one platform to create, schedule, and manage your social media content across multiple platforms.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/auth")}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth?tab=signin")}>
            Sign In
          </Button>
        </div>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Connect All Your Social Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Facebook className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Facebook</h3>
            <p className="text-gray-500 text-center">Reach your audience with posts, images and videos.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="h-12 w-12 bg-pink-600 rounded-full flex items-center justify-center mb-4">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Instagram</h3>
            <p className="text-gray-500 text-center">Share stories, reels and photos with your followers.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center mb-4">
              <Twitter className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Twitter / X</h3>
            <p className="text-gray-500 text-center">Post updates and engage with your community.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center">
            <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Youtube className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">YouTube</h3>
            <p className="text-gray-500 text-center">Schedule and manage your video content.</p>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Edit className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">AI-Powered Content Ideas</h3>
            <p className="text-gray-500">Get intelligent content suggestions based on your brand and audience.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Smart Scheduling</h3>
            <p className="text-gray-500">Schedule posts at optimal times based on your audience engagement.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Performance Analytics</h3>
            <p className="text-gray-500">Track engagement metrics and get trend-based recommendations.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to boost your social media presence?</h2>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
          Join thousands of creators and brands that use SocialBurst to streamline their social media management.
        </p>
        <Button size="lg" onClick={() => navigate("/auth")}>
          Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}
