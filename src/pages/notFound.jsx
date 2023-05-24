
import { useSelector } from "react-redux"

export const NotFound=()=>{
    const mode=useSelector(state=>state.mode.mode)
    return(
        <main
        className={`h-[100vh] w-full    flex flex-col  justify-center items-center ${
          mode === "dark" ? "darkPage" : "big"
        }`}
      >
          <div  className={`${mode==="dark"?"text-white":"text-black"} text-3xl`} >
           🥹🥹 Page does not found or not exist
        </div>
        </main>
      
    )
}