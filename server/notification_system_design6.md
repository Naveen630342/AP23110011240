
#  Stage 6: Priority Inbox (Top 10 Notifications)

##  Logic:

Priority = Type Weight + Recency

| Type      | Weight |
| --------- | ------ |
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

---

## Code:

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

## Optimization:

 Use Min Heap for large data
 Maintain top N dynamically

---

## Handling Continuous Data:

 Use streaming
 Update heap dynamically

---

# Conclusion

This system:

 Supports real-time notifications
 Scales to millions of records
 Handles failures using queues
 Optimizes performance with caching
 Prioritizes important notifications more  efficiently

