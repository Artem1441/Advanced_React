import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreator = {
    setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({ type: AuthActionsEnum.SET_IS_LOADING, payload: isLoading }),
    setError: (error: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: error }),
    setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: isAuth }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreator.setIsLoading(true))
            setTimeout(async () => {
                const mockUsers = await UserService.getUsers()
                const mockUser = mockUsers.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem("auth", "true")
                    localStorage.setItem("username", mockUser.username)
                    dispatch(AuthActionCreator.setUser(mockUser))
                    dispatch(AuthActionCreator.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreator.setError("Incorrect username or password"))
                }
                dispatch(AuthActionCreator.setIsLoading(false))
            }, 1000)

        } catch (err) {
            dispatch(AuthActionCreator.setError("Error while registration"))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem("auth")
            localStorage.removeItem("username")
            dispatch(AuthActionCreator.setIsAuth(false))
            dispatch(AuthActionCreator.setUser({} as IUser))
        } catch (err) {

        }
    },
}