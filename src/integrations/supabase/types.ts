export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          device_info: string | null
          id: string
          ip_address: string | null
          location: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          device_info?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          device_info?: string | null
          id?: string
          ip_address?: string | null
          location?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      deposits: {
        Row: {
          amount: number
          created_at: string | null
          deposit_address: string | null
          id: string
          payment_method: string | null
          processed_at: string | null
          processed_by: string | null
          proof_url: string | null
          qr_code_url: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          deposit_address?: string | null
          id?: string
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          proof_url?: string | null
          qr_code_url?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          deposit_address?: string | null
          id?: string
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          proof_url?: string | null
          qr_code_url?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      investment_plans: {
        Row: {
          created_at: string | null
          description: string | null
          duration_days: number
          id: string
          max_amount: number
          min_amount: number
          name: string
          roi_percentage: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_days: number
          id?: string
          max_amount: number
          min_amount: number
          name: string
          roi_percentage: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_days?: number
          id?: string
          max_amount?: number
          min_amount?: number
          name?: string
          roi_percentage?: number
        }
        Relationships: []
      }
      kyc_verifications: {
        Row: {
          id: string
          id_document_url: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          selfie_url: string
          status: Database["public"]["Enums"]["kyc_status"] | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          id_document_url: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          selfie_url: string
          status?: Database["public"]["Enums"]["kyc_status"] | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          id_document_url?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          selfie_url?: string
          status?: Database["public"]["Enums"]["kyc_status"] | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          full_name: string
          id: string
          phone_number: string | null
          referral_code: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name: string
          id: string
          phone_number?: string | null
          referral_code?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string
          id?: string
          phone_number?: string | null
          referral_code?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus_amount: number | null
          created_at: string | null
          id: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status: string | null
        }
        Insert: {
          bonus_amount?: number | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_id: string
          referrer_id: string
          status?: string | null
        }
        Update: {
          bonus_amount?: number | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_id?: string
          referrer_id?: string
          status?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      user_investments: {
        Row: {
          amount: number
          created_at: string | null
          end_date: string | null
          id: string
          plan_id: string
          profit_earned: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["investment_status"] | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_id: string
          profit_earned?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_id?: string
          profit_earned?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["investment_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_investments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "investment_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          id: string
          total_deposited: number | null
          total_profit: number | null
          total_withdrawn: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: string
          total_deposited?: number | null
          total_profit?: number | null
          total_withdrawn?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: string
          total_deposited?: number | null
          total_profit?: number | null
          total_withdrawn?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      withdrawal_accounts: {
        Row: {
          account_holder_name: string | null
          account_number: string | null
          account_type: string
          bank_currency: string | null
          bank_name: string | null
          created_at: string | null
          email_address: string | null
          id: string
          is_default: boolean | null
          is_verified: boolean | null
          routing_number: string | null
          swift_code: string | null
          updated_at: string | null
          user_id: string
          wallet_address: string | null
          wallet_name: string | null
        }
        Insert: {
          account_holder_name?: string | null
          account_number?: string | null
          account_type: string
          bank_currency?: string | null
          bank_name?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          routing_number?: string | null
          swift_code?: string | null
          updated_at?: string | null
          user_id: string
          wallet_address?: string | null
          wallet_name?: string | null
        }
        Update: {
          account_holder_name?: string | null
          account_number?: string | null
          account_type?: string
          bank_currency?: string | null
          bank_name?: string | null
          created_at?: string | null
          email_address?: string | null
          id?: string
          is_default?: boolean | null
          is_verified?: boolean | null
          routing_number?: string | null
          swift_code?: string | null
          updated_at?: string | null
          user_id?: string
          wallet_address?: string | null
          wallet_name?: string | null
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          user_id: string
          wallet_address: string
          withdrawal_account_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          user_id: string
          wallet_address: string
          withdrawal_account_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          user_id?: string
          wallet_address?: string
          withdrawal_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "withdrawals_withdrawal_account_id_fkey"
            columns: ["withdrawal_account_id"]
            isOneToOne: false
            referencedRelation: "withdrawal_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      investment_status: "active" | "completed" | "cancelled"
      kyc_status: "pending" | "approved" | "rejected"
      transaction_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      investment_status: ["active", "completed", "cancelled"],
      kyc_status: ["pending", "approved", "rejected"],
      transaction_status: ["pending", "approved", "rejected"],
    },
  },
} as const
