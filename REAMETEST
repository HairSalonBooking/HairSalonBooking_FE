# Contest Buddy Backend API Documentation

## Base URL

```
http://localhost:8080
```

## Authentication

Hầu hết các API yêu cầu xác thực bằng JWT token trong header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication APIs

### 1. User Registration

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "full_name": "string",
  "email": "string",
  "school": "string",
  "city": "string",
  "region": "string",
  "country": "string",
  "study_field": "string"
}
```

### 2. Organizer Registration

```http
POST /api/auth/register/organizer
Content-Type: multipart/form-data

// Form data:
user: {
  "username": "string",
  "password": "string",
  "full_name": "string",
  "email": "string"
}
organizer: {
  "name": "string",
  "email": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "website": "string"
}
avatar: file (optional)
```

### 3. User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### 4. Verify JWT Token

```http
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "string"
}
```

### 5. Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "string"
}
```

### 6. Resend Verification Email

```http
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "string"
}
```

### 7. Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "string"
}
```

### 8. Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "string",
  "newPassword": "string"
}
```

### 9. Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "string"
}
```

### 10. Change Password (Protected)

```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "string",
  "newPassword": "string"
}
```

---

## 👥 Role Management APIs (Admin Only)

### 11. Get All Roles

```http
GET /api/roles
Authorization: Bearer <admin_token>
```

### 12. Get User Roles

```http
GET /api/roles/user/:userId
Authorization: Bearer <admin_or_organizer_token>
```

### 13. Assign Role

```http
POST /api/roles/assign
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "userId": "string",
  "roleName": "string"
}
```

### 14. Remove Role

```http
POST /api/roles/remove
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "userId": "string",
  "roleName": "string"
}
```

---

## 🏢 Organizer Profile APIs

### 15. Get Organizer Profile

```http
GET /api/organizer/profile
Authorization: Bearer <organizer_token>
```

### 16. Update Organizer Profile

```http
PUT /api/organizer/profile
Authorization: Bearer <organizer_token>
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "website": "string",
  "full_name": "string"
}
```

### 17. Update Organizer Avatar

```http
POST /api/organizer/avatar
Authorization: Bearer <organizer_token>
Content-Type: multipart/form-data

avatar: file
```

### 18. Get Organizer Profile by ID (Public)

```http
GET /api/organizer/:organizerId
```

---

## 👤 Customer Profile APIs

### 19. Get Customer Profile

```http
GET /api/customer/profile
Authorization: Bearer <token>
```

### 20. Update Customer Profile

```http
PUT /api/customer/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "string",
  "email": "string",
  "bio": "string",
  "school": "string",
  "city": "string",
  "region": "string",
  "country": "string",
  "study_field": "string",
  "social_links": {
    "github": "string",
    "linkedin": "string",
    "personal": "string"
  }
}
```

### 21. Update Customer Avatar

```http
POST /api/customer/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

avatar: file
```

### 22. Get Customer Profile by ID (Public)

```http
GET /api/customer/:userId
```

---

## 🛠️ Skills APIs

### 23. Get All Skills

```http
GET /api/skills
```

### 24. Get User Skills

```http
GET /api/user/skills
Authorization: Bearer <token>
```

### 25. Get User Skills by ID

```http
GET /api/user/:userId/skills
```

### 26. Add User Skill

```http
POST /api/user/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "skill_name": "string",
  "category": "technical|design|soft|language|other",
  "level": "beginner|intermediate|advanced|expert",
  "experience_years": number
}
```

### 27. Update User Skill

```http
PUT /api/user/skills/:skillId
Authorization: Bearer <token>
Content-Type: application/json

{
  "skill_name": "string",
  "category": "technical|design|soft|language|other",
  "level": "beginner|intermediate|advanced|expert",
  "experience_years": number
}
```

### 28. Delete User Skill

```http
DELETE /api/user/skills/:skillId
Authorization: Bearer <token>
```

---

## 🏆 Achievements APIs

### 29. Get User Achievements

```http
GET /api/user/achievements
Authorization: Bearer <token>
```

### 30. Get User Achievements by ID

```http
GET /api/user/:userId/achievements
```

### 31. Get Achievement by ID

```http
GET /api/achievements/:achievementId
```

### 32. Add User Achievement

```http
POST /api/user/achievements
Authorization: Bearer <token>
Content-Type: application/json

{
  "competition_name": "string",
  "position": number,
  "award": "string",
  "achieved_at": "date",
  "category": "string",
  "description": "string"
}
```

### 33. Update User Achievement

```http
PUT /api/user/achievements/:achievementId
Authorization: Bearer <token>
Content-Type: application/json

{
  "competition_name": "string",
  "position": number,
  "award": "string",
  "achieved_at": "date",
  "category": "string",
  "description": "string"
}
```

### 34. Delete User Achievement

```http
DELETE /api/user/achievements/:achievementId
Authorization: Bearer <token>
```

---

## 📁 Projects APIs

### 35. Get User Projects

```http
GET /api/user/projects
Authorization: Bearer <token>
```

### 36. Get User Projects by ID

```http
GET /api/user/:userId/projects
```

### 37. Get Project by ID

```http
GET /api/projects/:projectId
```

### 38. Add User Project

```http
POST /api/user/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "category": "string",
  "tags": ["string"],
  "project_url": "string",
  "github_url": "string",
  "image": file (optional)
}
```

### 39. Update User Project

```http
PUT /api/user/projects/:projectId
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "category": "string",
  "tags": ["string"],
  "project_url": "string",
  "github_url": "string",
  "image": file (optional)
}
```

### 40. Delete User Project

```http
DELETE /api/user/projects/:projectId
Authorization: Bearer <token>
```

---

## 👥 Team APIs

### 41. Create Team

```http
POST /api/teams
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "max_members": number,
  "competition_id": "string" (optional)
}
```

### 42. Get Team by ID

```http
GET /api/teams/:teamId
```

### 43. Update Team

```http
PUT /api/teams/:teamId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "max_members": number
}
```

### 44. Delete Team

```http
DELETE /api/teams/:teamId
Authorization: Bearer <token>
```

### 45. Get Team Members

```http
GET /api/teams/:teamId/members
```

### 46. Remove Team Member

```http
DELETE /api/teams/:teamId/members/:memberId
Authorization: Bearer <token>
```

### 47. Change Team Member Role

```http
PUT /api/teams/:teamId/members/:memberId/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "leader|member"
}
```

### 48. Get User Teams

```http
GET /api/user/teams
Authorization: Bearer <token>
```

### 49. Get User Teams by ID

```http
GET /api/user/:userId/teams
```

---

## 📨 Team Invitation APIs

### 50. Create Invitation

```http
POST /api/team-invitations
Authorization: Bearer <token>
Content-Type: application/json

{
  "teamId": "string",
  "inviteeId": "string",
  "message": "string"
}
```

### 51. Get Invitation by ID

```http
GET /api/team-invitations/:invitationId
```

### 52. Get Team Invitations

```http
GET /api/teams/:teamId/invitations
Authorization: Bearer <token>
```

### 53. Get User Invitations

```http
GET /api/user/invitations
Authorization: Bearer <token>
```

### 54. Accept Invitation

```http
POST /api/team-invitations/:invitationId/accept
Authorization: Bearer <token>
```

### 55. Reject Invitation

```http
POST /api/team-invitations/:invitationId/reject
Authorization: Bearer <token>
```

### 56. Cancel Invitation

```http
POST /api/team-invitations/:invitationId/cancel
Authorization: Bearer <token>
```

---

## 📝 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 🔒 Authentication Levels

- **Public**: Không cần token
- **Protected**: Cần JWT token
- **Verified**: Cần JWT token + email đã verify
- **Admin**: Cần JWT token + role admin
- **Organizer**: Cần JWT token + role organizer
- **AdminOrOrganizer**: Cần JWT token + role admin hoặc organizer

---

## 📤 File Upload

Các API có upload file sử dụng `multipart/form-data`:

- Avatar upload: field name `avatar`
- Project image: field name `image`
- File size limit: 5MB
- Allowed types: jpeg, jpg, png, gif, webp

---

## 🌐 CORS

API hỗ trợ CORS cho frontend URL được cấu hình trong biến môi trường `FRONTEND_URL` (mặc định: `http://localhost:5173`).
