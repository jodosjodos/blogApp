

import styles from "./styles/username.module.css"



export const Recovery=()=>{




    return(
        <div className="container mx-auto">
           
            <div className="flex  h-scree justify-center items-center">
             <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h4 className="text-5xl font-bold">Recovery password</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter OTP to recover password</span>
                </div>
                <form 
                action="" 
                className="py-20" 
                
                >
                    
                    <div 
                    className="textbox flex flex-col items-center   justify-center gap-6"
                    >   <div 
                         className="input text-center"
                        >
                        <span className="py-4 tex-sm text-left text-gray-500">
                        Enter 6 digit OTP sent to your email address    
                        </span>
                        <input 
                        className={styles.textBox} 
                        type="text" 
                        placeholder="OTP" 
                        
                        />       
                                 
                        </div>
                       
                        <button type="submit" className={styles.btn}> let&apos;s Go</button>
                    </div>
                    <div className="text-center py-4">
                     <span className="text-gray-500">Can&apos;t get OTP <button  className="text-red-500 btn">resend OTP</button></span>
                    </div>
                </form>
              </div>

              
            </div>
        </div>
    )
}