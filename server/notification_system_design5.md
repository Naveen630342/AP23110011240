
#  Stage 5: System Design Fix

##  Given Problem:

```js
for (student_id of student_ids) {
  send_email(student_id);
  save_to_db(student_id);
  push_to_app(student_id);
}
```

---

##  Issues:

 Sequential → very slow
 No retry mechanism
 Failure causes inconsistency

---

##  Solution: Queue-Based System

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

## Benefits:

 Parallel processing
 Retry support
 Scalable

---
