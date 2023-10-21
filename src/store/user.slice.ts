import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { AuthInterface } from '../interfaces/Auth.interface';
import { PREFIX } from '../helpers/API';
import { Profile } from '../interfaces/user.interfaces';
import { RootState } from './store';

export interface UserState{
	jwt: string | null,
	loginErrorMsg?: string,
	registerErrorMsg?: string,
	profile?: Profile
}

export interface UserPersistentState{
	jwt: string | null
}

export const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login',
	async (params: {email: string, password: string}) => {
		try {
			const { data } = await axios.post<AuthInterface>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (e) {
			if(e instanceof AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
		
	});
export const register = createAsyncThunk('user/register',
	async (params: {email: string, password: string, name: string}) => {
		try {
			const { data } = await axios.post<AuthInterface>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (e) {
			if(e instanceof AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
		
	});


export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/profile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
		
		
	});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state)=>{
			state.jwt = null;
		},
		clearLoginError: (state)=>{
			state.loginErrorMsg = undefined;
		},
		clearRegisterError: (state)=>{
			state.registerErrorMsg = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) =>{
			if(!action.payload){
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) =>{
			state.loginErrorMsg = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) =>{
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) =>{
			if(!action.payload){
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(register.rejected, (state, action) =>{
			state.registerErrorMsg = action.error.message;
		});

	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;