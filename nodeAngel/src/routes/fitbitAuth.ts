import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import querystring from 'querystring';

const CLIENT_ID = '23R7C6'; // Reemplaza con tu cliente ID de Fitbit
const CLIENT_SECRET = '0017003c1ad27fba89b724a16c4716d5'; // Reemplaza con tu cliente secreto de Fitbit
const REDIRECT_URI = 'https://proyect-medic-backend.up.railway.app/callback'; // Reemplaza con tu URI de redirección

const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);

const authFitbit = Router();

let accessToken: string | null = null;
let refreshToken: string | null = null;

const authenticate = async (code: string) => {
  const params = {
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: encodedRedirectUri,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  };

  try {
    const response = await axios.post('https://api.fitbit.com/oauth2/token', querystring.stringify(params), {
      headers: headers,
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    console.log('Access token:', accessToken);
    console.log('Refresh token:', refreshToken);
  } catch (error) {
    console.error('Error al autenticar:', error);
  }
};

const refreshTokens = async () => {
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
    const response = await axios.post('https://api.fitbit.com/oauth2/token', querystring.stringify(params), {
      headers: headers,
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    console.log('Nuevo access token:', accessToken);
    console.log('Nuevo refresh token:', refreshToken);
  } catch (error) {
    console.error('Error al renovar los tokens:', error);
  }
};

authFitbit.post('/profile', async (req: Request, res: Response) => {
  try {
    const code = req.body.code as string;

    if (!code) {
      console.log('No se proporcionó el código');
      res.sendStatus(400);
      return;
    }

    // Aquí se realiza la autenticación antes de la solicitud GET
    await authenticate(code);

    if (!accessToken) {
      console.log('No hay token de acceso');
      res.sendStatus(401);
      return;
    }

    const response = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los datos de perfil:', error);
    res.sendStatus(500);
  }
});

// Renovar automáticamente el token cada 24 horas
setInterval(refreshTokens, 24 * 60 * 60 * 1000);

export default authFitbit;
