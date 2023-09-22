import { useAuthContext } from './useAuthcontext';

export const useLogout = () =>{
    const {dispatch} =useAuthContext()

    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user');

        localStorage.removeItem('type');

        dispatch({type: "LOGOUT"})
    }

    return {logout}
}