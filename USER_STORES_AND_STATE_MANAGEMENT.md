# Bandlink App - User Stores & State Management Architecture

## Executive Summary

This document defines the Zustand stores and state management architecture needed for Bandlink, a comprehensive high school band communication and organization platform. The app serves as a central hub for band leaders, students, and parents to coordinate practices, performances, and all band-related activities.

---

## Core Domain Model

### Entity Relationships
```
Band (Organization)
  ├── Students (with roles: Freshman, Sophomore, Junior, Senior, etc.)
  │   ├── Parents (linked to student accounts)
  │   └── Groups (multiple groups per student)
  ├── Groups (Functional groups: Props, Leaders, Chaperones, Sections, etc.)
  │   ├── Students (members)
  │   ├── Leaders/Admins (with permissions)
  │   └── Conversations (Slack-like group chats)
  └── Events (Practices, Performances, Competitions, etc.)
      ├── Groups (Which groups are involved)
      ├── Students (Who's attending)
      ├── Parents (Can view if their student's group is involved)
      ├── Images (Event photos)
      ├── Files (Documents, music sheets, etc.)
      └── Comments (Event discussion thread)
```

### User Types & Roles

1. **Band Leader/Admin** - Full administrative access
   - Create/edit/delete events
   - Create/manage groups
   - Manage student roles and progression
   - Assign group leaders
   - View all communications

2. **Group Leader** - Manages specific groups
   - Create group conversations
   - Add/remove group members
   - Post important announcements
   - Moderate group chats

3. **Student** - Active band member
   - View events for their groups
   - RSVP to events
   - Participate in group chats
   - View files and images
   - See their role/grade level

4. **Parent** - Linked to student account(s)
   - View events for their child's groups
   - View group conversations (read-only or full access?)
   - Communicate with band leaders
   - See their child's schedule

---

## Required User Stores (Zustand)

### 1. `useAuthStore` ✅ (Already Exists)
**Purpose:** Manage authentication state and session

**State:**
```typescript
interface AuthStore {
  authUser: User | null;           // Supabase auth user
  isLoading: boolean;              // Auth loading state
  session: Session | null;          // Current session
}
```

**Actions:**
- `addUser(user: User)` - Set authenticated user
- `removeUser()` - Clear authenticated user and session
- `setSession(session: Session | null)` - Update session

**Usage:**
- Check if user is logged in
- Get current user ID for API calls
- Protect routes

**Status:** ✅ Exists - May need to add `session` state

---

### 2. `useProfileStore` (New)
**Purpose:** Manage current user's profile and role information

**State:**
```typescript
interface ProfileStore {
  profile: UserProfile | null;     // Current user's profile
  isLoading: boolean;               // Profile loading state
  userType: 'student' | 'parent' | 'leader' | null;  // Derived from profile
  isChild: boolean;                 // Is this a child account?
  childProfile: UserProfile | null; // If parent, their child's profile
}
```

**Actions:**
- `setProfile(profile: UserProfile)` - Set current user's profile
- `updateProfile(updates: Partial<UserProfile>)` - Update profile fields
- `setChildProfile(profile: UserProfile)` - Set child profile (for parents)
- `clearProfile()` - Clear all profile data
- `switchToChildView()` - Switch parent view to child's perspective

**Usage:**
- Display user name, avatar, role
- Determine permissions (student vs parent vs leader)
- Show appropriate UI based on user type
- Parent switching to view child's data

**Key Fields Needed:**
- `role` - Student role (Freshman, Sophomore, etc.) or Leader role
- `grade_level` - Numeric grade level (9, 10, 11, 12)
- `is_child` - Boolean flag
- `parent_id` - If student, link to parent
- `child_ids` - If parent, array of child IDs

---

### 3. `useBandStore` (New)
**Purpose:** Manage current band context and band information

**State:**
```typescript
interface BandStore {
  currentBand: Band | null;        // Currently selected band
  bands: Band[];                    // All bands user belongs to (if multi-band)
  isLoading: boolean;               // Band loading state
  bandMembers: BandMember[];        // Cached band members list
  bandSettings: BandSettings | null; // Band configuration/settings
}
```

**Actions:**
- `setCurrentBand(band: Band)` - Switch to different band
- `setBands(bands: Band[])` - Set all user's bands
- `setBandMembers(members: BandMember[])` - Cache band members
- `setBandSettings(settings: BandSettings)` - Update band settings
- `addBandMember(member: BandMember)` - Add member to cache
- `removeBandMember(userId: string)` - Remove member from cache
- `clearBand()` - Clear band data

**Usage:**
- Display current band name/logo
- Filter events/groups by band
- Check band membership
- Access band settings

**Key Fields Needed:**
- `id` - Band ID
- `name` - Band name
- `description` - Band description
- `image_url` - Band logo/image
- `school_name` - Associated school
- `academic_year` - Current academic year (2024-2025)

---

### 4. `useGroupsStore` (New)
**Purpose:** Manage user's groups and group memberships

**State:**
```typescript
interface GroupsStore {
  myGroups: Group[];                // Groups user belongs to
  allGroups: Group[];                // All groups in current band (if leader)
  isLoading: boolean;                // Groups loading state
  groupMembers: Record<string, GroupMember[]>; // Cached members by group ID
  groupConversations: Record<string, Conversation>; // Group conversations cache
}
```

**Actions:**
- `setMyGroups(groups: Group[])` - Set user's groups
- `setAllGroups(groups: Group[])` - Set all band groups (leaders only)
- `addGroup(group: Group)` - Add new group
- `removeGroup(groupId: string)` - Remove group
- `setGroupMembers(groupId: string, members: GroupMember[])` - Cache group members
- `setGroupConversation(groupId: string, conversation: Conversation)` - Cache conversation
- `updateGroup(groupId: string, updates: Partial<Group>)` - Update group
- `clearGroups()` - Clear all group data

**Usage:**
- Display groups user belongs to
- Filter events by group
- Show group conversations
- Manage group membership (leaders)

**Key Fields Needed:**
- `id` - Group ID
- `group_name` - Group name
- `group_type` - Type (Props, Leaders, Chaperones, Section, etc.)
- `band_id` - Parent band
- `description` - Group description
- `leader_user_ids` - Array of leader user IDs

---

### 5. `useEventsStore` (New)
**Purpose:** Manage events and event-related state

**State:**
```typescript
interface EventsStore {
  events: Event[];                  // Cached events
  upcomingEvents: Event[];           // Filtered upcoming events
  pastEvents: Event[];               // Filtered past events
  currentEvent: Event | null;        // Currently viewed event
  isLoading: boolean;                // Events loading state
  eventAttendance: Record<string, AttendanceStatus>; // User's RSVP status by event ID
  eventFilters: EventFilters;        // Current filter settings
}
```

**Actions:**
- `setEvents(events: Event[])` - Set events list
- `addEvent(event: Event)` - Add new event
- `updateEvent(eventId: string, updates: Partial<Event>)` - Update event
- `removeEvent(eventId: string)` - Remove event
- `setCurrentEvent(event: Event | null)` - Set viewed event
- `setAttendanceStatus(eventId: string, status: AttendanceStatus)` - Set RSVP
- `setEventFilters(filters: EventFilters)` - Update filters
- `clearEvents()` - Clear events data

**Usage:**
- Display event feed
- Filter events by group, date, type
- Show event details
- Manage RSVP status
- Cache event data for performance

**Key Fields Needed:**
- `event_id` - Event ID
- `event_name` - Event name
- `event_date` - Event date
- `start_time` - Start time
- `end_time` - End time
- `event_type` - Type (Practice, Performance, Competition, Rehearsal, etc.)
- `location_name` - Location
- `group_ids` - Associated groups
- `is_all_band` - Boolean for band-wide events

---

### 6. `useConversationsStore` (New)
**Purpose:** Manage conversations and messaging state

**State:**
```typescript
interface ConversationsStore {
  directConversations: Conversation[];  // Direct message conversations
  groupConversations: Conversation[];     // Group chat conversations
  eventConversations: Record<string, Conversation>; // Event comment threads
  currentConversation: Conversation | null; // Currently open conversation
  unreadCounts: Record<string, number>;   // Unread message counts by conversation ID
  isLoading: boolean;                      // Conversations loading state
  typingUsers: Record<string, string[]>;   // Users currently typing by conversation ID
}
```

**Actions:**
- `setDirectConversations(conversations: Conversation[])` - Set direct conversations
- `setGroupConversations(conversations: Conversation[])` - Set group conversations
- `addConversation(conversation: Conversation)` - Add new conversation
- `updateConversation(conversationId: string, updates: Partial<Conversation>)` - Update conversation
- `setCurrentConversation(conversation: Conversation | null)` - Set active conversation
- `setUnreadCount(conversationId: string, count: number)` - Update unread count
- `markConversationRead(conversationId: string)` - Mark as read
- `setTypingUsers(conversationId: string, userIds: string[])` - Update typing indicators
- `clearConversations()` - Clear all conversations

**Usage:**
- Display conversation lists
- Show unread badges
- Manage active conversation
- Real-time typing indicators
- Cache conversations for performance

---

### 7. `useMessagesStore` (New)
**Purpose:** Manage messages within conversations

**State:**
```typescript
interface MessagesStore {
  messages: Record<string, Message[]>; // Messages by conversation ID
  isLoading: Record<string, boolean>;  // Loading state by conversation ID
  hasMore: Record<string, boolean>;     // Pagination state
  sendingMessages: Set<string>;          // Message IDs currently being sent
}
```

**Actions:**
- `setMessages(conversationId: string, messages: Message[])` - Set messages for conversation
- `addMessage(conversationId: string, message: Message)` - Add new message
- `updateMessage(conversationId: string, messageId: string, updates: Partial<Message>)` - Update message
- `removeMessage(conversationId: string, messageId: string)` - Remove message
- `setLoading(conversationId: string, isLoading: boolean)` - Set loading state
- `setHasMore(conversationId: string, hasMore: boolean)` - Set pagination state
- `addSendingMessage(messageId: string)` - Track sending message
- `removeSendingMessage(messageId: string)` - Remove from sending
- `clearMessages(conversationId?: string)` - Clear messages (all or specific)

**Usage:**
- Display messages in chat UI
- Handle message pagination
- Show sending indicators
- Cache messages for performance
- Real-time message updates

---

### 8. `useNotificationsStore` (New)
**Purpose:** Manage in-app notifications and alerts

**State:**
```typescript
interface NotificationsStore {
  notifications: Notification[];      // All notifications
  unreadCount: number;               // Total unread count
  isLoading: boolean;                // Notifications loading state
  lastReadAt: Date | null;           // Last read timestamp
}
```

**Actions:**
- `setNotifications(notifications: Notification[])` - Set notifications list
- `addNotification(notification: Notification)` - Add new notification
- `markAsRead(notificationId: string)` - Mark notification as read
- `markAllAsRead()` - Mark all as read
- `removeNotification(notificationId: string)` - Remove notification
- `clearNotifications()` - Clear all notifications
- `setLastReadAt(timestamp: Date)` - Update last read time

**Usage:**
- Display notification center
- Show unread badge
- Push notification handling
- Notification preferences

**Notification Types:**
- New message in group chat
- New event created for your groups
- Event reminder (X hours before)
- RSVP update (someone responded)
- Important announcement in group
- File/image added to event
- New comment on event
- Group membership change

---

### 9. `usePermissionsStore` (New)
**Purpose:** Manage user permissions and role-based access

**State:**
```typescript
interface PermissionsStore {
  permissions: UserPermissions;     // Current user's permissions
  isLoading: boolean;                // Permissions loading state
  role: UserRole | null;            // Current user's role
  isBandLeader: boolean;             // Is band leader?
  isGroupLeader: Record<string, boolean>; // Is leader of specific groups
  canCreateEvents: boolean;          // Can create events?
  canManageGroups: boolean;          // Can manage groups?
  canManageMembers: boolean;         // Can manage members?
}
```

**Actions:**
- `setPermissions(permissions: UserPermissions)` - Set user permissions
- `setRole(role: UserRole)` - Set user role
- `checkPermission(permission: string): boolean` - Check specific permission
- `updatePermissions(updates: Partial<UserPermissions>)` - Update permissions
- `clearPermissions()` - Clear permissions

**Usage:**
- Show/hide UI elements based on permissions
- Enable/disable actions
- Route protection
- Permission checks before API calls

**Permission Types:**
- `CREATE_EVENTS` - Can create events
- `EDIT_EVENTS` - Can edit events (own or all)
- `DELETE_EVENTS` - Can delete events
- `CREATE_GROUPS` - Can create groups
- `MANAGE_GROUPS` - Can manage groups
- `MANAGE_MEMBERS` - Can add/remove members
- `VIEW_ALL_EVENTS` - Can view all band events
- `MANAGE_BAND_SETTINGS` - Can modify band settings
- `ASSIGN_ROLES` - Can assign student roles
- `POST_ANNOUNCEMENTS` - Can post important announcements

---

### 10. `useStudentProgressionStore` (New)
**Purpose:** Manage student grade progression and role advancement

**State:**
```typescript
interface StudentProgressionStore {
  students: Student[];                // All students in band
  gradeLevels: Record<number, Student[]>; // Students by grade level
  roleAssignments: Record<string, string>; // Role assignments by student ID
  academicYear: string;              // Current academic year (2024-2025)
  isLoading: boolean;                // Loading state
}
```

**Actions:**
- `setStudents(students: Student[])` - Set students list
- `setAcademicYear(year: string)` - Set current academic year
- `promoteStudents(gradeLevel: number)` - Promote students to next grade
- `assignRole(studentId: string, role: string)` - Assign role to student
- `updateStudentGrade(studentId: string, grade: number)` - Update student grade
- `getStudentsByGrade(grade: number): Student[]` - Get students by grade
- `clearStudents()` - Clear students data

**Usage:**
- Display students by grade level
- Manage role assignments
- Handle end-of-year promotions
- Filter by grade/role

**Student Roles:**
- Freshman (9th grade)
- Sophomore (10th grade)
- Junior (11th grade)
- Senior (12th grade)
- Section Leader
- Drum Major
- Band Captain
- Equipment Manager
- Librarian

---

### 11. `useFilesStore` (Optional - May use React Query instead)
**Purpose:** Manage file uploads and downloads

**State:**
```typescript
interface FilesStore {
  uploadingFiles: Record<string, UploadProgress>; // Files being uploaded
  downloadedFiles: Record<string, string>;        // Cached file paths
}
```

**Actions:**
- `addUploadingFile(fileId: string, progress: UploadProgress)` - Track upload
- `updateUploadProgress(fileId: string, progress: number)` - Update progress
- `removeUploadingFile(fileId: string)` - Remove from uploading
- `cacheDownloadedFile(fileId: string, path: string)` - Cache downloaded file
- `clearFiles()` - Clear file cache

**Usage:**
- Show upload progress
- Cache downloaded files
- Manage file operations

---

### 12. `useUIStore` (New)
**Purpose:** Manage UI state and preferences

**State:**
```typescript
interface UIStore {
  theme: 'light' | 'dark';            // App theme
  parentViewMode: boolean;          // Parent viewing as child
  selectedChildId: string | null;   // Selected child (for parents)
  sidebarOpen: boolean;              // Sidebar/drawer state
  activeTab: string;                 // Currently active tab
  filters: UIFilters;                // UI filter state
  preferences: UserPreferences;     // User preferences
}
```

**Actions:**
- `setTheme(theme: 'light' | 'dark')` - Set app theme
- `toggleParentViewMode()` - Toggle parent/child view
- `setSelectedChild(childId: string | null)` - Select child (parents)
- `setSidebarOpen(open: boolean)` - Toggle sidebar
- `setActiveTab(tab: string)` - Set active tab
- `setFilters(filters: UIFilters)` - Update filters
- `setPreferences(prefs: UserPreferences)` - Update preferences
- `clearUI()` - Reset UI state

**Usage:**
- Theme management
- Parent/child view switching
- Navigation state
- Filter persistence
- User preferences

---

## Store Dependencies & Data Flow

### Initialization Flow
```
App Starts
  → useAuthStore checks session
  → If authenticated:
    → useProfileStore loads profile
    → useBandStore loads band(s)
    → useGroupsStore loads user's groups
    → usePermissionsStore loads permissions
    → useEventsStore loads events
    → useConversationsStore loads conversations
    → useNotificationsStore loads notifications
```

### Event Creation Flow
```
User Creates Event
  → usePermissionsStore.checkPermission('CREATE_EVENTS')
  → Form submission
  → API call creates event
  → useEventsStore.addEvent(newEvent)
  → React Query invalidates events cache
  → useNotificationsStore.addNotification (for group members)
```

### Message Flow
```
User Sends Message
  → useMessagesStore.addSendingMessage(messageId)
  → API call sends message
  → On success:
    → useMessagesStore.addMessage(conversationId, message)
    → useConversationsStore.updateConversation (update last message)
    → useNotificationsStore.addNotification (for recipients)
  → useMessagesStore.removeSendingMessage(messageId)
```

### Parent View Switching Flow
```
Parent Switches to Child View
  → useUIStore.setParentViewMode(true)
  → useUIStore.setSelectedChild(childId)
  → useProfileStore.setChildProfile(childProfile)
  → useEventsStore filters events for child's groups
  → useGroupsStore filters groups for child
  → UI updates to show child's perspective
```

---

## Missing Features for High School Band Use Case

### 1. Academic Year Management
**Problem:** Students progress through grades each year

**Features Needed:**
- Academic year tracking (2024-2025, 2025-2026)
- End-of-year student promotion (Freshman → Sophomore, etc.)
- Archive previous year's events/data
- Year-over-year event templates
- Graduation handling (remove seniors, archive their data)

**Store:** `useStudentProgressionStore`

---

### 2. Section/Instrument Management
**Problem:** Bands are organized by instrument sections

**Features Needed:**
- Instrument assignment (Trumpet, Clarinet, Drums, etc.)
- Section leaders per instrument
- Section-specific groups
- Section rehearsal scheduling
- Instrument inventory tracking

**Schema Addition:**
- `users_profile.instruments: string[]` (already exists)
- `sections` table (if needed)
- `section_leaders` junction table

---

### 3. Uniform/Equipment Management
**Problem:** Bands have uniforms and equipment that need tracking

**Features Needed:**
- Uniform assignment to students
- Uniform checkout/checkin system
- Equipment inventory
- Equipment maintenance tracking
- Lost/damaged item reporting

**Schema Addition:**
- `uniforms` table
- `uniform_assignments` table
- `equipment` table
- `equipment_checkouts` table

---

### 4. Music Library Management
**Problem:** Bands have sheet music and arrangements

**Features Needed:**
- Music library (digital sheet music)
- Music assignment to events
- Music sharing with students
- Practice tracks/recordings
- Music search and organization

**Schema Addition:**
- `music_library` table
- `music_assignments` table (links music to events)

---

### 5. Attendance Tracking & Reporting
**Problem:** Need to track attendance at practices and events

**Features Needed:**
- Detailed attendance records
- Attendance reports (by student, by event, by group)
- Excused vs unexcused absences
- Attendance requirements per event type
- Parent notifications for absences

**Schema Addition:**
- `event_attendance` table (exists but may need enhancement)
- `attendance_reasons` enum (Excused, Unexcused, Sick, etc.)

---

### 6. Rehearsal Schedule Management
**Problem:** Regular rehearsals need scheduling

**Features Needed:**
- Recurring rehearsal events
- Rehearsal schedule templates
- Sectional rehearsal scheduling
- Rehearsal attendance tracking
- Rehearsal notes/agenda

**Enhancement:**
- Add `is_recurring` flag to events
- Add `recurrence_pattern` to events
- Rehearsal-specific event types

---

### 7. Performance/Competition Management
**Problem:** Performances and competitions have special requirements

**Features Needed:**
- Performance checklists
- Required attire/uniforms
- Transportation arrangements
- Performance order/setlist
- Competition scoring/results
- Performance photos/videos gallery

**Enhancement:**
- Event types: Performance, Competition, Festival, etc.
- Performance-specific fields

---

### 8. Fundraising & Financial Management
**Problem:** Bands need to track fundraising and expenses

**Features Needed:**
- Fundraising event tracking
- Student fundraising goals/progress
- Payment tracking (trip fees, uniform fees, etc.)
- Expense reporting
- Financial statements

**Schema Addition:**
- `fundraising_events` table
- `payments` table
- `expenses` table

---

### 9. Trip/Travel Management
**Problem:** Bands travel for competitions and performances

**Features Needed:**
- Trip planning and details
- Transportation arrangements
- Lodging information
- Chaperone assignments
- Emergency contact information
- Packing lists
- Itinerary management

**Enhancement:**
- Trip-specific event types
- Trip details fields

---

### 10. Volunteer/Chaperone Management
**Problem:** Bands need volunteers and chaperones

**Features Needed:**
- Volunteer sign-up system
- Chaperone assignment to events
- Volunteer availability tracking
- Background check status
- Volunteer communication

**Schema Addition:**
- `volunteers` table (or use `users_profile` with flag)
- `volunteer_assignments` table
- `chaperone_assignments` table

---

### 11. Announcements & Important Updates
**Problem:** Need way to highlight important information

**Features Needed:**
- Pinned announcements in groups
- Important announcements feed
- Announcement categories (Urgent, General, Reminder)
- Announcement read receipts
- Push notifications for critical announcements

**Schema Addition:**
- `announcements` table
- `announcement_read_status` table

---

### 12. Calendar Integration
**Problem:** Parents/students use external calendars

**Features Needed:**
- Export events to Google Calendar, iCal
- Calendar sync
- Event reminders
- Conflict detection

**Implementation:**
- Use `expo-calendar` package (already in dependencies)
- Generate .ics files for export

---

### 13. Document Templates
**Problem:** Common documents needed repeatedly

**Features Needed:**
- Permission slip templates
- Medical form templates
- Trip information templates
- Reusable document templates

**Schema Addition:**
- `document_templates` table

---

### 14. Grade/Class Integration
**Problem:** Students are in specific grade levels

**Features Needed:**
- Grade level filtering
- Grade-specific events
- Grade progression tracking
- Senior-specific features (graduation, etc.)

**Enhancement:**
- Add `grade_level` to `users_profile`
- Grade-based filtering in events

---

### 15. Media Library
**Problem:** Bands have photos/videos from events

**Features Needed:**
- Organized photo galleries
- Video uploads
- Media sharing
- Media tagging (by event, student, group)
- Media download permissions

**Enhancement:**
- `events_images` table exists
- May need `media_library` table for organization

---

### 16. Communication Preferences
**Problem:** Different users want different notification types

**Features Needed:**
- Notification preferences (email, push, in-app)
- Quiet hours
- Group-specific notification settings
- Emergency override settings

**Schema Addition:**
- `notification_preferences` table

---

### 17. Band Roster Management
**Problem:** Need comprehensive roster with student information

**Features Needed:**
- Complete band roster
- Student contact information
- Parent contact information
- Emergency contacts
- Medical information (allergies, etc.)
- Instrument assignments
- Section assignments

**Enhancement:**
- Roster export (CSV, PDF)
- Roster filtering and search

---

### 18. Event Templates
**Problem:** Similar events created repeatedly

**Features Needed:**
- Event templates (Practice, Performance, Competition)
- Quick event creation from template
- Template customization

**Schema Addition:**
- `event_templates` table

---

### 19. Sign-up Sheets
**Problem:** Need volunteers, chaperones, equipment helpers

**Features Needed:**
- Sign-up sheets for events
- Volunteer slots
- Equipment needs
- Food/donation sign-ups

**Schema Addition:**
- `signup_sheets` table
- `signup_slots` table
- `signup_assignments` table

---

### 20. Band Boosters/Parent Organization
**Problem:** Parent organizations need coordination

**Features Needed:**
- Booster organization management
- Booster meeting scheduling
- Booster communication
- Booster fundraising tracking

**Schema Addition:**
- `booster_organizations` table
- `booster_members` table

---

## Store Implementation Priority

### Phase 1: Core Stores (MVP)
1. ✅ `useAuthStore` - Authentication
2. `useProfileStore` - User profile and type
3. `useBandStore` - Band context
4. `useGroupsStore` - Groups
5. `useEventsStore` - Events
6. `useConversationsStore` - Conversations
7. `useMessagesStore` - Messages
8. `usePermissionsStore` - Permissions

### Phase 2: Enhanced Stores
9. `useNotificationsStore` - Notifications
10. `useStudentProgressionStore` - Student management
11. `useUIStore` - UI state

### Phase 3: Optional Stores
12. `useFilesStore` - File management (may use React Query instead)

---

## Store Integration with React Query

**Recommendation:** Use Zustand for:
- **UI State** - Theme, filters, view modes
- **Auth State** - Current user, session
- **Permissions** - Role-based access
- **Cache** - Frequently accessed data (optional, React Query handles most)

**Use React Query for:**
- **Server State** - Events, messages, groups (fetched from API)
- **Mutations** - Creating/updating/deleting data
- **Cache Management** - Automatic caching and invalidation

**Hybrid Approach:**
- Zustand stores reference React Query cache
- Zustand manages derived state and UI preferences
- React Query handles all API communication

---

## Data Synchronization Strategy

### Real-time Updates (Supabase Realtime)
- **Messages** - Real-time message delivery
- **Conversations** - New conversation creation
- **Events** - Event updates, new events
- **Notifications** - New notifications
- **Typing Indicators** - User typing status

### Polling/Refresh Strategy
- **Events Feed** - Refresh on tab focus
- **Conversations List** - Refresh periodically
- **Notifications** - Poll every 30 seconds

### Optimistic Updates
- **Messages** - Show immediately, sync in background
- **RSVP** - Update UI immediately, sync to server
- **Event Creation** - Show in feed immediately

---

## Store File Structure

```
store/
  ├── useAuthStore.ts
  ├── useProfileStore.ts
  ├── useBandStore.ts
  ├── useGroupsStore.ts
  ├── useEventsStore.ts
  ├── useConversationsStore.ts
  ├── useMessagesStore.ts
  ├── useNotificationsStore.ts
  ├── usePermissionsStore.ts
  ├── useStudentProgressionStore.ts
  ├── useUIStore.ts
  └── index.ts (exports all stores)
```

---

## Next Steps

1. **Implement Core Stores** (Phase 1)
2. **Define TypeScript interfaces** for all store types
3. **Create store hooks** with proper TypeScript typing
4. **Integrate with React Query** for server state
5. **Add Supabase Realtime** subscriptions
6. **Implement missing features** from "Missing Features" section

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-07  
**Status:** Ready for Implementation

