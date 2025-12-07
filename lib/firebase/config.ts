import { initializeApp, getApps, FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

// Firebase configuration from environment variables
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate required environment variables
const validateConfig = (): void => {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ]

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn(
      `Missing Firebase environment variables: ${missingVars.join(', ')}`
    )
  }
}

// Validate configuration on import
validateConfig()

// Initialize Firebase using singleton pattern
let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage
let googleProvider: GoogleAuthProvider

// Initialize Firebase app only once
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Initialize Firebase services
auth = getAuth(app)
db = getFirestore(app)
storage = getStorage(app)

// Configure Google Auth Provider
googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account', // Always show account selection
})

// Optional: Add additional scopes for Google Sign-In
// googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
// googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')

/**
 * Firebase App instance
 * @type {FirebaseApp}
 */
export { app }

/**
 * Firebase Authentication instance
 * @type {Auth}
 */
export { auth }

/**
 * Firestore database instance
 * @type {Firestore}
 */
export { db }

/**
 * Firebase Storage instance
 * @type {FirebaseStorage}
 */
export { storage }

/**
 * Google Authentication Provider
 * @type {GoogleAuthProvider}
 */
export { googleProvider }

/**
 * Firebase configuration object
 * @type {FirebaseOptions}
 */
export { firebaseConfig }
