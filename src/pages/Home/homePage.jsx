import { useSelector } from "react-redux";
import { MainLayout } from "../../components/home/MainLayout"
import Hero from "./container/Hero"
import Articles from "./container/Articles";
import {CTA} from "./container/CTA";

export const Homepage=()=>{
    const mode = useSelector(state=>state.mode.mode)
    return(
        <main
        className={` pb-10  w-col-12 min-h-full     ${
          mode === "dark" ? "darkPage" : "big"
        }`}
      >
        <div className="h-full">
          <MainLayout  >
            <Hero/>
            <Articles/>
            <CTA/>
          </MainLayout>
        </div>
        
  
      </main>
    )
}