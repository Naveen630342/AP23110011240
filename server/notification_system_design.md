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

# Stage 2: Database Design

## 🔹 Choice:

MongoDB (scalable, flexible schema)

## 🔹 Schema:

```js
const NotificationSchema = {
  _id: ObjectId,
  studentId: String,
  type: String, 
  message: String,
  isRead: Boolean,
  createdAt: Date
};
```

---

## 🔹 Problems at Scale:

* Large data volume
* Slow queries
* High read load

## 🔹 Solutions:

* Indexing
* Pagination
* Sharding
* Caching (Redis)

---

#  Stage 3: Query Optimization

## 🔹 Given Query:

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

## 🔹 Issues:

Full table scan
No index → slow for millions of records

---

## 🔹 Optimized Index:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt DESC);
```

---

## 🔹 Complexity:

 Without index → O(N)
 With index → O(log N)

---

## 🔹 Indexing Every Column?

 Not recommended:

* Increases storage
* Slows down writes

---

## 🔹 Query: Placement Notifications (Last 7 Days)

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Stage 4: Performance Optimization

## 🔹 Problem:

 DB hit on every page load

---

## 🔹 Solutions:

### 1. Redis Caching

 Cache notifications per student
 Reduce DB load

---

### 2. Pagination

```http
GET /notifications?page=1&limit=10
```

---

### 3. Lazy Loading

 Infinite scroll

---

### 4. Push-Based System

 WebSockets for real-time updates

---

## 🔹 Final Approach:

 Redis + WebSockets + Pagination

---

#  Stage 5: System Design Fix

## 🔹 Given Problem:

```js
for (student_id of student_ids) {
  send_email(student_id);
  save_to_db(student_id);
  push_to_app(student_id);
}
```

---

## 🔹 Issues:

 Sequential → very slow
 No retry mechanism
 Failure causes inconsistency

---

## 🔹 Solution: Queue-Based System

### Architecture:

 Producer → Queue → Worker

---

### Improved Code:

```js
function notifyAll(student_ids, message) {
  for (const student_id of student_ids) {
    enqueueJob({ student_id, message });
  }
}
```

---

### Worker:

```js
async function worker(job) {
  try {
    await saveToDB(job);
    await sendEmail(job);
    await pushNotification(job);
  } catch (err) {
    retry(job);
  }
}
```

---

## 🔹 Benefits:

 Parallel processing
 Retry support
 Scalable

---

#  Stage 6: Priority Inbox (Top 10 Notifications)

## 🔹 Logic:

Priority = Type Weight + Recency

| Type      | Weight |
| --------- | ------ |
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

---

## 🔹 Code:

```js
function getTopNotifications(notifications) {
  const weight = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  return notifications
    .map(n => ({
      ...n,
      score:
        weight[n.type] * 1000000000 +
        new Date(n.createdAt).getTime()
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
```

---

## 🔹 Optimization:

 Use Min Heap for large data
 Maintain top N dynamically

---

## 🔹 Handling Continuous Data:

 Use streaming
 Update heap dynamically

---

# 🎯 Conclusion

This system:

 Supports real-time notifications
 Scales to millions of records
 Handles failures using queues
 Optimizes performance with caching
 Prioritizes important notifications efficiently

---

