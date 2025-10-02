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

Responses

- 201 Created

```json
{
  "status": "success",
  "message": "Competition created successfully",
  "data": { "id": "c1", "title": "Big Hack", "organizer_id": "o_456" }
}
```

- 403 Organizer required

```json
{
  "status": "error",
  "message": "Only registered organizers can create competitions"
}
```

- 400 Bad request (e.g. plan not found / not active)

```json
{ "status": "error", "message": "Plan with ID '...' not found" }
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to create competition" }
```

### 59. Get All Competitions

```http
GET /api/competitions?page=1&limit=10&category=hackathon&status=published&featured=true
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": [{ "id": "c1", "title": "Big Hack" }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get competitions" }
```

### 60. Get Featured Competitions

```http
GET /api/competitions/featured?page=1&limit=10
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": [{ "id": "c1", "title": "Big Hack" }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get featured competitions" }
```

### 61. Get Competitions by Category

```http
GET /api/competitions/category/:category?page=1&limit=10
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": [{ "id": "c1", "title": "Big Hack" }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get competitions by category" }
```

### 62. Get Competitions by Status

```http
GET /api/competitions/status/:status?page=1&limit=10
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": [{ "id": "c1", "title": "Big Hack" }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get competitions by status" }
```

### 63. Get Competition by ID

```http
GET /api/competitions/:competitionId
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": {
    "id": "c1",
    "title": "Big Hack",
    "competitionTags": ["ai"],
    "competitionRequiredSkills": [{ "name": "python", "category": "technical" }]
  }
}
```

- 404 Not found

```json
{ "status": "error", "message": "Competition not found" }
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get competition" }
```

### 64. Get Competition Participants

```http
GET /api/competitions/:competitionId/participants?page=1&limit=10
```

Responses

- 200 OK

```json
{
  "status": "success",
  "data": [
    {
      "user_id": "u_456",
      "status": "registered",
      "user": { "id": "u_456", "email": "x@y.com", "full_name": "Bob" }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

- 404 Not found

```json
{ "status": "error", "message": "Competition not found" }
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to get competition participants" }
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

Responses

- 200 OK

```json
{
  "status": "success",
  "message": "Competition updated successfully",
  "data": { "id": "c1", "title": "Big Hack" }
}
```

- 403 Forbidden

```json
{ "status": "error", "message": "Not authorized to update this competition" }
```

- 400 Bad request (e.g. plan invalid/not active)

```json
{ "status": "error", "message": "Plan with ID '...' is not active" }
```

- 404 Not found

```json
{ "status": "error", "message": "Competition not found" }
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to update competition" }
```

### 66. Delete Competition

```http
DELETE /api/competitions/:competitionId
Authorization: Bearer <organizer_token>
```

Responses

- 200 OK

```json
{ "status": "success", "message": "Competition deleted successfully" }
```

- 404 Not found

```json
{ "status": "error", "message": "Competition not found" }
```

- 500 Server error

```json
{ "status": "error", "message": "Failed to delete competition" }
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

---

## 📦 Response examples (per group)

Lưu ý: Đây là ví dụ điển hình dựa trên controllers/services; field thực tế phụ thuộc dữ liệu.

### 🏥 Health

GET /api/health

```json
{ "status": "success", "message": "API is healthy" }
```

### 🔐 Auth

POST /api/auth/register

```json
{
  "success": true,
  "message": "User registered successfully",
  "emailSent": true,
  "userId": "u_123"
}
```

POST /api/auth/register/organizer

```json
{
  "success": true,
  "message": "Organizer registered successfully",
  "userId": "u_123",
  "organizerId": "o_456",
  "accessToken": "...",
  "refreshToken": "...",
  "needsVerification": true,
  "emailSent": true,
  "avatar_url": "https://..."
}
```

POST /api/auth/login

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "u_123",
    "username": "alice",
    "email": "a@x.com",
    "full_name": "Alice",
    "roles": ["customer"]
  },
  "accessToken": "...",
  "refreshToken": "..."
}
```

POST /api/auth/verify-token

```json
{ "success": true, "userId": "u_123" }
```

POST /api/auth/verify-email

```json
{ "success": true, "message": "Email verified successfully" }
```

POST /api/auth/resend-verification

```json
{ "success": true, "message": "Verification email sent", "emailSent": true }
```

POST /api/auth/forgot-password

```json
{ "success": true, "message": "Password reset email sent", "emailSent": true }
```

POST /api/auth/reset-password

```json
{ "success": true, "message": "Password reset successfully" }
```

POST /api/auth/refresh-token

```json
{ "success": true, "accessToken": "..." }
```

POST /api/auth/change-password

```json
{ "success": true, "message": "Password changed successfully" }
```

### 👥 Roles (Admin)

GET /api/roles

```json
{
  "success": true,
  "roles": [
    { "id": 1, "name": "admin" },
    { "id": 2, "name": "organizer" }
  ]
}
```

GET /api/roles/user/:userId

```json
{ "success": true, "roles": [{ "id": 2, "name": "organizer" }] }
```

POST /api/roles/assign | /remove

```json
{ "success": true, "message": "Role assigned successfully" }
```

### 🏢 Organizer profile

GET /api/organizer/profile

```json
{
  "success": true,
  "profile": {
    "userId": "u_123",
    "username": "alice",
    "email": "a@x.com",
    "full_name": "Alice",
    "organizerId": "o_456",
    "organizerName": "ACME",
    "organizerEmail": "org@x.com",
    "avatar_url": "https://...",
    "description": "...",
    "address": "...",
    "phone": "...",
    "website": "..."
  }
}
```

PUT /api/organizer/profile

```json
{
  "success": true,
  "message": "Organizer profile updated successfully",
  "organizerId": "o_456"
}
```

POST /api/organizer/avatar

```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "avatar_url": "https://..."
}
```

GET /api/organizer/:organizerId

```json
{
  "success": true,
  "profile": {
    "organizerId": "o_456",
    "name": "ACME",
    "email": "org@x.com",
    "avatar_url": "https://...",
    "description": "...",
    "address": "...",
    "phone": "...",
    "website": "..."
  }
}
```

### 👤 Customer profile

GET /api/customer/profile

```json
{
  "success": true,
  "profile": {
    "userId": "u_123",
    "username": "alice",
    "email": "a@x.com",
    "full_name": "Alice",
    "avatar_url": "https://...",
    "bio": "...",
    "school": "...",
    "city": "...",
    "region": "...",
    "country": "...",
    "study_field": "...",
    "join_date": "2024-01-01T00:00:00.000Z",
    "rating": 0,
    "social_links": { "github": "", "linkedin": "", "personal": "" }
  }
}
```

PUT /api/customer/profile

```json
{ "success": true, "message": "Customer profile updated successfully" }
```

POST /api/customer/avatar

```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "avatar_url": "https://..."
}
```

GET /api/customer/:userId

```json
{
  "success": true,
  "profile": {
    "userId": "u_123",
    "username": "alice",
    "full_name": "Alice",
    "avatar_url": "https://...",
    "bio": "...",
    "school": "...",
    "city": "...",
    "region": "...",
    "country": "...",
    "study_field": "...",
    "join_date": "...",
    "rating": 0,
    "social_links": { "github": "", "linkedin": "", "personal": "" }
  }
}
```

### 🛠️ User skills

GET /api/skills

```json
{
  "success": true,
  "skills": [{ "_id": "s1", "name": "JavaScript", "category": "technical" }]
}
```

GET /api/user/skills | /api/user/:userId/skills

```json
{
  "success": true,
  "skills": [
    {
      "_id": "us1",
      "user_id": "u_123",
      "skill_name": "JavaScript",
      "category": "technical",
      "level": "advanced",
      "experience_years": 3
    }
  ]
}
```

POST /api/user/skills

```json
{
  "success": true,
  "message": "Skill added successfully",
  "skill": {
    "_id": "us1",
    "user_id": "u_123",
    "skill_name": "JavaScript",
    "category": "technical",
    "level": "beginner",
    "experience_years": 0
  }
}
```

PUT /api/user/skills/:skillId

```json
{
  "success": true,
  "message": "Skill updated successfully",
  "skill": {
    "_id": "us1",
    "skill_name": "JavaScript",
    "category": "technical",
    "level": "advanced",
    "experience_years": 2
  }
}
```

DELETE /api/user/skills/:skillId

```json
{ "success": true, "message": "Skill deleted successfully" }
```

### 🏆 Achievements

GET /api/user/achievements | /api/user/:userId/achievements

```json
{
  "success": true,
  "achievements": [
    {
      "id": "a1",
      "user_id": "u_123",
      "competition_name": "Hackathon",
      "position": 1,
      "award": "Gold",
      "achieved_at": "2024-01-01T00:00:00.000Z",
      "category": "tech",
      "description": ""
    }
  ]
}
```

GET /api/achievements/:achievementId

```json
{
  "success": true,
  "achievement": { "id": "a1", "competition_name": "Hackathon" }
}
```

POST /api/user/achievements

```json
{
  "success": true,
  "message": "Achievement added successfully",
  "achievement": {
    "id": "a1",
    "user_id": "u_123",
    "competition_name": "Hackathon"
  }
}
```

PUT /api/user/achievements/:achievementId

```json
{
  "success": true,
  "message": "Achievement updated successfully",
  "achievement": { "id": "a1", "competition_name": "Hackathon" }
}
```

DELETE /api/user/achievements/:achievementId

```json
{ "success": true, "message": "Achievement deleted successfully" }
```

### 📁 Projects

GET /api/user/projects | /api/user/:userId/projects

```json
{
  "success": true,
  "projects": [
    {
      "id": "p1",
      "user_id": "u_123",
      "title": "Portfolio",
      "description": "...",
      "category": "web",
      "tags": ["react"],
      "image_url": "https://...",
      "project_url": "https://...",
      "github_url": "https://...",
      "created_at": "..."
    }
  ]
}
```

GET /api/projects/:projectId

```json
{ "success": true, "project": { "id": "p1", "title": "Portfolio" } }
```

POST /api/user/projects

```json
{
  "success": true,
  "message": "Project added successfully",
  "project": { "id": "p1", "title": "Portfolio" }
}
```

PUT /api/user/projects/:projectId

```json
{
  "success": true,
  "message": "Project updated successfully",
  "project": { "id": "p1", "title": "Portfolio" }
}
```

DELETE /api/user/projects/:projectId

```json
{ "success": true, "message": "Project deleted successfully" }
```

### 👥 Teams

POST /api/teams

```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "id": "t1",
    "name": "Winners",
    "leader_id": "u_123",
    "max_members": 5,
    "status": "active"
  }
}
```

GET /api/teams/:teamId

```json
{ "success": true, "data": { "id": "t1", "name": "Winners" } }
```

PUT /api/teams/:teamId

```json
{
  "success": true,
  "message": "Team updated successfully",
  "data": { "id": "t1", "name": "Winners" }
}
```

DELETE /api/teams/:teamId

```json
{ "success": true, "message": "Team deleted successfully" }
```

GET /api/teams/:teamId/members

```json
{
  "success": true,
  "data": [
    {
      "team_id": "t1",
      "user_id": "u_123",
      "role": "leader",
      "status": "active"
    }
  ]
}
```

DELETE /api/teams/:teamId/members/:memberId

```json
{ "success": true, "message": "Team member removed successfully" }
```

PUT /api/teams/:teamId/members/:memberId/role

```json
{
  "success": true,
  "message": "Team member role updated successfully",
  "data": { "team_id": "t1", "user_id": "u_456", "role": "leader" }
}
```

GET /api/user/teams | /api/user/:userId/teams

```json
{ "success": true, "data": [{ "id": "t1", "name": "Winners" }] }
```

### 📨 Team invitations

POST /api/team-invitations

```json
{
  "success": true,
  "message": "Invitation sent successfully",
  "data": {
    "id": "inv1",
    "team_id": "t1",
    "inviter_id": "u_123",
    "invitee_id": "u_456",
    "status": "pending"
  }
}
```

GET /api/team-invitations/:invitationId

```json
{ "success": true, "data": { "id": "inv1", "status": "pending" } }
```

GET /api/teams/:teamId/invitations

```json
{ "success": true, "data": [{ "id": "inv1", "status": "pending" }] }
```

GET /api/user/invitations

```json
{
  "success": true,
  "data": [{ "id": "inv1", "team_id": "t1", "status": "pending" }]
}
```

POST /api/team-invitations/:invitationId/accept

```json
{
  "success": true,
  "message": "Invitation accepted successfully",
  "data": {
    "team_id": "t1",
    "user_id": "u_456",
    "role": "member",
    "status": "active"
  }
}
```

POST /api/team-invitations/:invitationId/reject

```json
{
  "success": true,
  "message": "Invitation rejected successfully",
  "data": { "id": "inv1", "status": "rejected" }
}
```

POST /api/team-invitations/:invitationId/cancel

```json
{
  "success": true,
  "message": "Invitation cancelled successfully",
  "data": { "id": "inv1", "status": "cancelled" }
}
```

### 🏆 Competitions

POST /api/competitions

```json
{
  "status": "success",
  "message": "Competition created successfully",
  "data": { "id": "c1", "title": "Big Hack", "organizer_id": "o_456" }
}
```

GET /api/competitions

```json
{
  "status": "success",
  "data": [{ "id": "c1", "title": "Big Hack" }],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

GET /api/competitions/:competitionId

```json
{
  "status": "success",
  "data": {
    "id": "c1",
    "title": "Big Hack",
    "competitionTags": ["ai"],
    "competitionRequiredSkills": [{ "name": "python", "category": "technical" }]
  }
}
```

GET /api/competitions/:competitionId/participants

```json
{
  "status": "success",
  "data": [
    {
      "user_id": "u_456",
      "status": "registered",
      "user": { "id": "u_456", "email": "x@y.com", "full_name": "Bob" }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

PUT /api/competitions/:competitionId

```json
{
  "status": "success",
  "message": "Competition updated successfully",
  "data": { "id": "c1", "title": "Big Hack" }
}
```

DELETE /api/competitions/:competitionId

```json
{ "status": "success", "message": "Competition deleted successfully" }
```
