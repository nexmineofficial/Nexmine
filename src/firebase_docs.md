# NexMine Firebase Backend Structure

## Collections & Fields

### 1. `users`
- `user_id`: String (Auth UID)
- `email`: String (Unique)
- `mobile`: String (Unique)
- `password`: String (Hashed - handled by Firebase Auth)
- `referral_code`: String (Unique, generated on signup)
- `referred_by`: String (UID of the referrer)
- `balance_nxp`: Number (Default: 100 for signup bonus)
- `mining_start_time`: Timestamp (Last time mining was started)
- `last_mining_time`: Timestamp (Last time rewards were claimed)
- `total_referrals`: Number (Count of Level 1 referrals)
- `is_mining`: Boolean
- `created_at`: Timestamp

### 2. `mining`
- `id`: String
- `user_id`: String
- `start_time`: Timestamp
- `end_time`: Timestamp
- `reward_earned`: Number
- `status`: String ("active", "completed")

### 3. `referrals`
- `referrer_id`: String
- `referral_id`: String
- `level`: Number (1-5)
- `timestamp`: Timestamp

### 4. `tasks`
- `task_id`: String
- `name`: String (e.g., "Telegram Join")
- `reward_nxp`: Number (50)
- `link`: String

### 5. `rewards`
- `reward_id`: String
- `user_id`: String
- `amount`: Number
- `type`: String ("mining", "task", "referral_signup", "referral_mining")
- `timestamp`: Timestamp

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Mining sessions: Only owner can access
    match /mining/{docId} {
      allow read, create: if request.auth != null && request.resource.data.user_id == request.auth.uid;
    }
    
    // Tasks: Read-only for users
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only
    }
  }
}
```
