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
      bands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          band_id: string | null
          conversation_type: Database["public"]["Enums"]["conversation_type"]
          created_at: string
          event_id: string | null
          group_id: string | null
          id: string
          user_id_a: string | null
          user_id_b: string | null
        }
        Insert: {
          band_id?: string | null
          conversation_type: Database["public"]["Enums"]["conversation_type"]
          created_at?: string
          event_id?: string | null
          group_id?: string | null
          id?: string
          user_id_a?: string | null
          user_id_b?: string | null
        }
        Update: {
          band_id?: string | null
          conversation_type?: Database["public"]["Enums"]["conversation_type"]
          created_at?: string
          event_id?: string | null
          group_id?: string | null
          id?: string
          user_id_a?: string | null
          user_id_b?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_a_fkey"
            columns: ["user_id_a"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_b_fkey"
            columns: ["user_id_b"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      event_attendance: {
        Row: {
          created_at: string
          event_id: string
          status: Database["public"]["Enums"]["attendence_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          status?: Database["public"]["Enums"]["attendence_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          status?: Database["public"]["Enums"]["attendence_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          band_id: string
          created_at: string
          creator_user_id: string
          description: string | null
          end_time: string | null
          event_date: string | null
          event_name: string
          id: string
          owner_user_id: string | null
          start_time: string | null
        }
        Insert: {
          band_id: string
          created_at?: string
          creator_user_id: string
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          event_name: string
          id?: string
          owner_user_id?: string | null
          start_time?: string | null
        }
        Update: {
          band_id?: string
          created_at?: string
          creator_user_id?: string
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          event_name?: string
          id?: string
          owner_user_id?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_creator_user_id_fkey"
            columns: ["creator_user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_owner_user_id_fkey"
            columns: ["owner_user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      events_files: {
        Row: {
          created_at: string
          event_id: string
          file_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          file_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          file_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_files_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_files_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          }
        ]
      }
      events_groups: {
        Row: {
          created_at: string
          event_id: string
          group_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          group_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          group_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_groups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      events_images: {
        Row: {
          created_at: string
          event_id: string
          image_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          image_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          image_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          }
        ]
      }
      files: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          id?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          band_id: string
          created_at: string
          group_name: string
          id: string
        }
        Insert: {
          band_id: string
          created_at?: string
          group_name: string
          id?: string
        }
        Update: {
          band_id?: string
          created_at?: string
          group_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          created_at: string
          id: string
          image_name: string | null
          image_path: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_name?: string | null
          image_path: string
        }
        Update: {
          created_at?: string
          id?: string
          image_name?: string | null
          image_path?: string
        }
        Relationships: []
      }
      message_attachments: {
        Row: {
          created_at: string
          file_id: string | null
          id: string
          image_id: string | null
          message_id: string
        }
        Insert: {
          created_at?: string
          file_id?: string | null
          id?: string
          image_id?: string | null
          message_id: string
        }
        Update: {
          created_at?: string
          file_id?: string | null
          id?: string
          image_id?: string | null
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_attachments_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
      message_read_status: {
        Row: {
          is_read: boolean | null
          message_id: string
          user_id: string
        }
        Insert: {
          is_read?: boolean | null
          message_id: string
          user_id: string
        }
        Update: {
          is_read?: boolean | null
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_read_status_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_read_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          context: string
          conversation_id: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          context: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          context?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      users_bands: {
        Row: {
          band_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          band_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          band_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_bands_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "bands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_bands_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      users_groups: {
        Row: {
          created_at: string
          group_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      users_profile: {
        Row: {
          about: string | null
          auth_user_id: string | null
          child_id: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          instruments: string[] | null
          is_child: boolean
          last_name: string | null
          phone: string | null
          profile_image_id: string | null
          status: Database["public"]["Enums"]["user_status"]
          title: string | null
        }
        Insert: {
          about?: string | null
          auth_user_id?: string | null
          child_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          instruments?: string[] | null
          is_child?: boolean
          last_name?: string | null
          phone?: string | null
          profile_image_id?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          title?: string | null
        }
        Update: {
          about?: string | null
          auth_user_id?: string | null
          child_id?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          instruments?: string[] | null
          is_child?: boolean
          last_name?: string | null
          phone?: string | null
          profile_image_id?: string | null
          status?: Database["public"]["Enums"]["user_status"]
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_profile_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_profile_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_profile_profile_image_id_fkey"
            columns: ["profile_image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_message_between_users: {
        Args: {
          p_sender_id: string
          p_receiver_id: string
          p_message_text: string
          p_file_id?: string
          p_image_id?: string
        }
        Returns: undefined
      }
      create_message_for_event: {
        Args: {
          p_event_id: string
          p_user_id: string
          p_message_text: string
          p_file_id?: string
          p_image_id?: string
        }
        Returns: undefined
      }
      create_message_for_group: {
        Args: {
          p_group_id: string
          p_user_id: string
          p_message_text: string
          p_file_id?: string
          p_image_id?: string
        }
        Returns: undefined
      }
      get_conversations_for_event: {
        Args: {
          p_event_id: string
        }
        Returns: {
          conversation_id: string
          event_id: string
          message: string
          sender_user_id: string
          sender_name: string
          sender_image_path: string
          file_name: string
          file_path: string
          image_name: string
          image_path: string
          created_at: string
        }[]
      }
      get_events_for_user_in_band: {
        Args: {
          p_user_id: string
          p_band_id: string
          p_page_number: number
          p_items_per_page: number
          p_sort_order: string
        }
        Returns: {
          event_id: string
          event_name: string
          description: string
          event_date: string
          start_time: string
          end_time: string
          creator_user_id: string
          creator_name: string
          creator_picture: string
          attendees_count: number
          conversation_count: number
          group_names: string[]
        }[]
      }
      get_messages_by_conversation_event: {
        Args: {
          p_event_id: string
          p_user_id: string
          p_page_size: number
          p_page_number: number
        }
        Returns: {
          message_id: string
          sender_user_id: string
          sender_name: string
          sender_image_path: string
          context: string
          file_name: string
          file_path: string
          image_name: string
          image_path: string
          created_at: string
          is_from_user: boolean
        }[]
      }
      get_messages_by_conversation_group: {
        Args: {
          p_group_id: string
          p_user_id: string
          p_page_size: number
          p_page_number: number
        }
        Returns: {
          message_id: string
          sender_user_id: string
          sender_name: string
          sender_image_path: string
          context: string
          file_name: string
          file_path: string
          image_name: string
          image_path: string
          created_at: string
          is_from_user: boolean
        }[]
      }
      get_messages_by_conversations_user: {
        Args: {
          p_logged_in_user_id: string
          p_other_user_id: string
          p_page_size: number
          p_page_number: number
        }
        Returns: {
          message_id: string
          other_user_id: string
          other_user_name: string
          other_user_image_path: string
          context: string
          file_name: string
          file_path: string
          image_name: string
          image_path: string
          created_at: string
          is_from_logged_in_user: boolean
        }[]
      }
      get_single_event_with_details: {
        Args: {
          p_event_id: string
        }
        Returns: {
          event_id: string
          event_name: string
          description: string
          event_date: string
          start_time: string
          end_time: string
          creator_user_id: string
          creator_name: string
          creator_picture: Json
          attendees_count: number
          attendees_info: Json[]
          files: Json[]
          images: Json[]
          conversations_count: number
        }[]
      }
      get_user_conversations_by_group: {
        Args: {
          p_user_id: string
        }
        Returns: {
          conversation_id: string
          group_id: string
          group_name: string
          user_count: number
          recent_message_created_at: string
        }[]
      }
      get_user_conversations_by_user: {
        Args: {
          p_user_id: string
        }
        Returns: {
          conversation_id: string
          other_user_id: string
          other_user_name: string
          other_user_image_path: string
          recent_message_text: string
          recent_message_created_at: string
        }[]
      }
      get_users_for_event: {
        Args: {
          p_event_id: string
        }
        Returns: {
          user_id: string
          full_name: string
          image_path: string
          attendance_status: string
        }[]
      }
    }
    Enums: {
      attendence_status: "ATTENDING" | "NOT_ATTENDING" | "MAYBE_ATTENDING"
      conversation_type: "GROUP" | "EVENT" | "USER"
      user_status: "ACTIVE" | "DEACTIVATED" | "BLOCKED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
