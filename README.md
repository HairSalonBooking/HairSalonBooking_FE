# Contest Buddy Backend API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
API sử dụng JWT Bearer Token authentication. Thêm header sau vào request:
```
Authorization: Bearer <your_token>
```

## Roles
- **ADMIN**: Quyền quản trị viên cao nhất
- **ORGANIZER**: Quyền tổ chức cuộc thi
- **CUSTOMER**: Quyền người dùng thông thường

---

## 1. Health Check

### GET /api/health
Kiểm tra trạng thái API

**Response:**
```json
{
  "status": "success",
  "message": "API is healthy"
}
```

---

## 2. Authentication APIs

### POST /api/auth/register
Đăng ký tài khoản người dùng mới

**Request Body:**
```json
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

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "string",
  "needsVerification": true,
  "emailSent": true
}
```

### POST /api/auth/register/organizer
Đăng ký tài khoản tổ chức

**Request:** `multipart/form-data`
- `user`: JSON string chứa thông tin user
- `organizer`: JSON string chứa thông tin organizer
- `avatar`: File ảnh (optional)

**Response:**
```json
{
  "success": true,
  "message": "Organizer registered successfully",
  "userId": "string",
  "organizerId": "string",
  "accessToken": "string",
  "needsVerification": true,
  "emailSent": true,
  "avatar_url": "string"
}
```

### POST /api/auth/login
Đăng nhập

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "is_verified": boolean
  },
  "accessToken": "string",
  "refreshToken": "string"
}
```

### POST /api/auth/verify-token
Xác thực token

**Request Body:**
```json
{
  "token": "string"
}
```

### POST /api/auth/verify-email
Xác thực email

**Request Body:**
```json
{
  "token": "string"
}
```

### POST /api/auth/resend-verification
Gửi lại email xác thực

**Request Body:**
```json
{
  "email": "string"
}
```

### POST /api/auth/forgot-password
Quên mật khẩu

**Request Body:**
```json
{
  "email": "string"
}
```

### POST /api/auth/reset-password
Đặt lại mật khẩu

**Request Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

### POST /api/auth/refresh-token
Làm mới token

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

### POST /api/auth/change-password
Đổi mật khẩu (Yêu cầu: Authenticated)

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

---

## 3. Role Management APIs

### GET /api/roles
Lấy danh sách tất cả roles (Yêu cầu: Admin)

**Response:**
```json
{
  "success": true,
  "roles": [
    {
      "id": "string",
      "name": "string",
      "description": "string"
    }
  ]
}
```

### GET /api/roles/user/:userId
Lấy roles của user (Yêu cầu: Admin/Organizer)

**Response:**
```json
{
  "success": true,
  "roles": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

### POST /api/roles/assign
Gán role cho user (Yêu cầu: Admin)

**Request Body:**
```json
{
  "userId": "string",
  "roleName": "string"
}
```

### POST /api/roles/remove
Xóa role khỏi user (Yêu cầu: Admin)

**Request Body:**
```json
{
  "userId": "string",
  "roleName": "string"
}
```

---

## 4. Organizer Profile APIs

### GET /api/organizer/profile
Lấy profile organizer hiện tại (Yêu cầu: Admin/Organizer, Verified)

**Response:**
```json
{
  "success": true,
  "profile": {
    "organizerId": "string",
    "name": "string",
    "email": "string",
    "avatar_url": "string",
    "description": "string",
    "address": "string",
    "phone": "string",
    "website": "string"
  }
}
```

### PUT /api/organizer/profile
Cập nhật profile organizer (Yêu cầu: Admin/Organizer, Verified)

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "website": "string"
}
```

### POST /api/organizer/avatar
Cập nhật avatar organizer (Yêu cầu: Admin/Organizer, Verified)

**Request:** `multipart/form-data`
- `avatar`: File ảnh

### GET /api/organizer/:organizerId
Lấy profile organizer theo ID (Public)

---

## 5. Customer Profile APIs

### GET /api/customer/profile
Lấy profile customer hiện tại (Yêu cầu: Authenticated, Verified)

### PUT /api/customer/profile
Cập nhật profile customer (Yêu cầu: Authenticated, Verified)

### POST /api/customer/avatar
Cập nhật avatar customer (Yêu cầu: Authenticated, Verified)

### GET /api/customer/:userId
Lấy profile customer theo ID (Public)

### GET /api/customers
Lấy danh sách customer profiles với filter

**Query Parameters:**
- `page`: Số trang
- `limit`: Số lượng mỗi trang
- `search`: Tìm kiếm
- `city`, `region`, `country`: Lọc theo địa điểm
- `school`, `study_field`: Lọc theo học vấn
- `min_rating`, `max_rating`: Lọc theo rating
- `is_verified`: Lọc theo trạng thái xác thực
- `join_date_from`, `join_date_to`: Lọc theo ngày tham gia
- `skill_name`, `skill_level`: Lọc theo kỹ năng

---

## 6. User Skills APIs

### GET /api/skills
Lấy danh sách tất cả skills (Public)

### GET /api/user/skills
Lấy skills của user hiện tại (Yêu cầu: Authenticated)

### GET /api/user/:userId/skills
Lấy skills của user theo ID (Public)

### POST /api/user/skills
Thêm skill cho user (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "skill_id": "string",
  "level": "string",
  "experience_years": number
}
```

### PUT /api/user/skills/:skillId
Cập nhật skill của user (Yêu cầu: Authenticated, Verified)

### DELETE /api/user/skills/:skillId
Xóa skill của user (Yêu cầu: Authenticated, Verified)

---

## 7. User Achievements APIs

### GET /api/user/achievements
Lấy achievements của user hiện tại (Yêu cầu: Authenticated)

### GET /api/user/:userId/achievements
Lấy achievements của user theo ID (Public)

### GET /api/achievements/:achievementId
Lấy achievement theo ID (Public)

### POST /api/user/achievements
Thêm achievement cho user (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "competition_name": "string",
  "position": number,
  "award": "string",
  "achieved_at": "date",
  "category": "string",
  "description": "string"
}
```

### PUT /api/user/achievements/:achievementId
Cập nhật achievement (Yêu cầu: Authenticated, Verified)

### DELETE /api/user/achievements/:achievementId
Xóa achievement (Yêu cầu: Authenticated, Verified)

---

## 8. User Projects APIs

### GET /api/user/projects
Lấy projects của user hiện tại (Yêu cầu: Authenticated)

### GET /api/user/:userId/projects
Lấy projects của user theo ID (Public)

### GET /api/projects/:projectId
Lấy project theo ID (Public)

### POST /api/user/projects
Thêm project cho user (Yêu cầu: Authenticated, Verified)

**Request:** `multipart/form-data`
- `title`: Tên project
- `description`: Mô tả
- `technologies`: Công nghệ sử dụng
- `github_url`: Link GitHub
- `demo_url`: Link demo
- `image`: File ảnh project

### PUT /api/user/projects/:projectId
Cập nhật project (Yêu cầu: Authenticated, Verified)

### DELETE /api/user/projects/:projectId
Xóa project (Yêu cầu: Authenticated, Verified)

---

## 9. Chat APIs

### POST /api/chat/conversations/direct
Tạo hoặc lấy conversation trực tiếp (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "peerId": "string"
}
```

### GET /api/chat/conversations
Lấy danh sách conversations của user (Yêu cầu: Authenticated, Verified)

### GET /api/chat/conversations/:conversationId
Lấy thông tin conversation (Yêu cầu: Authenticated, Verified)

### GET /api/chat/conversations/:conversationId/messages
Lấy messages trong conversation (Yêu cầu: Authenticated, Verified)

**Query Parameters:**
- `limit`: Số lượng messages
- `before`: Message ID để lấy messages trước đó

### POST /api/chat/conversations/:conversationId/messages
Gửi message (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "content": "string",
  "messageType": "text|image|file|system"
}
```

### POST /api/chat/conversations/:conversationId/read
Đánh dấu conversation đã đọc (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "messageId": "string"
}
```

---

## 10. Team APIs

### POST /api/teams
Tạo team mới (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

### GET /api/teams/:teamId
Lấy thông tin team (Public)

### PUT /api/teams/:teamId
Cập nhật team (Yêu cầu: Authenticated, Verified)

### DELETE /api/teams/:teamId
Xóa team (Yêu cầu: Authenticated, Verified)

### GET /api/teams/:teamId/members
Lấy danh sách thành viên team (Public)

### DELETE /api/teams/:teamId/members/:memberId
Xóa thành viên khỏi team (Yêu cầu: Authenticated, Verified)

### PUT /api/teams/:teamId/members/:memberId/role
Thay đổi role thành viên (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "role": "leader|member"
}
```

### GET /api/user/teams
Lấy teams của user hiện tại (Yêu cầu: Authenticated)

### GET /api/user/:userId/teams
Lấy teams của user theo ID (Public)

---

## 11. Team Invitation APIs

### POST /api/team-invitations
Tạo lời mời tham gia team (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "teamId": "string",
  "inviteeId": "string",
  "message": "string"
}
```

### GET /api/team-invitations/:invitationId
Lấy thông tin invitation (Public)

### GET /api/teams/:teamId/invitations
Lấy invitations của team (Yêu cầu: Authenticated, Verified)

### GET /api/user/invitations
Lấy invitations của user (Yêu cầu: Authenticated)

### POST /api/team-invitations/:invitationId/accept
Chấp nhận invitation (Yêu cầu: Authenticated, Verified)

### POST /api/team-invitations/:invitationId/reject
Từ chối invitation (Yêu cầu: Authenticated, Verified)

### POST /api/team-invitations/:invitationId/cancel
Hủy invitation (Yêu cầu: Authenticated, Verified)

---

## 12. Competition APIs

### POST /api/competitions
Tạo cuộc thi mới (Yêu cầu: Admin/Organizer, Verified)

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "start_date": "date",
  "end_date": "date",
  "registration_deadline": "date",
  "max_participants": number,
  "prize": "string",
  "requirements": "string",
  "rules": "string"
}
```

### GET /api/competitions/constants
Lấy constants của competitions (Public)

### GET /api/competitions
Lấy danh sách competitions (Public)

**Query Parameters:**
- `page`: Số trang
- `limit`: Số lượng mỗi trang
- `category`: Lọc theo category
- `status`: Lọc theo status
- `featured`: Lọc featured competitions

### GET /api/competitions/featured
Lấy featured competitions (Public)

### GET /api/competitions/category/:category
Lấy competitions theo category (Public)

### GET /api/competitions/status/:status
Lấy competitions theo status (Public)

### GET /api/competitions/:competitionId
Lấy thông tin competition (Public)

### GET /api/competitions/:competitionId/participants
Lấy danh sách participants (Public)

### POST /api/competitions/:competitionId/register
Đăng ký tham gia competition (Yêu cầu: Authenticated, Verified)

**Request Body:**
```json
{
  "teamId": "string" // optional
}
```

### HEAD/GET /api/competitions/:competitionId/participants/check
Kiểm tra đăng ký tham gia (Yêu cầu: Authenticated)

### GET /api/user/participated-competitions
Lấy competitions đã tham gia (Yêu cầu: Authenticated, Verified)

### PUT /api/competitions/:competitionId
Cập nhật competition (Yêu cầu: Admin/Organizer, Verified)

### DELETE /api/competitions/:competitionId
Xóa competition (Yêu cầu: Admin/Organizer, Verified)

---

## 13. Skills Management APIs

### POST /api/skills/create
Tạo skill mới (Yêu cầu: Admin, Verified)

**Request Body:**
```json
{
  "name": "string",
  "category": "string",
  "description": "string"
}
```

### GET /api/skills/all
Lấy tất cả skills (Public)

**Query Parameters:**
- `page`: Số trang
- `limit`: Số lượng mỗi trang
- `category`: Lọc theo category
- `search`: Tìm kiếm

### GET /api/skills/search
Tìm kiếm skills (Public)

**Query Parameters:**
- `q`: Từ khóa tìm kiếm
- `page`: Số trang
- `limit`: Số lượng mỗi trang

### GET /api/skills/category/:category
Lấy skills theo category (Public)

### GET /api/skills/:skillId
Lấy skill theo ID (Public)

### PUT /api/skills/:skillId
Cập nhật skill (Yêu cầu: Admin, Verified)

### DELETE /api/skills/:skillId
Xóa skill (Yêu cầu: Admin, Verified)

---

## 14. Plans APIs

### POST /api/plans
Tạo plan mới (Yêu cầu: Admin, Verified)

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price_amount": number,
  "currency": "string",
  "status": "active|inactive"
}
```

### GET /api/plans
Lấy danh sách plans (Public)

**Query Parameters:**
- `page`: Số trang
- `limit`: Số lượng mỗi trang
- `status`: Lọc theo status
- `search`: Tìm kiếm
- `sortBy`: Sắp xếp theo
- `sortOrder`: Thứ tự sắp xếp
- `minPrice`, `maxPrice`: Lọc theo giá
- `currency`: Lọc theo tiền tệ

### GET /api/plans/:id
Lấy plan theo ID (Public)

### GET /api/plans/:id/features
Lấy features của plan (Public)

### GET /api/plans/status/:status
Lấy plans theo status (Public)

### PUT /api/plans/:id
Cập nhật plan (Yêu cầu: Admin, Verified)

### PATCH /api/plans/:id/status
Cập nhật status plan (Yêu cầu: Admin, Verified)

**Request Body:**
```json
{
  "status": "active|inactive"
}
```

### DELETE /api/plans/:id
Xóa plan (Yêu cầu: Admin, Verified)

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Authentication Middleware

### verifyToken
Xác thực JWT token từ Authorization header

### isVerified
Kiểm tra user đã verify email chưa

### isAdmin
Kiểm tra user có role Admin

### isAdminOrOrganizer
Kiểm tra user có role Admin hoặc Organizer

---

## File Upload

API hỗ trợ upload file với `multipart/form-data`:
- **Avatar**: Ảnh đại diện (jpeg, jpg, png, gif, webp)
- **Project Image**: Ảnh dự án
- **File Size Limit**: 5MB

---

## Pagination

Các API list hỗ trợ pagination:
- `page`: Số trang (default: 1)
- `limit`: Số lượng mỗi trang (default: 10-50)

**Response Format:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10
  }
}
```

---

## WebSocket Support

### Chat Socket
- **Endpoint**: `/socket.io/`
- **Authentication**: JWT token trong query hoặc header
- **Events**:
  - `join_conversation`: Tham gia conversation
  - `leave_conversation`: Rời conversation
  - `send_message`: Gửi message
  - `typing_start`: Bắt đầu typing
  - `typing_stop`: Dừng typing
