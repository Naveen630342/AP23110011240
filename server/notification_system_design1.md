# Notification System Design



#  Stage 1: API Design

##  Endpoints

### 1. Get Notifications

```http
GET /api/notifications?studentId=1042&page=1&limit=10
Authorization: Bearer <token>
```

### Response:

```json
{
  "notifications": [
    {
      "id": "n1",
      "studentId": "1042",
      "type": "Placement",
      "message": "You are shortlisted",
      "isRead": false,
      "createdAt": "2026-05-01T10:00:00Z"
    }
  ],
  "page": 1,
  "total": 100
}
```

---

---

