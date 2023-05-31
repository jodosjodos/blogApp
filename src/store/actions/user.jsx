import { userActions } from "../reducers/userReducer"



export const Logout=()=>(dispatch)=>{
    dispatch(userActions.resetUSerInfo());
    localStorage.removeItem("account")
}