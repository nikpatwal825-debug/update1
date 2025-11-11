// JWT Utility Functions
import jwt from 'jsonwebtoken';

// Ensure secrets are set in production
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

// Validate that secrets are configured (fail fast in production)
if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be set in production environment');
  }
  console.warn('⚠️  WARNING: JWT secrets are not configured. Using development defaults.');
}

// Generate Access Token
export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET || 'dev-secret-key', {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// Generate Refresh Token
export function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET || 'dev-refresh-secret', {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

// Verify Access Token
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET || 'dev-secret-key');
  } catch (error) {
    return null;
  }
}

// Verify Refresh Token
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET || 'dev-refresh-secret');
  } catch (error) {
    return null;
  }
}

// Decode Token (without verification)
export function decodeToken(token) {
  return jwt.decode(token);
}
