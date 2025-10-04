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

## 7. Plans Management APIs

### 7.1 Lấy danh sách gói dịch vụ
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

### 7.2 Tạo gói dịch vụ mới
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
