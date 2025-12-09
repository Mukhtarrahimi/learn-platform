const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Routes import
const authRoute = require('./routes/v1/auth.route');
const userRoute = require('./routes/v1/user.route');
const adminRoute = require('./routes/v1/admin.route');
const courseRoute = require('./routes/v1/course.route');
const lessonRoute = require('./routes/v1/lesson.route');
const categoryRoute = require('./routes/v1/category.route');
const commentRoute = require('./routes/v1/comment.route');
const enrollmentRoute = require('./routes/v1/enrollment.route');
const contactRoute = require('./routes/v1/contact.route');
const favoriteCourseRoute = require('./routes/v1/favoriteCourse.route');
const searchRoute = require('./routes/v1/search.route');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/lessons', lessonRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/enrollments', enrollmentRoute);
app.use('/api/v1/contacts', contactRoute);
app.use('/api/v1/favorites', favoriteCourseRoute);
app.use('/api/v1/search', searchRoute);

// Route 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

module.exports = app;
