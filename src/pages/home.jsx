import { useSelector } from "react-redux"
import { HomeComponent } from "../components/home"

export const Home=()=>{
    const userData=useSelector(state=>state.auth.userData)
    console.log(userData);
return(
    <div>
        {<HomeComponent/>}
        
    </div>
)
}