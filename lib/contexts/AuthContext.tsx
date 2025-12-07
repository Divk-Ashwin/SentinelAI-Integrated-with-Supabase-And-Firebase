'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  User as FirebaseUser,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase/config'

// User interface for application
export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// Auth context interface
interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<UserCredential>
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to convert Firebase User to our User type
const mapFirebaseUser = (firebaseUser: FirebaseUser | null): User | null => {
  if (!firebaseUser) return null
  
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  }
}

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode
}

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const mappedUser = mapFirebaseUser(firebaseUser)
      setUser(mappedUser)
      setLoading(false)
      
      if (mappedUser) {
        console.log('User authenticated:', mappedUser.email)
      } else {
        console.log('User signed out')
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  /**
   * Sign in with Google using popup
   * @returns Promise<UserCredential>
   */
  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Google sign-in successful')
      return result
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign in with email and password
   * @param email - User email
   * @param password - User password
   * @returns Promise<UserCredential>
   */
  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Email sign-in successful')
      return result
    } catch (error) {
      console.error('Email sign-in error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign up with email and password
   * @param email - User email
   * @param password - User password
   * @returns Promise<UserCredential>
   */
  const signUpWithEmail = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Sign-up successful')
      return result
    } catch (error) {
      console.error('Sign-up error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign out the current user
   * @returns Promise<void>
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      await signOut(auth)
      console.log('User signed out successfully')
    } catch (error) {
      console.error('Sign-out error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use the Auth context
 * @throws Error if used outside of AuthProvider
 * @returns AuthContextType
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

/**
 * Export the context for advanced use cases
 */
export { AuthContext }
