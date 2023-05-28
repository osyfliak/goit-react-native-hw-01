import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '../../config';
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
   onAuthStateChanged,
} from 'firebase/auth';

const auth = getAuth(app);

export const fetchRegisterUser = createAsyncThunk(
   'auth/fetchRegisterUser',
   async (data, thunkAPI) => {
      try {
         const { email, password, name, avatar } = data;
         const result = await createUserWithEmailAndPassword(auth, email, password);
         result &&
            (await updateProfile(auth.currentUser, {
               displayName: name,
               photoURL: avatar,
            }));
         return result.user;
      } catch (error) {
         console.log('error', error.message);
         return thunkAPI.rejectWithValue(e.message);
      }
   }
);

export const fetchLoginUser = createAsyncThunk('auth/fetchLoginUser', async (data, thunkAPI) => {
   try {
      const { email, password } = data;
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result._tokenResponse;
   } catch (error) {
      console.log('error', error.message);
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
   try {
      onAuthStateChanged(auth, user => {
         if (user) {
            return user;
         }
         return null;
      });
   } catch (error) {
      console.log('error', error.message);
      return thunkAPI.rejectWithValue(e.message);
   }
});

export const fetchLogOutUser = createAsyncThunk('auth/fetchLogOutUser', async (_, thunkAPI) => {
   try {
      const result = await auth.signOut();
      return result;
   } catch (error) {
      console.log('error', error.message);
      return thunkAPI.rejectWithValue(e.message);
   }
});
