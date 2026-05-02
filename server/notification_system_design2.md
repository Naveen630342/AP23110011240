
# Stage 2: Database Design

##  Choice:

MongoDB (scalable, flexible schema)

##  Schema:

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

##  Problems at Scale:

* Large data volume
* Slow queries
* High read load

##  Solutions:

* Indexing
* Pagination
* Sharding
* Caching (Redis)

---
