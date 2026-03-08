# Firebase Backend Structure - NexMine

## Firestore Collections

### 1. `users`
Stores user profile and balance information.
- `uid`: String (Primary Key)
- `email`: String (Unique)
- `mobile`: String (Unique)
- `password`: String (Hashed)
- `referralCode`: String (Unique)
- `referredBy`: String (UID of referrer)
- `balance`: Number (NXP points)
- `signupBonusClaimed`: Boolean
- `createdAt`: Timestamp
- `lastMiningTime`: Timestamp
- `isMiningActive`: Boolean

### 2. `mining_sessions`
Tracks individual 24-hour mining sessions.
- `sessionId`: String (Primary Key)
- `uid`: String (Foreign Key to users)
- `startTime`: Timestamp
- `endTime`: Timestamp
- `rewardAmount`: Number
- `status`: String ("active" | "completed")

### 3. `tasks`
Social tasks available for users.
- `taskId`: String (Primary Key)
- `title`: String
- `platform`: String ("Telegram" | "X" | "YouTube" | "Instagram" | "Facebook")
- `reward`: Number (50 NXP)
- `link`: String

### 4. `user_tasks`
Tracks completed tasks per user.
- `id`: String (Primary Key)
- `uid`: String
- `taskId`: String
- `status`: String ("pending" | "completed")
- `completedAt`: Timestamp

### 5. `referrals`
Tracks the multi-level referral tree.
- `uid`: String (The user who referred)
- `level1`: Array of UIDs
- `level2`: Array of UIDs
- `level3`: Array of UIDs
- `level4`: Array of UIDs
- `level5`: Array of UIDs

## Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profile: Only owner can read/write
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Mining sessions: Only owner can manage
    match /mining_sessions/{sessionId} {
      allow read, create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update: if request.auth != null && resource.data.uid == request.auth.uid;
    }
    
    // Tasks: Everyone can read, no one can write (admin only)
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow write: if false; 
    }
  }
}
```

## Authentication
- **Email/Password**: Primary login method.
- **Phone Auth**: Used for OTP verification during signup.
