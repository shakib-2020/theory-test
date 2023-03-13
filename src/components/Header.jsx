import { Button } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, DeviceMobileIcon } from "@primer/octicons-react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { setLogin, setUser } from "./feature/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLogedin } = useSelector((state) => state.auth.value);
  console.log(user);
  const handleLogout = async () => {
    try {
      const isSignOut = await signOut(auth);
      console.log(isSignOut);
      dispatch(setUser(null));
      dispatch(setLogin(false));
    } catch (error) {
      console.log(error);
    }
  };
  const ActiveUser = () => {
    if (user !== null) {
      const userName = user.displayName;
      console.log(userName);
      const first_name = userName.split("-")[0];
      const last_name = userName.split("-")[1];
      return <span className="user-name">{`${first_name} ${last_name}`}</span>;
    }
  };
  return (
    <>
      <div className="min-header">
        <div>
          <ul>
            <li>
              <Link>
                <DeviceMobileIcon size={24} />
                +8801400887388
              </Link>
            </li>
            <li>
              <Link>
                <MailIcon size={24} />
                nazshakib02@gmail.com
              </Link>
            </li>
          </ul>
        </div>
        {/* <div>
          <ul>
            <li>support</li>
            <li>contact</li>
          </ul>
        </div> */}
      </div>
      <div className="header">
        <div className="logo">
          <h3>LOGO</h3>
        </div>
        <div className="menu">
          <div className="nav">
            <ul>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Mock Tests</Link>
              </li>
              <li>
                <Link>Practice Tests</Link>
              </li>
              {/* <li>
                <Link>Hazard Perception</Link>
              </li>
              <li>
                <Link>Highway Code</Link>
              </li> */}
            </ul>
          </div>
          {!isLogedin && !user ? (
            <>
              <div className="when-logout">
                <Button
                  variant="outline-success"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button variant="success" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* <div className="when-login">
                <div className="active-user">
                  <span>Hello,</span>
                  <ActiveUser />
                </div>
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div> */}
              <div className="user-info">
                <div className="user-profile">
                  <img
                    alt="profile"
                    src="https://tse4.mm.bing.net/th/id/OIP.6yuCxX3agcmqdUaie4OZwQAAAA?pid=ImgDet&rs=1"
                  />
                </div>
                <div className="user-profile-menu">
                  <ul>
                    <li>
                      <ActiveUser />
                    </li>
                    <li className="user-mail">{user !== null && user.email}</li>
                    <hr />
                    <li>
                      <Link>My Learning</Link>
                    </li>
                    <hr />
                    <li>
                      <Button variant="danger" onClick={handleLogout}>
                        Log Out
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
