
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          name: string;
          avatar_url: string | null;
          theme: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          name?: string;
          avatar_url?: string | null;
          theme?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          name?: string;
          avatar_url?: string | null;
          theme?: string;
        };
      };
      social_accounts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          platform: string;
          account_name: string;
          access_token: string;
          refresh_token: string | null;
          expires_at: string | null;
          is_connected: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          platform: string;
          account_name: string;
          access_token: string;
          refresh_token?: string | null;
          expires_at?: string | null;
          is_connected?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          platform?: string;
          account_name?: string;
          access_token?: string;
          refresh_token?: string | null;
          expires_at?: string | null;
          is_connected?: boolean;
        };
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          content: string;
          image_url: string | null;
          scheduled_for: string | null;
          status: string;
          platforms: string[];
          performance: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          content: string;
          image_url?: string | null;
          scheduled_for?: string | null;
          status?: string;
          platforms?: string[];
          performance?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          content?: string;
          image_url?: string | null;
          scheduled_for?: string | null;
          status?: string;
          platforms?: string[];
          performance?: Json | null;
        };
      };
      email_campaigns: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          name: string;
          subject: string;
          content: string;
          status: string;
          scheduled_for: string | null;
          sent_at: string | null;
          recipient_list_id: string | null;
          stats: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          name: string;
          subject: string;
          content: string;
          status?: string;
          scheduled_for?: string | null;
          sent_at?: string | null;
          recipient_list_id?: string | null;
          stats?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          name?: string;
          subject?: string;
          content?: string;
          status?: string;
          scheduled_for?: string | null;
          sent_at?: string | null;
          recipient_list_id?: string | null;
          stats?: Json | null;
        };
      };
      email_lists: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          name: string;
          description: string | null;
          subscriber_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          name: string;
          description?: string | null;
          subscriber_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          subscriber_count?: number;
        };
      };
      subscribers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          list_id: string;
          status: string;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          list_id: string;
          status?: string;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          list_id?: string;
          status?: string;
          metadata?: Json | null;
        };
      };
    };
  };
}
