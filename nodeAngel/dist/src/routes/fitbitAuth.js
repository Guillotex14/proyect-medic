"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const CLIENT_ID = '23R7C6'; // Reemplaza con tu cliente ID de Fitbit
const CLIENT_SECRET = '0017003c1ad27fba89b724a16c4716d5'; // Reemplaza con tu cliente secreto de Fitbit
const REDIRECT_URI = 'exp://192.168.0.16:19000/--/*'; // Reemplaza con tu URI de redirección
const authFitbit = (0, express_1.Router)();
let accessToken = null;
let refreshToken = null;
const authenticate = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    };
    try {
        const response = yield axios_1.default.post('https://api.fitbit.com/oauth2/token', querystring_1.default.stringify(params), {
            headers: headers,
        });
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        console.log('Access token:', accessToken);
        console.log('Refresh token:', refreshToken);
    }
    catch (error) {
        //console.error('Error al autenticar:', error.response.data);
    }
});
const refreshTokens = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!refreshToken) {
        console.log('No hay token de refresco');
        return;
    }
    const params = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    };
    try {
        const response = yield axios_1.default.post('https://api.fitbit.com/oauth2/token', querystring_1.default.stringify(params), {
            headers: headers,
        });
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;
        console.log('Nuevo access token:', accessToken);
        console.log('Nuevo refresh token:', refreshToken);
    }
    catch (error) {
        //console.error('Error al renovar los tokens:', error.response.data);
    }
});
authFitbit.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!accessToken) {
            console.log('No hay token de acceso');
            res.sendStatus(401);
            return;
        }
        const response = yield axios_1.default.get('https://api.fitbit.com/1/user/-/profile.json', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = response.data;
        res.json(data);
    }
    catch (error) {
        //console.error('Error al obtener los datos de perfil:', error.response.data);
        res.sendStatus(500);
    }
}));
// Renovar automáticamente el token cada 24 horas
setInterval(refreshTokens, 24 * 60 * 60 * 1000);
exports.default = authFitbit;
//# sourceMappingURL=fitbitAuth.js.map