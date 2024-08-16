# React + TypeScript + Vite
# วิธีการติดตั้ง
ขั้นตอนที่ 1 
```bash
  git clone https://github.com/kittinan4452/project-test-fontend-ics.git
  cd project-test-fontend-ics
```
ขั้นตอนที่ 2 ติดตั้ง vite 
```bash
  npm install vite --save-dev
```
ขั้นตอนที่ 3 ก่อนรันเข้าไปในไฟล์ vite.config ทำการลบ base ก่อนรัน
```bash
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
})
```
ขั้นตอนที่ 4 run WebApplication 
```bash
  npm run dev
```
ขั้นตอนที่ 5 เข้า Browser copy นำไปวางใน Browser
```bash
  http://localhost:5173/
```
ขั้นตอนที่ 6 runผ่าน Host
```bash
  npm run host
```
