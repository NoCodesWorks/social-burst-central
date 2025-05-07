
import CreatePostForm from "@/components/create-post/CreatePostForm";

export default function CreatePost() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-gray-500">Create and schedule content for your social media platforms.</p>
      </div>
      
      <CreatePostForm />
    </div>
  );
}
