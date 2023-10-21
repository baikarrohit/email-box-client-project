import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Profile/Sidebar";
import classes from "./root2.module.css";


const Root2Layout = (props) => {
  return (
    <Fragment>
      <div className={classes.root}>
        <Sidebar />
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Root2Layout;
