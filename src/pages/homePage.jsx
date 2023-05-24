import { useSelector } from "react-redux";
import { MainLayout } from "../components/home/MainLayout"

export const Homepage=()=>{
    const mode = useSelector(state=>state.mode.mode)
    return(
        <main
        className={` pb-10  w-col-12     ${
          mode === "dark" ? "darkPage" : "big"
        }`}
      >
        
  
        <div>
          <MainLayout />
        </div>
      </main>
    )
}