
#  Stage 3: Query Optimization

##  Given Query:

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

##  Issues:

Full table scan
No index → slow for millions of records

---

##  Optimized Index:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt DESC);
```

---

##  Complexity:

 Without index → O(N)
 With index → O(log N)

---

##  Indexing Every Column?

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
