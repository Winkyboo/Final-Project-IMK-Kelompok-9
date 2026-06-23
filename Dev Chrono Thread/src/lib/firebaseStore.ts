import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from '../types';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
}

export async function saveUserProfile(userId: string, profile: UserProfile): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, profile, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    return false;
  }
}
