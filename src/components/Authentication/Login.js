import {useEffect, useState} from  'react'; 
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";

//important
let client_id = "940292526044-ibg5umv7i658tdlqffuanjg1049ab93o.apps.googleusercontent.com"; 


function Login() {
  let [user, setUser] = useState({})
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential); 
    var userObject = jwt_decode(response.credential);
    console.log(userObject);    
    setUser(userObject); 
    document.getElementById("signInDiv").hidden = true; 
  }

  function handleSignOut(event) {
    setUser({}); 
    document.getElementById("signInDiv").hidden = false; 
  }

  useEffect(()=> {
    /* global google */
      google.accounts.id.initialize({
      client_id: client_id, 
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      {theme: "outline", size:"large"}
    )
    
    google.accounts.id.prompt();
  }, []) 

  return (
    <div className="page">
    <div className="Login">
      <div id="signInDiv" className="sign-in-container"> </div> 
      {  user && 
        <div>
          <img src={user.picture} className="profile-pic"></img>
          <h3>{user.name}</h3>
        </div>
      }
      {
        Object.keys(user).length != 0 &&
        navigate("/translate")
        /*
        <button id="signOutButton" className="sign-out-btn" onClick = { (e)=> handleSignOut(e)}>Sign Out</button> 
        */
      }
    </div>
    </div>
  ); 
}

export default Login;