import {Link} from "react-router-dom"
export const Navbar=()=>{
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
            <Link to="/login/username">username</Link>
        </div>
    )
}