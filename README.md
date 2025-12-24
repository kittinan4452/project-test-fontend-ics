# ICS Places - React + TypeScript + Vite

โปรเจกต์แสดงรายการสถานที่ (Restaurant, Cafe, Bakery) ที่สวยงามและรองรับทุกหน้าจอ

## 🚀 วิธีการติดตั้ง

### ขั้นตอนที่ 1: Clone Repository
```bash
git clone https://github.com/kittinan4452/project-test-fontend-ics.git
cd project-test-fontend-ics
```

### ขั้นตอนที่ 2: ติดตั้ง Dependencies
```bash
npm install
```

### ขั้นตอนที่ 3: เริ่ม Development Server
```bash
npm run dev
```

### ขั้นตอนที่ 4: เข้าใช้งาน
เปิด Browser ที่:
```
http://localhost:5173/project-test-frontend-ics/
```
> **หมายเหตุ:** หาก port 5173 ถูกใช้งานอยู่ Vite จะเปลี่ยนไป port อื่น (เช่น 5174) อัตโนมัติ

## 📦 Available Scripts

```bash
# เริ่ม Development Server
npm run dev

# Build สำหรับ Production
npm run build

# Preview Production Build
npm run preview

# Run Linter
npm run lint

# Run Development Server พร้อมเปิดเข้าถึงจากเครืออื่น
npm run host
```

## 🏗️ โครงสร้างโปรเจกต์

```
src/
├── components/
│   ├── layout/         # Layout Components
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   └── pages/          # Page Components
│       ├── ListPage.tsx
│       └── DetailPage.tsx
├── data/               # JSON Data
│   └── example_data.json
├── styles/             # Global Styles
│   └── index.css
├── types/              # TypeScript Interfaces
│   └── index.ts
├── App.tsx             # Main App Component
└── main.tsx            # Entry Point
```

## 🎨 Features

- ✨ **UI สวยงาม** - Gradient backgrounds, smooth animations
- 📱 **Responsive** - รองรับทุกหน้าจอ (Mobile, Tablet, Desktop)
- 🔍 **Search & Filter** - ค้นหาและกรองตามหมวดหมู่
- 🖼️ **Gallery** - แสดงรูปภาพหลายแบบ
- 📄 **Pagination** - แบ่งหน้ารายการ
- 🎯 **TypeScript** - Type-safe code
- ⚡ **Vite** - Build รวดเร็ว

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router v6** - Routing
- **Material UI (MUI)** - UI Components
- **Tailwind CSS** - Utility-first CSS
- **DaisyUI** - Component Library

## 📝 Deployment

### GitHub Pages
โปรเจกต์นี้ตั้งค่า `base` path สำหรับ GitHub Pages:
- Base URL: `/project-test-frontend-ics/`
- Router ใช้ `basename` เดียวกับ base path

เมื่อ build เสร็จ ไฟล์ใน `dist/` พร้อม deploy ได้เลย

## 🔧 Configuration

### Environment Variables
- `import.meta.env.MODE` - ระบุโหมด (development/production)
- `import.meta.env.BASE_URL` - Base URL สำหรับ assets

### Base Path
โปรเจกต์ใช้ base path `/project-test-frontend-ics/` สำหรับ GitHub Pages

## 📄 License

This project is licensed under the MIT License.
