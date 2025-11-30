# Task Management UI (Next.js / Tailwind CSS / Zustand)

โปรเจกต์นี้คือ Frontend Client สำหรับ Task Management API พัฒนาด้วย Next.js และ React โดยใช้ Tailwind CSS สำหรับ Styling และ Zustand สำหรับ State Management

---

### ✨ คุณสมบัติหลัก (Features)

- **Task List:** แสดง Tasks ในรูปแบบ Card Layout
- **CRUD Operations:** ดำเนินการ Create, Update Status, และ Delete ผ่าน API
- **State Management:** จัดการ Global State ด้วย **Zustand**
- **Styling:** ใช้ **Tailwind CSS** **shadcn/ui**

---

### ⚙️ การตั้งค่าเริ่มต้น (Setup)

#### 1. ข้อกำหนดเบื้องต้น (Prerequisites)

- **Node.js:** v18+
- **Backend Server:** **ต้องรัน Backend Server ก่อน** (ที่ `http://localhost:8000`)

#### 2. การติดตั้ง (Installation)

```bash
# 1. เข้าสู่โฟลเดอร์ Frontend
cd [frontend-folder-name]

# 2. ติดตั้ง Dependencies
npm install
```

# .env.local (Frontend)

# 💡 API URL: ต้องชี้ไปที่ Port และ Path ที่ Backend Server รันอยู่

NEXT_PUBLIC_PORT=http://localhost:8000

# 3. รัน Frontend

npm run dev
