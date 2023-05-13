import { useFetch } from "../hooks/fetchHook"
import { useAuthStore } from "../store/store"

export const Draft=()=>{
const {username}=useAuthStore(state=>state.auth)
const [{isLoading,apiData,serverError}]=useFetch(`/user/${username}`)


if(isLoading) return <h1>loading.....</h1>
if(serverError)return <h1>{serverError.message}</h1>

return(
    <h1>{apiData?.firstName || apiData?.username}</h1>
)
}