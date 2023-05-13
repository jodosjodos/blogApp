import { useContext } from "react"
import { Mode } from "../components/navbar"

export const NotFound=()=>{
    const mode=useContext(Mode)
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