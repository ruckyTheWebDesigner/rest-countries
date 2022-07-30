import { Card } from "@mui/material";
import React from "react";
import { BsSun, BsFillMoonFill } from "react-icons/bs";

function Navbar({ toggleMode, mode }) {
  return (
    <Card className='navbar'>
      <div className='nav-logo'>
        <a href='/'>Where in the world</a>
      </div>
      <div className='nav-toggle'>
        <span className='btn-toggle' onClick={toggleMode}>
          {mode === "light" ? <BsSun /> : <BsFillMoonFill />}
        </span>
        {mode === "light" ? <h5>Light Mode</h5> : <h5>Dark Mode</h5>}
      </div>
    </Card>
  );
}

export default Navbar;
