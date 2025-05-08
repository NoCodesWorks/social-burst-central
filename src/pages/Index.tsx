
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">SocialBurst</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {user ? (
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth?tab=signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth?tab=signup">Create Account</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage All Your Social Media in One Place
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Schedule posts, analyze performance, and grow your audience across multiple platforms with our all-in-one social media management tool.
                </p>
              </div>
              <div className="space-x-4">
                {user ? (
                  <Button size="lg" asChild>
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/auth?tab=signup">Get Started</Link>
                  </Button>
                )}
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 items-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Schedule & Publish</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Plan and schedule your content across multiple platforms with our intuitive calendar interface.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Analyze & Improve</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Track performance metrics and gain insights to optimize your social media strategy.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Email Marketing</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and send targeted email campaigns to engage with your audience directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 SocialBurst. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
