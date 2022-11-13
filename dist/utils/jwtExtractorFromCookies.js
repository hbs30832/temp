"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExtractorFromCookies = void 0;
const jwtExtractorFromCookies = (request) => {
    try {
        const jwt = request.cookies['jwt'];
        console.log(jwt);
        return jwt;
    }
    catch (e) {
        return null;
    }
};
exports.jwtExtractorFromCookies = jwtExtractorFromCookies;
//# sourceMappingURL=jwtExtractorFromCookies.js.map