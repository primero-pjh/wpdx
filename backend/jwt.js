let cfg = require('./config');
const jwt = require('jsonwebtoken');

let jwtFunc = {
    sign: (kakaoId, UID) => {
        let token = jwt.sign({ 
            kakaoId: kakaoId,
            UID: userId,
        }, 
        cfg.jwtKey, 
        {
            expiresIn: "1 days",
        });
        return token;
    },
    verify: async (token) => {
        try {
            let result = await jwt.verify(token, cfg.jwtKey);
            return result;
        } catch (e) {
            return null;
        }
    },
}

module.exports = jwtFunc;