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
const authFitbit = (0, express_1.Router)();
const clientId = '23R7C6'; // Reemplaza con tu cliente ID de Fitbit
const clientSecret = '0017003c1ad27fba89b724a16c4716d5'; // Reemplaza con tu cliente secreto de Fitbit
const redirectUri = 'exp://192.168.0.12:19000/--/*'; // Reemplaza con la URL de tu backend
const frontendUri = 'exp://192.168.0.12:19000/--/*'; // Reemplaza con la URL de tu frontend
authFitbit.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, codeVerifier } = req.query;
    console.log('code', code);
    console.log('codeVerifier', codeVerifier);
    if (!code || !codeVerifier) {
        return res.status(400).json({ error: 'No se proporcionó el código de autorización o el codeVerifier.' });
    }
    const tokenEndpoint = 'https://api.fitbit.com/oauth2/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    };
    const params = {
        code: code.toString(),
        grant_type: 'authorization_code',
        clientId: '23R7C6',
        redirect_uri: redirectUri,
        code_verifier: codeVerifier.toString(),
    };
    try {
        const response = yield axios_1.default.post(tokenEndpoint, querystring_1.default.stringify(params), {
            headers,
        });
        const accessToken = response.data.access_token;
        const profileEndpoint = 'https://api.fitbit.com/1/user/-/profile.json';
        const profileResponse = yield axios_1.default.get(profileEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const profileData = profileResponse.data;
        const redirectFrontendUrl = `${frontendUri}?accessToken=${accessToken}&profileData=${encodeURIComponent(JSON.stringify(profileData))}`;
        // Redireccionar al frontend con los datos obtenidos
        res.redirect(redirectFrontendUrl);
    }
    catch (error) {
        console.error('Error al obtener los datos de perfil:', error.response.data);
        res.status(500).json({ error: 'Error al obtener los datos de perfil.' });
    }
}));
exports.default = authFitbit;
//# sourceMappingURL=fitbitAuth.js.map