# Contest Buddy Backend API Documentation

## Tổng quan
Contest Buddy là một nền tảng quản lý cuộc thi lập trình với các tính năng:
- Quản lý người dùng và xác thực
- Quản lý cuộc thi và đăng ký
- Quản lý team và mời thành viên
- Chat trực tiếp
- Quản lý kỹ năng và thành tích
- Quản lý gói dịch vụ

## Base URL
```
http://localhost:3000/api
```

## Authentication
Hầu hết API yêu cầu JWT token trong header:
```
Authorization: Bearer <token>
```

## Roles
- **ADMIN**: Quản trị viên hệ thống
- **ORGANIZER**: Người tổ chức cuộc thi
- **CUSTOMER**: Người dùng thông thường

---

## 1. Authentication APIs

### 1.1 Đăng ký người dùng
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "full_name": "John Doe",
  "email": "john@example.com",
  "school": "University ABC",
  "city": "Ho Chi Minh",
  "region": "South",
  "country": "Vietnam",
  "study_field": "Computer Science"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "user123",
  "needsVerification": true,
  "emailSent": true
}
```

**Role:** Public

### 1.2 Đăng ký organizer
**POST** `/api/auth/register/organizer`

**Request Body (multipart/form-data):**
```
user: {"username": "org_user", "password": "pass123", "full_name": "Org User", "email": "org@example.com"}
organizer: {"name": "Tech Company", "email": "contact@tech.com", "description": "Leading tech company"}
avatar: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Organizer registered successfully",
  "userId": "user123",
  "organizerId": "org123",
  "accessToken": "jwt_token",
  "needsVerification": true,
  "emailSent": true
}
```

**Role:** Public

### 1.3 Đăng nhập
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user123",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

**Role:** Public

### 1.4 Xác thực email
**POST** `/api/auth/verify-email`

**Request Body:**
```json
{
  "token": "verification_token"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Role:** Public

### 1.5 Quên mật khẩu
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

**Role:** Public

### 1.6 Đổi mật khẩu
**POST** `/api/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Role:** Authenticated users

---

## 2. Profile Management APIs

### 2.1 Lấy thông tin customer profile
**GET** `/api/customer/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "profile123",
    "user_id": "user123",
    "bio": "Software developer",
    "avatar_url": "https://example.com/avatar.jpg",
    "social_links": [],
    "user": {
      "username": "john_doe",
      "full_name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Role:** Authenticated users

### 2.2 Cập nhật customer profile
**PUT** `/api/customer/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bio": "Updated bio",
  "social_links": [
    {
      "platform": "github",
      "url": "https://github.com/johndoe"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": { ... }
}
```

**Role:** Authenticated users

### 2.3 Cập nhật avatar
**POST** `/api/customer/avatar`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** `multipart/form-data` với file avatar

**Response:**
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "avatar_url": "https://example.com/new_avatar.jpg"
}
```

**Role:** Authenticated users

---

## 3. Competition Management APIs

### 3.1 Tạo cuộc thi
**POST** `/api/competitions`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Hackathon 2024",
  "description": "Annual coding competition",
  "category": "hackathon",
  "plan_id": "plan123",
  "start_date": "2024-06-01T00:00:00Z",
  "end_date": "2024-06-03T23:59:59Z",
  "registration_deadline": "2024-05-25T23:59:59Z",
  "location": "Ho Chi Minh City",
  "prize_pool_text": "Total prize: $10,000",
  "max_participants": 100,
  "isRegisteredAsTeam": true,
  "maxParticipantsPerTeam": 4,
  "level": "intermediate",
  "website": "https://hackathon2024.com",
  "rules": "Competition rules...",
  "featured": true
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Competition created successfully",
  "data": {
    "id": "comp123",
    "title": "Hackathon 2024",
    "organizer_id": "org123",
    "status": "draft"
  }
}
```

**Role:** Admin, Organizer

### 3.2 Lấy danh sách cuộc thi
**GET** `/api/competitions`

**Query Parameters:**
- `page`: Số trang (default: 1)
- `limit`: Số item per page (default: 10)
- `category`: Lọc theo category
- `status`: Lọc theo status
- `featured`: Lọc cuộc thi nổi bật (true/false)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "comp123",
      "title": "Hackathon 2024",
      "description": "Annual coding competition",
      "category": "hackathon",
      "status": "published",
      "start_date": "2024-06-01T00:00:00Z",
      "end_date": "2024-06-03T23:59:59Z",
      "location": "Ho Chi Minh City",
      "featured": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

**Role:** Public

### 3.3 Lấy chi tiết cuộc thi
**GET** `/api/competitions/:competitionId`

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "comp123",
    "title": "Hackathon 2024",
    "description": "Annual coding competition",
    "category": "hackathon",
    "status": "published",
    "start_date": "2024-06-01T00:00:00Z",
    "end_date": "2024-06-03T23:59:59Z",
    "registration_deadline": "2024-05-25T23:59:59Z",
    "location": "Ho Chi Minh City",
    "prize_pool_text": "Total prize: $10,000",
    "max_participants": 100,
    "participants_count": 25,
    "organizer": {
      "id": "org123",
      "name": "Tech Company"
    }
  }
}
```

**Role:** Public

### 3.4 Đăng ký tham gia cuộc thi
**POST** `/api/competitions/:competitionId/register`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for competition",
  "registration": {
    "id": "reg123",
    "competition_id": "comp123",
    "user_id": "user123",
    "registration_date": "2024-05-20T10:00:00Z"
  }
}
```

**Role:** Authenticated users

---

## 4. Team Management APIs

### 4.1 Tạo team
**POST** `/api/teams`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Team Alpha",
  "description": "Best coding team",
  "max_members": 4,
  "competition_id": "comp123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "id": "team123",
    "name": "Team Alpha",
    "description": "Best coding team",
    "leader_id": "user123",
    "max_members": 4,
    "status": "active"
  }
}
```

**Role:** Authenticated users

### 4.2 Lấy thông tin team
**GET** `/api/teams/:teamId`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "team123",
    "name": "Team Alpha",
    "description": "Best coding team",
    "leader_id": "user123",
    "max_members": 4,
    "status": "active",
    "members": [
      {
        "id": "member123",
        "user_id": "user123",
        "role": "leader",
        "user": {
          "username": "john_doe",
          "full_name": "John Doe"
        }
      }
    ]
  }
}
```

**Role:** Public

### 4.3 Lấy danh sách team của user
**GET** `/api/user/teams`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "team123",
      "name": "Team Alpha",
      "role": "leader",
      "status": "active"
    }
  ]
}
```

**Role:** Authenticated users

---

## 5. Chat APIs

### 5.1 Tạo cuộc trò chuyện trực tiếp
**POST** `/api/chat/conversations/direct`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "peerId": "user456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "conv123",
    "type": "direct",
    "participants": [
      {
        "user_id": "user123",
        "username": "john_doe"
      },
      {
        "user_id": "user456",
        "username": "jane_doe"
      }
    ]
  }
}
```

**Role:** Authenticated users

### 5.2 Lấy danh sách cuộc trò chuyện
**GET** `/api/chat/conversations`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "conv123",
      "type": "direct",
      "last_message": {
        "content": "Hello!",
        "created_at": "2024-05-20T10:00:00Z"
      },
      "unread_count": 2
    }
  ]
}
```

**Role:** Authenticated users

### 5.3 Gửi tin nhắn
**POST** `/api/chat/conversations/:conversationId/messages`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Hello, how are you?",
  "messageType": "text"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "msg123",
    "conversation_id": "conv123",
    "sender_id": "user123",
    "content": "Hello, how are you?",
    "message_type": "text",
    "created_at": "2024-05-20T10:00:00Z"
  }
}
```

**Role:** Authenticated users

---

## 6. Skills Management APIs

### 6.1 Lấy danh sách kỹ năng
**GET** `/api/skills/all`

**Query Parameters:**
- `page`: Số trang (default: 1)
- `limit`: Số item per page (default: 50)
- `category`: Lọc theo category
- `search`: Tìm kiếm

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "skill123",
      "name": "JavaScript",
      "category": "programming",
      "description": "Programming language"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 500,
    "itemsPerPage": 50
  }
}
```

**Role:** Public

### 6.2 Tạo kỹ năng mới
**POST** `/api/skills/create`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "React",
  "category": "programming",
  "description": "JavaScript library for building user interfaces"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Skill created successfully",
  "data": {
    "id": "skill456",
    "name": "React",
    "category": "programming",
    "description": "JavaScript library for building user interfaces"
  }
}
```

**Role:** Admin

---

## 7. Role Management APIs

### 7.1 Lấy danh sách roles
**GET** `/api/roles`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "roles": [
    {
      "id": 1,
      "name": "admin"
    },
    {
      "id": 2,
      "name": "organizer"
    },
    {
      "id": 3,
      "name": "customer"
    }
  ]
}
```

**Role:** Admin

### 7.2 Lấy roles của user
**GET** `/api/roles/user/:userId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "roles": [
    {
      "id": 2,
      "name": "organizer"
    }
  ]
}
```

**Role:** Admin, Organizer

### 7.3 Gán role cho user
**POST** `/api/roles/assign`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "userId": "user123",
  "roleName": "organizer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role assigned successfully"
}
```

**Role:** Admin

### 7.4 Xóa role của user
**POST** `/api/roles/remove`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "userId": "user123",
  "roleName": "organizer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role removed successfully"
}
```

**Role:** Admin

---

## 8. User Skills Management APIs

### 8.1 Lấy kỹ năng của user
**GET** `/api/user/skills`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "skills": [
    {
      "id": "skill123",
      "skill_id": "skill456",
      "user_id": "user123",
      "level": "intermediate",
      "skill": {
        "name": "JavaScript",
        "category": "programming"
      }
    }
  ]
}
```

**Role:** Authenticated users

### 8.2 Thêm kỹ năng cho user
**POST** `/api/user/skills`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "skill_id": "skill456",
  "level": "intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Skill added successfully",
  "userSkill": {
    "id": "skill123",
    "skill_id": "skill456",
    "user_id": "user123",
    "level": "intermediate"
  }
}
```

**Role:** Authenticated users

### 8.3 Cập nhật kỹ năng của user
**PUT** `/api/user/skills/:skillId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "level": "advanced"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Skill updated successfully",
  "userSkill": {
    "id": "skill123",
    "level": "advanced"
  }
}
```

**Role:** Authenticated users

### 8.4 Xóa kỹ năng của user
**DELETE** `/api/user/skills/:skillId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Skill removed successfully"
}
```

**Role:** Authenticated users

---

## 9. User Achievements Management APIs

### 9.1 Lấy thành tích của user
**GET** `/api/user/achievements`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "achievements": [
    {
      "id": "ach123",
      "user_id": "user123",
      "title": "First Competition Win",
      "description": "Won first place in coding competition",
      "date_earned": "2024-05-20T10:00:00Z",
      "certificate_url": "https://example.com/cert.jpg"
    }
  ]
}
```

**Role:** Authenticated users

### 9.2 Thêm thành tích cho user
**POST** `/api/user/achievements`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Hackathon Winner",
  "description": "Won first place in hackathon",
  "date_earned": "2024-05-20T10:00:00Z",
  "certificate_url": "https://example.com/cert.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Achievement added successfully",
  "achievement": {
    "id": "ach123",
    "title": "Hackathon Winner",
    "description": "Won first place in hackathon"
  }
}
```

**Role:** Authenticated users

### 9.3 Cập nhật thành tích
**PUT** `/api/user/achievements/:achievementId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Achievement Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Achievement updated successfully",
  "achievement": {
    "id": "ach123",
    "title": "Updated Achievement Title"
  }
}
```

**Role:** Authenticated users

### 9.4 Xóa thành tích
**DELETE** `/api/user/achievements/:achievementId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Achievement deleted successfully"
}
```

**Role:** Authenticated users

---

## 10. User Projects Management APIs

### 10.1 Lấy dự án của user
**GET** `/api/user/projects`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "projects": [
    {
      "id": "proj123",
      "user_id": "user123",
      "title": "E-commerce Website",
      "description": "Full-stack e-commerce application",
      "technologies": ["React", "Node.js", "MongoDB"],
      "github_url": "https://github.com/user/project",
      "demo_url": "https://demo.example.com",
      "image_url": "https://example.com/project.jpg",
      "created_at": "2024-05-20T10:00:00Z"
    }
  ]
}
```

**Role:** Authenticated users

### 10.2 Thêm dự án cho user
**POST** `/api/user/projects`

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```
title: "New Project"
description: "Project description"
technologies: ["React", "Node.js"]
github_url: "https://github.com/user/project"
demo_url: "https://demo.example.com"
image: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Project added successfully",
  "project": {
    "id": "proj123",
    "title": "New Project",
    "description": "Project description"
  }
}
```

**Role:** Authenticated users

### 10.3 Cập nhật dự án
**PUT** `/api/user/projects/:projectId`

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```
title: "Updated Project"
description: "Updated description"
image: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "project": {
    "id": "proj123",
    "title": "Updated Project"
  }
}
```

**Role:** Authenticated users

### 10.4 Xóa dự án
**DELETE** `/api/user/projects/:projectId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Role:** Authenticated users

---

## 11. Team Invitation Management APIs

### 11.1 Tạo lời mời team
**POST** `/api/team-invitations`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "teamId": "team123",
  "inviteeId": "user456",
  "message": "Join our team for the hackathon!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Invitation sent successfully",
  "data": {
    "id": "inv123",
    "team_id": "team123",
    "inviter_id": "user123",
    "invitee_id": "user456",
    "status": "pending",
    "message": "Join our team for the hackathon!"
  }
}
```

**Role:** Authenticated users

### 11.2 Lấy lời mời theo ID
**GET** `/api/team-invitations/:invitationId`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "inv123",
    "team": {
      "id": "team123",
      "name": "Team Alpha"
    },
    "inviter": {
      "id": "user123",
      "username": "john_doe"
    },
    "invitee": {
      "id": "user456",
      "username": "jane_doe"
    },
    "status": "pending",
    "message": "Join our team!"
  }
}
```

**Role:** Public

### 11.3 Lấy lời mời của team
**GET** `/api/teams/:teamId/invitations`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "inv123",
      "invitee": {
        "id": "user456",
        "username": "jane_doe"
      },
      "status": "pending",
      "created_at": "2024-05-20T10:00:00Z"
    }
  ]
}
```

**Role:** Team members

### 11.4 Lấy lời mời của user
**GET** `/api/user/invitations`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "inv123",
      "team": {
        "id": "team123",
        "name": "Team Alpha"
      },
      "inviter": {
        "id": "user123",
        "username": "john_doe"
      },
      "status": "pending",
      "message": "Join our team!"
    }
  ]
}
```

**Role:** Authenticated users

### 11.5 Chấp nhận lời mời
**POST** `/api/team-invitations/:invitationId/accept`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Invitation accepted successfully",
  "data": {
    "id": "member123",
    "team_id": "team123",
    "user_id": "user456",
    "role": "member"
  }
}
```

**Role:** Authenticated users

### 11.6 Từ chối lời mời
**POST** `/api/team-invitations/:invitationId/reject`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Invitation rejected successfully",
  "data": {
    "id": "inv123",
    "status": "rejected"
  }
}
```

**Role:** Authenticated users

### 11.7 Hủy lời mời
**POST** `/api/team-invitations/:invitationId/cancel`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Invitation cancelled successfully",
  "data": {
    "id": "inv123",
    "status": "cancelled"
  }
}
```

**Role:** Inviter or Team leader

---

## 12. Organizer Profile Management APIs

### 12.1 Lấy profile organizer
**GET** `/api/organizer/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "org123",
    "user_id": "user123",
    "name": "Tech Company",
    "email": "contact@tech.com",
    "avatar_url": "https://example.com/avatar.jpg",
    "description": "Leading tech company",
    "address": "123 Tech Street",
    "phone": "+1234567890",
    "website": "https://techcompany.com"
  }
}
```

**Role:** Admin, Organizer

### 12.2 Cập nhật profile organizer
**PUT** `/api/organizer/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Company Name",
  "description": "Updated description",
  "address": "456 New Street",
  "phone": "+0987654321",
  "website": "https://newwebsite.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": {
    "id": "org123",
    "name": "Updated Company Name"
  }
}
```

**Role:** Admin, Organizer

### 12.3 Cập nhật avatar organizer
**POST** `/api/organizer/avatar`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** `multipart/form-data` với file avatar

**Response:**
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "avatar_url": "https://example.com/new_avatar.jpg"
}
```

**Role:** Admin, Organizer

### 12.4 Lấy profile organizer công khai
**GET** `/api/organizer/:organizerId`

**Response:**
```json
{
  "success": true,
  "profile": {
    "organizerId": "org123",
    "name": "Tech Company",
    "email": "contact@tech.com",
    "avatar_url": "https://example.com/avatar.jpg",
    "description": "Leading tech company",
    "address": "123 Tech Street",
    "phone": "+1234567890",
    "website": "https://techcompany.com"
  }
}
```

**Role:** Public

---

## 13. Competition Registration APIs

### 13.1 Đăng ký tham gia cuộc thi
**POST** `/api/competitions/:competitionId/register`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "teamId": "team123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for competition",
  "registration": {
    "id": "reg123",
    "competition_id": "comp123",
    "user_id": "user123",
    "team_id": "team123",
    "registration_date": "2024-05-20T10:00:00Z"
  }
}
```

**Role:** Authenticated users

### 13.2 Kiểm tra đăng ký cuộc thi
**GET** `/api/competitions/:competitionId/participants/check`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "isRegistered": true,
  "registration": {
    "id": "reg123",
    "registration_date": "2024-05-20T10:00:00Z"
  }
}
```

**Role:** Authenticated users

### 13.3 Lấy cuộc thi đã tham gia
**GET** `/api/user/participated-competitions`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "competitions": [
    {
      "id": "comp123",
      "title": "Hackathon 2024",
      "status": "completed",
      "registration_date": "2024-05-20T10:00:00Z"
    }
  ]
}
```

**Role:** Authenticated users

---

## 14. Plans Management APIs

### 14.1 Lấy danh sách gói dịch vụ
**GET** `/api/plans`

**Query Parameters:**
- `page`: Số trang
- `limit`: Số item per page
- `status`: Lọc theo status
- `search`: Tìm kiếm
- `minPrice`, `maxPrice`: Lọc theo giá
- `currency`: Lọc theo tiền tệ

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "plan123",
      "name": "Basic Plan",
      "description": "Basic features",
      "price_amount": 0,
      "currency": "USD",
      "status": "active"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

**Role:** Public

### 14.2 Tạo gói dịch vụ mới
**POST** `/api/plans`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Premium Plan",
  "description": "Premium features",
  "price_amount": 99.99,
  "currency": "USD",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plan created successfully",
  "data": {
    "id": "plan456",
    "name": "Premium Plan",
    "price_amount": 99.99,
    "currency": "USD",
    "status": "active"
  }
}
```

**Role:** Admin

### 14.3 Lấy gói dịch vụ theo ID
**GET** `/api/plans/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "plan123",
    "name": "Basic Plan",
    "description": "Basic features",
    "price_amount": 0,
    "currency": "USD",
    "status": "active"
  }
}
```

**Role:** Public

### 14.4 Cập nhật gói dịch vụ
**PUT** `/api/plans/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Plan",
  "description": "Updated description",
  "price_amount": 49.99
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plan updated successfully",
  "data": {
    "id": "plan123",
    "name": "Updated Plan",
    "price_amount": 49.99
  }
}
```

**Role:** Admin

### 14.5 Xóa gói dịch vụ
**DELETE** `/api/plans/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Plan deleted successfully"
}
```

**Role:** Admin

### 14.6 Lấy gói dịch vụ với features
**GET** `/api/plans/:id/features`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "plan123",
    "name": "Basic Plan",
    "features": [
      {
        "id": "feat123",
        "name": "Create Competition",
        "description": "Can create up to 5 competitions"
      }
    ]
  }
}
```

**Role:** Public

### 14.7 Cập nhật trạng thái gói dịch vụ
**PATCH** `/api/plans/:id/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "inactive"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plan status updated successfully"
}
```

**Role:** Admin

---

## 15. Payment Management APIs

### 15.1 Tạo thanh toán cho booking
**POST** `/api/payments/booking/:appointmentId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Payment created successfully",
  "data": {
    "paymentId": "pay123",
    "orderCode": 123456,
    "checkoutUrl": "https://payos.vn/web/123456",
    "amount": 100000,
    "currency": "VND"
  }
}
```

**Role:** Authenticated users

### 15.2 Lấy trạng thái thanh toán
**GET** `/api/payments/:paymentId/status`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay123",
    "status": "paid",
    "amount": 100000,
    "transactionId": "txn123",
    "paidAt": "2024-05-20T10:00:00Z"
  }
}
```

**Role:** Authenticated users

### 15.3 Hủy thanh toán
**POST** `/api/payments/:orderCode/cancel`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Payment cancelled successfully"
}
```

**Role:** Authenticated users

### 15.4 Lấy danh sách thanh toán của customer
**GET** `/api/payments/customer`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: Số trang
- `limit`: Số item per page
- `status`: Lọc theo status
- `fromDate`, `toDate`: Lọc theo ngày

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "paymentId": "pay123",
      "orderCode": 123456,
      "amount": 100000,
      "status": "paid",
      "createdAt": "2024-05-20T10:00:00Z",
      "paidAt": "2024-05-20T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

**Role:** Authenticated users

### 15.5 Webhook từ PayOS
**POST** `/api/payments/webhook`

**Headers:** `X-PayOS-Signature: <signature>`

**Request Body:**
```json
{
  "orderCode": 123456,
  "status": "PAID",
  "amount": 100000,
  "transactionId": "txn123",
  "transactionTime": "2024-05-20T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed successfully"
}
```

**Role:** PayOS System

### 15.6 Trang thanh toán thành công
**GET** `/api/payments/success`

**Query Parameters:**
- `code`: Mã trả về từ PayOS
- `id`: ID giao dịch
- `status`: Trạng thái thanh toán
- `orderCode`: Mã đơn hàng

**Response:** HTML page

**Role:** Public

### 15.7 Trang hủy thanh toán
**GET** `/api/payments/cancel`

**Query Parameters:**
- `code`: Mã trả về từ PayOS
- `id`: ID giao dịch
- `status`: Trạng thái thanh toán
- `orderCode`: Mã đơn hàng

**Response:** HTML page

**Role:** Public

### 15.8 Đồng bộ trạng thái thanh toán
**POST** `/api/payments/:orderCode/sync`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Payment status synced successfully",
  "data": {
    "paymentId": "pay123",
    "orderCode": 123456,
    "previousStatus": "pending",
    "newStatus": "paid",
    "payosStatus": "PAID"
  }
}
```

**Role:** Authenticated users

---

## Error Responses

### Common Error Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

### Common Error Messages
- `"Authentication required"`: Cần đăng nhập
- `"Access denied. Admin role required"`: Cần quyền admin
- `"Email not verified"`: Email chưa được xác thực
- `"Competition not found"`: Không tìm thấy cuộc thi
- `"Team not found"`: Không tìm thấy team
- `"Invalid token"`: Token không hợp lệ

---

## Rate Limiting
- Authentication endpoints: 5 requests/minute
- Other endpoints: 100 requests/minute

## CORS
API hỗ trợ CORS cho các domain được cấu hình.

## WebSocket
Chat real-time sử dụng WebSocket tại endpoint: `ws://localhost:3000`

---

## 📊 Tổng kết API

### **Tổng số API endpoints: 80+**

#### **Theo chức năng:**
- **Authentication**: 7 endpoints
- **Profile Management**: 8 endpoints  
- **Competition Management**: 10 endpoints
- **Team Management**: 8 endpoints
- **Chat**: 6 endpoints
- **Skills Management**: 7 endpoints
- **Role Management**: 4 endpoints
- **User Skills**: 4 endpoints
- **User Achievements**: 4 endpoints
- **User Projects**: 4 endpoints
- **Team Invitations**: 7 endpoints
- **Organizer Profile**: 4 endpoints
- **Competition Registration**: 3 endpoints
- **Plans Management**: 7 endpoints
- **Payment Management**: 8 endpoints

#### **Theo HTTP Methods:**
- **GET**: 35 endpoints (Lấy dữ liệu)
- **POST**: 25 endpoints (Tạo mới)
- **PUT**: 12 endpoints (Cập nhật toàn bộ)
- **PATCH**: 2 endpoints (Cập nhật một phần)
- **DELETE**: 8 endpoints (Xóa)

#### **Theo Role Requirements:**
- **Public**: 15 endpoints (Không cần authentication)
- **Authenticated**: 45 endpoints (Cần đăng nhập)
- **Admin**: 12 endpoints (Chỉ admin)
- **Organizer**: 8 endpoints (Admin hoặc Organizer)
- **Verified**: 20 endpoints (User đã xác thực email)

#### **Tính năng nổi bật:**
✅ **JWT Authentication** với refresh token  
✅ **Role-based Access Control** (Admin, Organizer, Customer)  
✅ **Email Verification** system  
✅ **File Upload** với Cloudinary  
✅ **Real-time Chat** với WebSocket  
✅ **Payment Integration** với PayOS  
✅ **Pagination** cho tất cả danh sách  
✅ **Filtering & Search** capabilities  
✅ **Team Management** với invitations  
✅ **Competition Registration** system  
✅ **Skills & Achievements** tracking  
✅ **Project Portfolio** management  

#### **Database Models:**
- User, Organizer, Customer Profile
- Competition, Team, Team Member
- Chat Conversation, Chat Message
- Skill, User Skill, Achievement, Project
- Plan, Plan Feature, Role, User Role
- Team Invitation, Competition Registration
- Payment, Finance Entry

#### **External Services:**
- **Cloudinary**: File upload & storage
- **PayOS**: Payment processing
- **Email Service**: Verification & notifications
- **WebSocket**: Real-time communication

---

## 🚀 Quick Start Guide

### 1. **Authentication Flow:**
```
1. POST /api/auth/register → Tạo tài khoản
2. POST /api/auth/verify-email → Xác thực email
3. POST /api/auth/login → Đăng nhập
4. Sử dụng accessToken trong header: Authorization: Bearer <token>
```

### 2. **Role Assignment:**
```
1. Admin gán role: POST /api/roles/assign
2. User có thể đăng ký làm organizer: POST /api/auth/register/organizer
```

### 3. **Competition Flow:**
```
1. Organizer tạo cuộc thi: POST /api/competitions
2. User đăng ký tham gia: POST /api/competitions/:id/register
3. Tạo team: POST /api/teams
4. Mời thành viên: POST /api/team-invitations
```

### 4. **Chat Flow:**
```
1. Tạo cuộc trò chuyện: POST /api/chat/conversations/direct
2. Gửi tin nhắn: POST /api/chat/conversations/:id/messages
3. WebSocket connection cho real-time
```

---

## 📝 Notes

- Tất cả API đều trả về JSON format
- Pagination mặc định: page=1, limit=10
- File upload sử dụng multipart/form-data
- WebSocket endpoint: ws://localhost:3000
- Rate limiting: 100 requests/minute (trừ auth: 5 requests/minute)
- CORS enabled cho cross-origin requests
- Health check: GET /api/health
