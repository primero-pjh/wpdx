/* library */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http2Express = require('http2-express-bridge');
const app = http2Express(express);
const cors = require('cors');
const fs = require('fs');
const db = require('./mysql2');
/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middle ware */
app.all('/api/*', async (req, res, next) => {
    let url = req.url;
    next(); // 사용자가 요청한 end-point로 전송합니다.
});
/* static variable */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'wwwroot')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: '*'}));

// dfs('./routes/api');
app.use('/', require('./routes/api/datasets/get'));
app.use('/', require('./routes/api/school/get'));
app.use('/', require('./routes/api/datasets/school.lat.long.post'));

app.use('/', require('./routes/api/lms/get'));

app.use('/', require('./routes/api/dx/23_middle_student.router.get'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app };
