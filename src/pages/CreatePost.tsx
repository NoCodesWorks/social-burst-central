
import CreatePostForm from "@/components/create-post/CreatePostForm";
import ContentIdeasAI from "@/components/create-post/ContentIdeasAI";

export default function CreatePost() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-gray-500">Create and schedule content for your social media platforms.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CreatePostForm />
        </div>
        <div>
          <ContentIdeasAI />
        </div>
      </div>
    </div>
  );
}
