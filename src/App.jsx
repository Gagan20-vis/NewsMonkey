import { Component } from "react";
import Navbar from "./components/Navbar";
import {Outlet} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Outlet/>
      </div>
    );
  }
}
