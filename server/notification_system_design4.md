
# Stage 4: Performance Optimization

## Problem:

 DB hit on every page load

---

##  Solutions:

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

##  Final Approach:

 Redis + WebSockets + Pagination

---
