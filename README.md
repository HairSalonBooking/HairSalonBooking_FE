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

## 🏥 Health Check

### 1. Health Check

```http
GET /api/health
```

---

## 🔐 Authentication APIs

### 2. User Registration

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

### 3. Organizer Registration

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

### 4. User Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### 5. Verify JWT Token

```http
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "string"
}
```

### 6. Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "string"
}
```

### 7. Resend Verification Email

```http
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "string"
}
```

### 8. Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "string"
}
```

### 9. Reset Password

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "string",
  "newPassword": "string"
}
```

### 10. Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "string"
}
```

### 11. Change Password (Protected)

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

### 12. Get All Roles

```http
GET /api/roles
Authorization: Bearer <admin_token>
```

### 13. Get User Roles

```http
GET /api/roles/user/:userId
Authorization: Bearer <admin_or_organizer_token>
```

### 14. Assign Role

```http
POST /api/roles/assign
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "userId": "string",
  "roleName": "string"
}
```

### 15. Remove Role

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

### 16. Get Organizer Profile

```http
GET /api/organizer/profile
Authorization: Bearer <organizer_token>
```

### 17. Update Organizer Profile

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

### 18. Update Organizer Avatar

```http
POST /api/organizer/avatar
Authorization: Bearer <organizer_token>
Content-Type: multipart/form-data

avatar: file
```

### 19. Get Organizer Profile by ID (Public)

```http
GET /api/organizer/:organizerId
```

---

## 👤 Customer Profile APIs

### 20. Get Customer Profile

```http
GET /api/customer/profile
Authorization: Bearer <token>
```

### 21. Update Customer Profile

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

### 22. Update Customer Avatar

```http
POST /api/customer/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

avatar: file
```

### 23. Get Customer Profile by ID (Public)

```http
GET /api/customer/:userId
```

---

## 🛠️ User Skills APIs

### 24. Get All Skills (Legacy)

```http
GET /api/skills
```

### 25. Get User Skills

```http
GET /api/user/skills
Authorization: Bearer <token>
```

### 26. Get User Skills by ID

```http
GET /api/user/:userId/skills
```

### 27. Add User Skill

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

### 28. Update User Skill

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

### 29. Delete User Skill

```http
DELETE /api/user/skills/:skillId
Authorization: Bearer <token>
```

---

## 🏆 Achievements APIs

### 30. Get User Achievements

```http
GET /api/user/achievements
Authorization: Bearer <token>
```

### 31. Get User Achievements by ID

```http
GET /api/user/:userId/achievements
```

### 32. Get Achievement by ID

```http
GET /api/achievements/:achievementId
```

### 33. Add User Achievement

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

### 34. Update User Achievement

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

### 35. Delete User Achievement

```http
DELETE /api/user/achievements/:achievementId
Authorization: Bearer <token>
```

---

## 📁 Projects APIs

### 36. Get User Projects

```http
GET /api/user/projects
Authorization: Bearer <token>
```

### 37. Get User Projects by ID

```http
GET /api/user/:userId/projects
```

### 38. Get Project by ID

```http
GET /api/projects/:projectId
```

### 39. Add User Project

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

### 40. Update User Project

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

### 41. Delete User Project

```http
DELETE /api/user/projects/:projectId
Authorization: Bearer <token>
```

---

## 👥 Team APIs

### 42. Create Team

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

### 43. Get Team by ID

```http
GET /api/teams/:teamId
```

### 44. Update Team

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

### 45. Delete Team

```http
DELETE /api/teams/:teamId
Authorization: Bearer <token>
```

### 46. Get Team Members

```http
GET /api/teams/:teamId/members
```

### 47. Remove Team Member

```http
DELETE /api/teams/:teamId/members/:memberId
Authorization: Bearer <token>
```

### 48. Change Team Member Role

```http
PUT /api/teams/:teamId/members/:memberId/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "leader|member"
}
```

### 49. Get User Teams

```http
GET /api/user/teams
Authorization: Bearer <token>
```

### 50. Get User Teams by ID

```http
GET /api/user/:userId/teams
```

---

## 📨 Team Invitation APIs

### 51. Create Invitation

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

### 52. Get Invitation by ID

```http
GET /api/team-invitations/:invitationId
```

### 53. Get Team Invitations

```http
GET /api/teams/:teamId/invitations
Authorization: Bearer <token>
```

### 54. Get User Invitations

```http
GET /api/user/invitations
Authorization: Bearer <token>
```

### 55. Accept Invitation

```http
POST /api/team-invitations/:invitationId/accept
Authorization: Bearer <token>
```

### 56. Reject Invitation

```http
POST /api/team-invitations/:invitationId/reject
Authorization: Bearer <token>
```

### 57. Cancel Invitation

```http
POST /api/team-invitations/:invitationId/cancel
Authorization: Bearer <token>
```

---

## 🏆 Competition APIs

### 58. Create Competition

```http
POST /api/competitions
Authorization: Bearer <organizer_token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "category": "hackathon|datathon|designathon|business_case|coding_contest|other",
  "plan_id": "string",
  "start_date": "date",
  "end_date": "date",
  "registration_deadline": "date",
  "location": "string",
  "prize_pool_text": "string",
  "max_participants": number,
  "level": "beginner|intermediate|advanced|all_levels",
  "image_url": "string",
  "website": "string",
  "rules": "string",
  "featured": boolean,
  "status": "draft|published|registration_open|registration_closed|in_progress|completed|cancelled",
  "competitionTags": ["string"],
  "competitionRequiredSkills": [
    {
      "name": "string",
      "category": "technical|design|soft|language|other"
    }
  ]
}
```

### 59. Get All Competitions

```http
GET /api/competitions?page=1&limit=10&category=hackathon&status=published&featured=true
```

### 60. Get Featured Competitions

```http
GET /api/competitions/featured?page=1&limit=10
```

### 61. Get Competitions by Category

```http
GET /api/competitions/category/:category?page=1&limit=10
```

### 62. Get Competitions by Status

```http
GET /api/competitions/status/:status?page=1&limit=10
```

### 63. Get Competition by ID

```http
GET /api/competitions/:competitionId
```

### 64. Get Competition Participants

```http
GET /api/competitions/:competitionId/participants?page=1&limit=10
```

### 65. Update Competition

```http
PUT /api/competitions/:competitionId
Authorization: Bearer <organizer_token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "category": "string",
  "plan_id": "string",
  "start_date": "date",
  "end_date": "date",
  "registration_deadline": "date",
  "location": "string",
  "prize_pool_text": "string",
  "max_participants": number,
  "level": "string",
  "image_url": "string",
  "website": "string",
  "rules": "string",
  "featured": boolean,
  "status": "string",
  "competitionTags": ["string"],
  "competitionRequiredSkills": [
    {
      "name": "string",
      "category": "string"
    }
  ]
}
```

### 66. Delete Competition

```http
DELETE /api/competitions/:competitionId
Authorization: Bearer <organizer_token>
```

---

## 🛠️ Skills Management APIs (Admin Only)

### 67. Create Skill

```http
POST /api/skills/create
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "string",
  "category": "technical|design|soft|language|other"
}
```

### 68. Get All Skills (New)

```http
GET /api/skills/all?page=1&limit=50&category=technical&search=javascript
```

### 69. Search Skills

```http
GET /api/skills/search?q=javascript&page=1&limit=50
```

### 70. Get Skills by Category

```http
GET /api/skills/category/:category?page=1&limit=50
```

### 71. Get Skill by ID

```http
GET /api/skills/:skillId
```

### 72. Update Skill

```http
PUT /api/skills/:skillId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "string",
  "category": "technical|design|soft|language|other"
}
```

### 73. Delete Skill

```http
DELETE /api/skills/:skillId
Authorization: Bearer <admin_token>
```

---

## 💰 Plans Management APIs

### 74. Create Plan (Admin Only)

```http
POST /api/plans
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "price_amount": number,
  "currency": "VND",
  "status": "active|inactive|archived"
}
```

### 75. Get All Plans

```http
GET /api/plans?page=1&limit=10&status=active&search=premium&sortBy=price_amount&sortOrder=asc&minPrice=0&maxPrice=1000000&currency=VND
```

### 76. Get Plan by ID

```http
GET /api/plans/:id
```

### 77. Get Plan with Features

```http
GET /api/plans/:id/features
```

### 78. Get Plans by Status

```http
GET /api/plans/status/:status
```

### 79. Update Plan (Admin Only)

```http
PUT /api/plans/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "price_amount": number,
  "currency": "VND",
  "status": "active|inactive|archived"
}
```

### 80. Update Plan Status (Admin Only)

```http
PATCH /api/plans/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "active|inactive|archived"
}
```

### 81. Delete Plan (Admin Only)

```http
DELETE /api/plans/:id
Authorization: Bearer <admin_token>
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

---

## 📊 Pagination

Hầu hết các API list đều hỗ trợ pagination:

- `page`: Số trang (mặc định: 1)
- `limit`: Số items per page (mặc định: 10-50 tùy API)
- Response bao gồm `pagination` object với thông tin về total, totalPages, hasNextPage, etc.

---

## 🔍 Filtering & Search

Nhiều API hỗ trợ filtering và search:

- **Competitions**: filter by category, status, featured
- **Skills**: filter by category, search by name
- **Plans**: filter by status, search by name/description, filter by price range
- **User data**: có thể lấy theo userId cụ thể

---

## 📈 Total APIs: 81 endpoints

- Health Check: 1
- Authentication: 10
- Role Management: 4
- Organizer Profile: 4
- Customer Profile: 4
- User Skills: 6
- Achievements: 6
- Projects: 6
- Teams: 9
- Team Invitations: 7
- Competitions: 9
- Skills Management: 7
- Plans Management: 8
