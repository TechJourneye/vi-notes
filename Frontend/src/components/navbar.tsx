import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";


export default function Navbar(){
  const navigate=useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
 const handleLogout = () => {
    removeCookie("token", { path: "/" });   // remove cookie
    alert("Logged out successfully ");
    navigate("/");
  }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top custom-navbar">
  <div className="container-fluid">
   <span  className="givecolor">
    <Link className="navbar-brand" to="/" style={{textDecoration:"none"}}><i className="fa-solid fa-compass"></i></Link>
    </span> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active webcolor" aria-current="page" to="/">Create Notes</Link>
      </div>
    <div className="navbar-nav ms-auto">

            {cookies.token ?(
  <span>
  
    <button
      onClick={() => navigate("/mynotes")}
      className="btn btn-primary me-2"
    >
      My Notes
    </button>

  
    <button
      onClick={handleLogout}
      className="btn btn-danger logout"
    >
      Logout
    </button>
  </span>
) : (
              <>
              <span>
                    <Link to="/login" className="btn btn-outline-success me-2 login">
                       Login
                     </Link>

                    <Link to="/signup" className="btn btn-success signup">
                      Signup
                    </Link>
              </span>
                
              </>
            )}
    </div>
    </div>
   
  </div>
</nav>
    )
}