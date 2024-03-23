let cfg = require('./config.js');
let _redis = require("redis");

const redisClient = _redis.createClient({ 
    host: "localhost",
    port: 6379,
    password: "raffine9847!",
    legacyMode: true,
}); // legacy 모드 반드시 설정 !!
redisClient.on('connect', () => {
    console.info('Redis connected!');
 });
 redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
 });
 redisClient.connect().then(); // redis v4 연결 (비동기)
const redis = redisClient.v4;

module.exports = redis;