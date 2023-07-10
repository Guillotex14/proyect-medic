import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import querystring from 'querystring';

const authFitbit = Router();

const clientId = '23R7C6'; // Reemplaza con tu cliente ID de Fitbit
const clientSecret = '0017003c1ad27fba89b724a16c4716d5'; // Reemplaza con tu cliente secreto de Fitbit
const redirectUri = 'https://proyect-medic-backend.up.railway.app/fitbit/callback'; // Reemplaza con la URL de tu backend
const frontendUri = 'exp://192.168.0.12:19000/--/*'; // Reemplaza con la URL de tu frontend

authFitbit.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No se proporcionó el código de autorización.' });
  }

  const tokenEndpoint = 'https://api.fitbit.com/oauth2/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
  };
  const params = {
    code: code.toString(),
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  };

  try {
    const response = await axios.post(tokenEndpoint, querystring.stringify(params), {
      headers,
    });

    const accessToken = response.data.access_token;

    const profileEndpoint = 'https://api.fitbit.com/1/user/-/profile.json';
    const profileResponse = await axios.get(profileEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profileData = profileResponse.data;

    const redirectFrontendUrl = `${frontendUri}?accessToken=${accessToken}&profileData=${encodeURIComponent(JSON.stringify(profileData))}`;
    // Redireccionar al frontend con los datos obtenidos
    res.redirect(redirectFrontendUrl);
  } catch (error) {
    console.error('Error al obtener los datos de perfil:', error);
    res.status(500).json({ error: 'Error al obtener los datos de perfil.' });
  }
});

export default authFitbit;
