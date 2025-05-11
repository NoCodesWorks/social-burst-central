
import supabase from '@/lib/supabase';
import { toast } from 'sonner';

export type Platform = 'facebook' | 'instagram' | 'twitter' | 'youtube';

export interface SocialAccount {
  id: string;
  platform: Platform;
  account_name: string;
  is_connected: boolean;
  created_at: string;
}

export const getUserSocialAccounts = async (userId: string): Promise<SocialAccount[]> => {
  try {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      throw error;
    }
    
    // Ensure each account has a valid platform type
    const typedAccounts: SocialAccount[] = data?.map(account => ({
      id: account.id,
      platform: account.platform as Platform,
      account_name: account.account_name,
      is_connected: account.is_connected,
      created_at: account.created_at
    })) || [];
    
    return typedAccounts;
  } catch (error: any) {
    console.error('Error fetching social accounts:', error);
    toast.error('Failed to load social accounts');
    return [];
  }
};

export const connectSocialAccount = async (
  userId: string,
  platform: Platform,
  authData: { 
    accessToken: string;
    refreshToken?: string;
    accountName: string;
    expiresAt?: string;
  }
): Promise<SocialAccount | null> => {
  try {
    // Check if account already exists
    const { data: existingAccounts } = await supabase
      .from('social_accounts')
      .select()
      .eq('user_id', userId)
      .eq('platform', platform);
      
    // If it exists, update it
    if (existingAccounts && existingAccounts.length > 0) {
      const { data, error } = await supabase
        .from('social_accounts')
        .update({
          access_token: authData.accessToken,
          refresh_token: authData.refreshToken || null,
          expires_at: authData.expiresAt || null,
          account_name: authData.accountName,
          is_connected: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingAccounts[0].id)
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        return {
          id: data[0].id,
          platform: data[0].platform as Platform,
          account_name: data[0].account_name,
          is_connected: data[0].is_connected,
          created_at: data[0].created_at
        };
      }
      return null;
    } 
    // Otherwise, create a new one
    else {
      const { data, error } = await supabase
        .from('social_accounts')
        .insert({
          user_id: userId,
          platform,
          access_token: authData.accessToken,
          refresh_token: authData.refreshToken || null,
          expires_at: authData.expiresAt || null,
          account_name: authData.accountName,
          is_connected: true,
        })
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        return {
          id: data[0].id,
          platform: data[0].platform as Platform,
          account_name: data[0].account_name,
          is_connected: data[0].is_connected,
          created_at: data[0].created_at
        };
      }
      return null;
    }
  } catch (error: any) {
    console.error(`Error connecting ${platform} account:`, error);
    toast.error(`Failed to connect ${platform} account`);
    return null;
  }
};

export const disconnectSocialAccount = async (accountId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('social_accounts')
      .update({ 
        is_connected: false,
        access_token: '', // Clear sensitive data
        refresh_token: null,
        expires_at: null,
      })
      .eq('id', accountId);
      
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error('Error disconnecting social account:', error);
    toast.error('Failed to disconnect account');
    return false;
  }
};
