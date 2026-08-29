// ประกาศว่าไฟล์นี้จะมีการใช้ express ซึ่งรองรับโดย variable express
const express = require('express');
// ประกาศว่าไฟล์นี้จะมีการใช้ dotenv ซึ่งรองรับโดย variable dotenv
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route files
const hospitals = require('./routes/hospitals');
const { connect } = require('mongoose');


// Load environment variables from .env file
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// สร้างตัวแปร app ที่ใช้ express ที่เรา require เข้ามา
const app = express();

// body parser
app.use(express.json());

// mount routers
app.use('/api/v1/hospitals', hospitals); // so in hospitals.js we do not have to put /api.. anymore

// กำหนดให้ server รันที่ port ที่กำหนดตามในไฟล์ .env หรือถ้าไม่มีให้ใช้ port 5003
const PORT = process.env.PORT || 5003;
// ให้ server รันโดยฟังก์ชัน app.listen() โดยรับพอร์ตที่กำหนดและแสดงข้อความเมื่อ server รันสำเร็จ
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    // close server & exit process
    server.close(()=>process.exit(1));
});