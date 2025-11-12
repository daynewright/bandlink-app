# Bandlink App - User Stories & MVP Requirements

## Executive Summary

This document reverse-engineers the core user functionality from the existing schema and codebase to create a comprehensive set of user stories for rebuilding the MVP. It identifies what exists, what's missing, and what needs clarification.

---

## Core Concepts & Data Model

### Entity Hierarchy
```
Band (Organization)
  ├── Groups (Sub-organizations within band)
  │   ├── Users (Members)
  │   └── Conversations (Group chats)
  └── Events (Calendar items)
      ├── Groups (Which groups are involved)
      ├── Files (Documents)
      ├── Images (Photos)
      ├── Attendance (Who's going)
      └── Conversations (Event comments)
```

### User Types
1. **Band Leader** - Creates/manages events, groups, and band settings
2. **Band Member** - Participates in groups, attends events, sends messages
3. **Parent** - Manages child account(s), views child's events/groups
4. **Child** - Has limited account managed by parent

### Key Relationships
- **Bands ↔ Users**: Many-to-many via `users_bands`
- **Groups ↔ Users**: Many-to-many via `users_groups`
- **Events ↔ Groups**: Many-to-many via `events_groups`
- **Users ↔ Users**: Parent-child via `users_profile.child_id` and `is_child` flag
- **Conversations**: Three types (USER, GROUP, EVENT)

---

## User Stories by Feature Area

### 1. Authentication & Onboarding

#### US-1.1: User Registration
**As a** new user  
**I want to** create an account with email and password  
**So that** I can access the band communication platform

**Acceptance Criteria:**
- User can sign up with email/password
- Profile is automatically created in `users_profile` table
- User is redirected to band selection/creation flow
- Email verification (if required)

**Current Status:** ✅ Signup screen exists (`app/(modals)/signup.tsx`)

**Questions:**
- Should email verification be required before account activation?
- Can users sign up without being invited to a band?
- How do users join an existing band? (Invite code? Email invitation?)

---

#### US-1.2: User Login
**As a** registered user  
**I want to** log in with my credentials  
**So that** I can access my band's information

**Acceptance Criteria:**
- User can log in with email/password
- Session persists across app restarts
- User is redirected to appropriate screen based on auth state
- Error handling for invalid credentials

**Current Status:** ✅ Login screen exists (`app/(modals)/login.tsx`)

---

#### US-1.3: User Logout
**As a** logged-in user  
**I want to** log out of my account  
**So that** I can protect my account on shared devices

**Acceptance Criteria:**
- Logout button clears session
- User is redirected to login screen
- All cached data is cleared

**Current Status:** ✅ Logout exists in profile screen

---

### 2. Band Management

#### US-2.1: View Band Information
**As a** band member  
**I want to** see my band's name, description, and image  
**So that** I know which band I'm part of

**Acceptance Criteria:**
- Band name, description, and image displayed
- Band information loads from `users_bands` relationship

**Current Status:** ✅ Hook exists (`useGetBandForUser`) but no UI displays band info

**Gap:** No band profile/settings screen exists

---

#### US-2.2: Create Band (Band Leader)
**As a** band leader  
**I want to** create a new band  
**So that** I can organize my band members

**Acceptance Criteria:**
- Form to enter band name, description, upload image
- Band is created in `bands` table
- Creator is automatically added to `users_bands` with leader role
- Band ID is stored for future operations

**Current Status:** ❌ No UI exists

**Questions:**
- Should band creation be restricted? (Who can create bands?)
- Should there be a band code/invite system?
- What happens if a user creates multiple bands?

---

#### US-2.3: Join Band
**As a** user  
**I want to** join an existing band  
**So that** I can participate in band activities

**Acceptance Criteria:**
- User can enter band code or accept invitation
- User is added to `users_bands` table
- User can see band's events and groups

**Current Status:** ❌ No UI exists

**Questions:**
- How do users discover bands? (Search? Invite code? Email invitation?)
- Can users belong to multiple bands simultaneously?
- If multi-band: How do users switch between bands?

---

#### US-2.4: Manage Band Members (Band Leader)
**As a** band leader  
**I want to** view, add, and remove band members  
**So that** I can manage who has access to band information

**Acceptance Criteria:**
- List of all band members
- Add members by email or invite code
- Remove members (with confirmation)
- View member roles/permissions

**Current Status:** ❌ No UI exists

**Gap:** No role/permission system exists in schema

---

### 3. Group Management

#### US-3.1: View My Groups
**As a** band member  
**I want to** see all groups I belong to  
**So that** I know which groups I'm part of

**Acceptance Criteria:**
- List of groups from `users_groups` table
- Group names displayed
- Link to group chat/conversation

**Current Status:** ✅ Groups displayed in profile (`UserGroups` component)

---

#### US-3.2: Create Group (Band Leader)
**As a** band leader  
**I want to** create a new group  
**So that** I can organize band members into smaller units

**Acceptance Criteria:**
- Form to enter group name
- Select band (if multi-band)
- Optionally add members during creation
- Group is created in `groups` table
- Members added to `users_groups` table

**Current Status:** ❌ No UI exists

**Questions:**
- Can regular members create groups, or only leaders?
- Can groups span multiple bands? (Schema suggests no - `groups.band_id` is required)
- Should groups have descriptions or other metadata?

---

#### US-3.3: Add/Remove Group Members (Group Leader)
**As a** group leader  
**I want to** manage group membership  
**So that** I can control who is in my group

**Acceptance Criteria:**
- View current group members
- Add members from band members list
- Remove members (with confirmation)
- Members must be part of the same band

**Current Status:** ❌ No UI exists

**Gap:** No group leader role exists in schema

---

### 4. Event Management

#### US-4.1: View Events Feed
**As a** band member  
**I want to** see a feed of upcoming events  
**So that** I know what's happening in my band

**Acceptance Criteria:**
- Events displayed in chronological order
- Shows event name, date, time, location, groups involved
- Shows creator, attendee count, comment count
- Clickable to view event details
- Events filtered by user's band and groups

**Current Status:** ✅ Feed exists (`app/(tabs)/index.tsx` with `EventList`)

**Questions:**
- Should events show in feed if user is not in associated groups?
- How far in advance should events appear? (Past events? Future only?)
- Should there be filtering/sorting options?

---

#### US-4.2: View Event Details
**As a** band member  
**I want to** see full details of an event  
**So that** I can get all the information I need

**Acceptance Criteria:**
- Event name, description, date, time, location
- Creator information
- Associated groups (pills)
- List of attendees
- Files and images attached
- Comments/thread
- Map view (if location provided)

**Current Status:** ✅ Event details page exists (`app/(subpages)/event/[id]/index.tsx`)

---

#### US-4.3: Create Event (Band/Group Leader)
**As a** band or group leader  
**I want to** create a new event  
**So that** I can inform members about upcoming activities

**Acceptance Criteria:**
- Form with fields: name, description, date, start/end time, location, event type
- Select which groups the event is for (multi-select)
- Upload files and images
- Option to add "about" section with additional details
- Event is created in `events` table
- Groups linked via `events_groups` table
- Files/images linked via `events_files` and `events_images` tables

**Current Status:** ❌ No UI exists

**Questions:**
- Who can create events? (Only leaders? All members?)
- Can events be created without groups? (Band-wide events?)
- Should there be event templates?
- Can events be recurring?

---

#### US-4.4: Edit Event (Event Creator/Leader)
**As an** event creator or band leader  
**I want to** edit event details  
**So that** I can update information as plans change

**Acceptance Criteria:**
- Edit form pre-populated with current event data
- Can modify all fields
- Can add/remove groups
- Can add/remove files and images
- Changes saved to database

**Current Status:** ❌ No UI exists

**Questions:**
- Can only the creator edit, or can leaders edit any event?
- Should there be edit history/audit trail?

---

#### US-4.5: Delete Event (Event Creator/Leader)
**As an** event creator or band leader  
**I want to** delete an event  
**So that** I can remove cancelled or incorrect events

**Acceptance Criteria:**
- Delete button with confirmation dialog
- Event removed from database
- Associated conversations, attendance records handled (cascade?)

**Current Status:** ❌ No UI exists

**Questions:**
- Should deletion be soft delete (mark as deleted) or hard delete?
- What happens to event conversations and attendance records?

---

#### US-4.6: RSVP to Event
**As a** band member  
**I want to** indicate my attendance status for an event  
**So that** organizers know who's coming

**Acceptance Criteria:**
- Three status options: ATTENDING, NOT_ATTENDING, MAYBE_ATTENDING
- Status saved to `event_attendance` table
- Status visible on event details page
- Can change status at any time

**Current Status:** ⚠️ Partial - Attendance count shown but no RSVP UI exists

**Gap:** No RSVP button/interface exists

---

#### US-4.7: View Event Attendees
**As a** band member  
**I want to** see who is attending an event  
**So that** I know who will be there

**Acceptance Criteria:**
- List of attendees with avatars/initials
- Shows attendance status for each person
- Searchable list
- Clickable to view user profiles

**Current Status:** ✅ Attendees page exists (`app/(subpages)/event/[id]/attendees.tsx`)

---

#### US-4.8: View Event Files
**As a** band member  
**I want to** download files attached to an event  
**So that** I can access event-related documents

**Acceptance Criteria:**
- List of files with names
- Download functionality
- File type icons
- Preview if possible

**Current Status:** ✅ File section exists (`EventFileSection` component)

**Questions:**
- Where are files stored? (Supabase Storage? External?)
- What file types are supported?
- File size limits?

---

#### US-4.9: View Event Photos
**As a** band member  
**I want to** view photos attached to an event  
**So that** I can see event-related images

**Acceptance Criteria:**
- Grid/list view of images
- Full-screen image viewer
- Image gallery navigation

**Current Status:** ✅ Photo sections exist (`EventPhotoSection`, `photosFullView`, `photosListView`)

---

### 5. Messaging & Communication

#### US-5.1: View Direct Messages List
**As a** band member  
**I want to** see a list of my direct message conversations  
**So that** I can access my private conversations

**Acceptance Criteria:**
- List of conversations with other users
- Shows other user's name and avatar
- Shows latest message preview and timestamp
- Sorted by most recent activity
- Clickable to open conversation

**Current Status:** ✅ Direct messages list exists (`app/(tabs)/chat/direct.tsx`)

---

#### US-5.2: Send Direct Message
**As a** band member  
**I want to** send a direct message to another band member  
**So that** I can communicate privately

**Acceptance Criteria:**
- Can start new conversation or continue existing
- Message input field
- Send button
- Messages appear in real-time (or on refresh)
- Conversation created automatically if doesn't exist

**Current Status:** ✅ Direct chat screen exists (`app/(subpages)/chat/direct/[id].tsx`)

**Questions:**
- Should there be a "New Message" button to start conversations?
- Can users message anyone in the band, or only group members?
- Should there be read receipts?

---

#### US-5.3: View Group Messages List
**As a** band member  
**I want to** see a list of group conversations I'm part of  
**So that** I can access group chats

**Acceptance Criteria:**
- List of group conversations
- Shows group name, member count, latest message, timestamp
- Sorted by most recent activity
- Clickable to open group chat

**Current Status:** ✅ Group messages list exists (`app/(tabs)/chat/group.tsx`)

---

#### US-5.4: Send Group Message
**As a** group member  
**I want to** send messages in a group chat  
**So that** I can communicate with all group members

**Acceptance Criteria:**
- Message input field
- Send button
- Messages appear with sender name
- Messages visible to all group members
- Conversation created automatically if doesn't exist

**Current Status:** ✅ Group chat screen exists (`app/(subpages)/chat/group/[id].tsx`)

**Questions:**
- Should group conversations be auto-created when group is created?
- Can group leaders moderate/delete messages?
- Should there be @mentions?

---

#### US-5.5: Comment on Event
**As a** band member  
**I want to** comment on an event  
**So that** I can ask questions or share information

**Acceptance Criteria:**
- Comment input field on event details page
- Comments appear in chronological order
- Shows commenter name and timestamp
- Comments are part of event conversation thread

**Current Status:** ✅ Event comments page exists (`app/(subpages)/event/[id]/comments.tsx`)

---

#### US-5.6: View Message Attachments
**As a** band member  
**I want to** send and receive files/images in messages  
**So that** I can share documents and photos

**Acceptance Criteria:**
- Attach file/image button in message input
- Files/images displayed in message thread
- Download/view functionality

**Current Status:** ⚠️ Schema supports attachments (`message_attachments` table) but no UI exists

**Gap:** No attachment UI in chat components

---

### 6. Profile Management

#### US-6.1: View My Profile
**As a** user  
**I want to** see my profile information  
**So that** I can verify my details

**Acceptance Criteria:**
- Profile image, name, email, phone
- About/bio section
- Instruments played
- Groups I belong to
- Title/role

**Current Status:** ✅ Profile screen exists (`app/(tabs)/profile.tsx`)

---

#### US-6.2: Edit My Profile
**As a** user  
**I want to** edit my profile information  
**So that** I can keep my information up to date

**Acceptance Criteria:**
- Edit form with all profile fields
- Can upload/change profile image
- Can update name, email, phone, about, instruments, title
- Changes saved to `users_profile` table

**Current Status:** ❌ No edit UI exists

**Gap:** Profile is read-only

---

#### US-6.3: View Other User's Profile
**As a** band member  
**I want to** view another member's profile  
**So that** I can learn about them

**Acceptance Criteria:**
- Profile page accessible from user mentions/clicks
- Shows public profile information
- Shows groups they belong to
- Option to start direct message

**Current Status:** ✅ User profile modal exists (`app/(modals)/(profile)/[id].tsx`)

---

### 7. Parent-Child Account Management

#### US-7.1: Create Child Account (Parent)
**As a** parent  
**I want to** create an account for my child  
**So that** they can participate in band activities

**Acceptance Criteria:**
- Form to create child profile
- Child account linked to parent via `child_id` or `parent_child_relationship`
- `is_child` flag set to true
- Child can log in with separate credentials
- Parent can manage child's account

**Current Status:** ⚠️ Schema supports parent-child (`users_profile.is_child`, `child_id`) but no UI exists

**Questions:**
- How are child accounts created? (During parent signup? Separate flow?)
- Do children have separate login credentials or do parents log in for them?
- Can parents see all child's messages/activities?
- Can children create events or send messages independently?

---

#### US-7.2: View Child's Activities (Parent)
**As a** parent  
**I want to** see my child's events, groups, and messages  
**So that** I can stay informed about their band activities

**Acceptance Criteria:**
- Parent can switch to "view as child" mode
- See child's event feed
- See child's groups
- See child's messages (read-only?)

**Current Status:** ❌ No UI exists

**Questions:**
- Should parents have full access or read-only?
- Should there be a "parent dashboard" view?
- Can parents respond on behalf of child?

---

#### US-7.3: Manage Child Account (Parent)
**As a** parent  
**I want to** edit my child's profile and manage their account  
**So that** I can keep their information current

**Acceptance Criteria:**
- Edit child's profile
- Update child's groups (with approval?)
- Deactivate/reactivate child account

**Current Status:** ❌ No UI exists

---

### 8. Notifications & Real-time Updates

#### US-8.1: Receive Notifications
**As a** band member  
**I want to** receive notifications for new messages, events, and mentions  
**So that** I don't miss important information

**Acceptance Criteria:**
- Push notifications for new messages
- Notifications for new events in my groups
- Notifications for event RSVP updates
- Notification settings/preferences

**Current Status:** ❌ No notification system exists

**Questions:**
- Should notifications be in-app only or push notifications?
- What events trigger notifications?
- Can users customize notification preferences?

---

#### US-8.2: Real-time Message Updates
**As a** band member  
**I want to** see new messages appear in real-time  
**So that** I can have live conversations

**Acceptance Criteria:**
- Messages appear without refresh
- Typing indicators (optional)
- Read receipts (optional)

**Current Status:** ❌ No real-time updates (Supabase Realtime not implemented)

**Gap:** Messages require manual refresh

---

### 9. Search & Discovery

#### US-9.1: Search Users
**As a** band member  
**I want to** search for other band members  
**So that** I can find and message them

**Acceptance Criteria:**
- Search bar in app
- Search by name, email
- Results show user profiles
- Click to view profile or start message

**Current Status:** ⚠️ Search modal exists (`app/(modals)/search.tsx`) but functionality unclear

**Questions:**
- What can users search for? (Users? Events? Groups?)
- Should search be global or band-scoped?

---

#### US-9.2: Search Events
**As a** band member  
**I want to** search for past or future events  
**So that** I can find specific event information

**Acceptance Criteria:**
- Search by event name, date, location
- Filter by group, event type
- Results show event cards

**Current Status:** ❌ No search functionality exists

---

### 10. Store (Future Feature)

#### US-10.1: View Store
**As a** band member  
**I want to** access a store  
**So that** I can purchase band-related items

**Acceptance Criteria:**
- Store tab/screen
- Product listings
- Purchase functionality

**Current Status:** ⚠️ Placeholder exists (`app/(tabs)/store.tsx`) but no functionality

**Questions:**
- Is store part of MVP or future feature?
- What will be sold? (Merchandise? Tickets? Equipment?)
- Payment integration needed?

---

## Critical Gaps & Missing Features

### 1. Role & Permission System
**Problem:** No way to distinguish band leaders from regular members

**Impact:** Cannot restrict who can create events, manage groups, or access admin features

**Recommendation:**
- Add `role` field to `users_bands` table: `'leader' | 'member' | 'parent'`
- Add `role` field to `users_groups` table: `'leader' | 'member'`
- Create permission helper functions:
  - `is_band_leader(user_id, band_id)`
  - `can_create_event(user_id, band_id)`
  - `can_manage_group(user_id, group_id)`

---

### 2. Event Creation UI
**Problem:** No way for users to create events

**Impact:** Core functionality missing - events must be created manually in database

**Recommendation:**
- Create event creation form/screen
- Include all event fields (name, date, time, location, groups, files, images)
- Add permission checks (only leaders can create?)

---

### 3. Group Management UI
**Problem:** No way to create or manage groups

**Impact:** Groups must be created manually in database

**Recommendation:**
- Create group creation form
- Create group management screen (add/remove members)
- Add permission checks

---

### 4. Band Management UI
**Problem:** No way to create bands, join bands, or manage members

**Impact:** Bands must be set up manually

**Recommendation:**
- Create band creation flow
- Create band join/invite flow
- Create band member management screen

---

### 5. Profile Editing
**Problem:** Profiles are read-only

**Impact:** Users cannot update their information

**Recommendation:**
- Add profile edit form
- Add image upload functionality
- Update `users_profile` table

---

### 6. RSVP Functionality
**Problem:** Attendance count shown but no way to RSVP

**Impact:** Users cannot indicate attendance status

**Recommendation:**
- Add RSVP button to event details
- Create attendance status selector
- Update `event_attendance` table

---

### 7. Parent-Child Account Management
**Problem:** Schema supports it but no UI exists

**Impact:** Parent-child feature is non-functional

**Recommendation:**
- Create child account creation flow
- Create parent dashboard/view
- Implement parent access to child's data

---

### 8. Real-time Updates
**Problem:** Messages require manual refresh

**Impact:** Poor user experience for messaging

**Recommendation:**
- Implement Supabase Realtime subscriptions
- Add real-time message updates
- Add typing indicators (optional)

---

### 9. Notification System
**Problem:** No notifications exist

**Impact:** Users miss important updates

**Recommendation:**
- Implement push notifications (Expo Notifications)
- Add in-app notification center
- Create notification preferences

---

### 10. Multi-band Support
**Problem:** App assumes single band but schema supports multiple

**Impact:** Confusion about whether multi-band is supported

**Recommendation:**
- **Decision needed:** Single-band or multi-band?
- If multi-band: Add band switcher UI
- If single-band: Add unique constraint to `users_bands(user_id)`

---

## Questions Requiring Answers

### Product Strategy

1. **Multi-band Support**
   - Should users be able to belong to multiple bands?
   - If yes, how do they switch between bands? (Band switcher in header?)
   - If no, should we enforce single band membership?

2. **Role System**
   - Who can create events? (Only leaders? All members?)
   - Who can create groups? (Only leaders? All members?)
   - Can there be multiple band leaders?
   - Should there be group leaders separate from band leaders?

3. **Event Visibility**
   - Should events be visible to all band members by default?
   - Or only to members of groups associated with the event?
   - Should parents see all events or only events their child is in?

4. **Parent-Child Accounts**
   - How are child accounts created? (During parent signup? Separate flow?)
   - Do children have separate login credentials?
   - Can parents see child's messages? (Read-only? Full access?)
   - Can parents respond on behalf of child?

5. **Store Feature**
   - Is store part of MVP or future feature?
   - What will be sold? (Merchandise? Tickets? Equipment?)
   - Payment integration needed?

### Technical Decisions

6. **File Storage**
   - Where are files/images stored? (Supabase Storage? External service?)
   - What file size limits?
   - What file types supported?

7. **Real-time Features**
   - Should messages update in real-time? (Supabase Realtime)
   - Should there be typing indicators?
   - Should there be read receipts?

8. **Notifications**
   - In-app only or push notifications?
   - What events trigger notifications?
   - Can users customize preferences?

9. **Search**
   - What can users search for? (Users? Events? Groups?)
   - Should search be global or band-scoped?

10. **Event Deletion**
    - Hard delete or soft delete?
    - What happens to conversations and attendance records?

---

## MVP Feature Prioritization

### Phase 1: Core Functionality (Must Have)
1. ✅ Authentication (Login/Signup/Logout) - **DONE**
2. ✅ View Events Feed - **DONE**
3. ✅ View Event Details - **DONE**
4. ✅ View Direct Messages - **DONE**
5. ✅ Send Direct Messages - **DONE**
6. ✅ View Group Messages - **DONE**
7. ✅ Send Group Messages - **DONE**
8. ✅ Comment on Events - **DONE**
9. ✅ View Profile - **DONE**
10. ❌ **Create Events** - **MISSING**
11. ❌ **RSVP to Events** - **MISSING**
12. ❌ **Edit Profile** - **MISSING**

### Phase 2: Management Features (Should Have)
1. ❌ **Create/Manage Groups** - **MISSING**
2. ❌ **Create/Join Bands** - **MISSING**
3. ❌ **Manage Band Members** - **MISSING**
4. ❌ **Edit Events** - **MISSING**
5. ❌ **Delete Events** - **MISSING**
6. ❌ **Role/Permission System** - **MISSING**

### Phase 3: Enhanced Features (Nice to Have)
1. ❌ **Parent-Child Account Management** - **MISSING**
2. ❌ **Real-time Message Updates** - **MISSING**
3. ❌ **Push Notifications** - **MISSING**
4. ❌ **Search Functionality** - **MISSING**
5. ❌ **Message Attachments** - **MISSING**
6. ⚠️ **Store** - **PLACEHOLDER**

---

## Recommended User Stores (State Management)

Based on the user stories, here are the recommended Zustand stores:

### 1. `useAuthStore` (Already Exists)
**Purpose:** Manage authentication state

**State:**
- `authUser: User | null` - Current authenticated user
- `isLoading: boolean` - Auth loading state

**Actions:**
- `addUser(user)` - Set authenticated user
- `removeUser()` - Clear authenticated user

**Status:** ✅ Exists

---

### 2. `useProfileStore` (New)
**Purpose:** Manage current user's profile data

**State:**
- `profile: UserProfile | null` - Current user's profile
- `isLoading: boolean` - Profile loading state

**Actions:**
- `setProfile(profile)` - Set profile data
- `updateProfile(updates)` - Update profile fields
- `clearProfile()` - Clear profile data

---

### 3. `useBandStore` (New)
**Purpose:** Manage current band context

**State:**
- `currentBand: Band | null` - Currently selected band
- `bands: Band[]` - All bands user belongs to (if multi-band)
- `isLoading: boolean` - Band loading state

**Actions:**
- `setCurrentBand(band)` - Switch to different band
- `setBands(bands)` - Set all user's bands
- `addBand(band)` - Add new band
- `removeBand(bandId)` - Remove band

**Questions:**
- Single-band or multi-band? (Affects store design)

---

### 4. `useGroupsStore` (Optional)
**Purpose:** Cache user's groups for quick access

**State:**
- `groups: Group[]` - User's groups
- `isLoading: boolean` - Groups loading state

**Actions:**
- `setGroups(groups)` - Set groups
- `addGroup(group)` - Add new group
- `removeGroup(groupId)` - Remove group

**Note:** May not be needed if React Query caching is sufficient

---

### 5. `useNotificationsStore` (New)
**Purpose:** Manage in-app notifications

**State:**
- `notifications: Notification[]` - List of notifications
- `unreadCount: number` - Count of unread notifications

**Actions:**
- `addNotification(notification)` - Add new notification
- `markAsRead(notificationId)` - Mark notification as read
- `clearAll()` - Clear all notifications

---

### 6. `useConversationsStore` (Optional)
**Purpose:** Cache conversations for quick access

**State:**
- `directConversations: Conversation[]` - Direct message conversations
- `groupConversations: Conversation[]` - Group conversations
- `isLoading: boolean` - Conversations loading state

**Actions:**
- `setDirectConversations(conversations)` - Set direct conversations
- `setGroupConversations(conversations)` - Set group conversations
- `updateConversation(conversationId, updates)` - Update conversation

**Note:** May not be needed if React Query caching is sufficient

---

## Data Flow Recommendations

### Authentication Flow
```
User Logs In
  → useGetLoggedInUser() fetches auth session
  → useAuthStore.addUser() stores auth user
  → useGetLoggedInProfile() fetches profile
  → useProfileStore.setProfile() stores profile
  → useGetBandForUser() fetches band
  → useBandStore.setCurrentBand() stores band
  → App renders with user context
```

### Event Creation Flow
```
User Clicks "Create Event"
  → Check permission: is_band_leader() or can_create_event()
  → Show event creation form
  → User fills form (name, date, time, location, groups, files)
  → Submit to create_event() mutation
  → Event created in database
  → React Query invalidates events cache
  → Event appears in feed
```

### Message Flow
```
User Sends Message
  → Check if conversation exists
  → If not, create conversation
  → Create message in messages table
  → React Query invalidates messages cache
  → (Future: Supabase Realtime broadcasts to other participants)
```

---

## Next Steps

1. **Answer Critical Questions** (Product Strategy section)
2. **Design Role/Permission System** (Schema changes needed)
3. **Build Missing Core Features** (Event creation, RSVP, Profile editing)
4. **Implement Management Features** (Group/Band management)
5. **Add Enhanced Features** (Real-time, Notifications, Parent-child)

---

## Appendix: Schema Summary

### Core Tables
- `bands` - Band organizations
- `groups` - Groups within bands
- `events` - Calendar events
- `users_profile` - User profiles
- `users_bands` - Band membership (many-to-many)
- `users_groups` - Group membership (many-to-many)
- `events_groups` - Event-group associations (many-to-many)
- `event_attendance` - Event RSVPs
- `conversations` - Message threads (USER/GROUP/EVENT types)
- `messages` - Individual messages
- `message_attachments` - Message file/image attachments
- `message_read_status` - Read receipts
- `files` - File storage metadata
- `images` - Image storage metadata
- `events_files` - Event-file associations
- `events_images` - Event-image associations

### Key Enums
- `conversation_type`: `'USER' | 'GROUP' | 'EVENT'`
- `attendence_status`: `'ATTENDING' | 'NOT_ATTENDING' | 'MAYBE_ATTENDING'`
- `user_status`: `'ACTIVE' | 'DEACTIVATED' | 'BLOCKED'`

### Key Functions (RPC)
- `get_events_for_user_in_band()` - Get events for user's band
- `get_single_event_with_details()` - Get full event details
- `get_conversations_for_user()` - Get user's direct conversations
- `get_group_conversations_by_user_id()` - Get user's group conversations
- `get_messages_for_conversation_user()` - Get direct messages
- `get_messages_for_conversation_group()` - Get group messages
- `get_messages_for_event()` - Get event comments
- `create_message_between_users()` - Create direct message
- `create_message_for_group()` - Create group message
- `create_message_for_event()` - Create event comment

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-07  
**Status:** Ready for Review

