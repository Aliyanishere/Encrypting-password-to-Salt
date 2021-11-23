import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import DashBoard from '../../Components/DashBoard';
import Login from '../../Components/Login Page';
import Signup from '../../Components/Signup Page';
import { GlobalContext } from '../Context api/Context';

const Routing = () => {
    let { state } = useContext(GlobalContext);
    return (
        <Router>
            <Routes>
                {(state.userEmail === "") ?
                    <>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="*" element={<Login />} />
                    </>
                    :
                    <>
                        <Route exact path="/" element={<DashBoard />} />
                        <Route exact path="*" element={<DashBoard />} />
                    </>
                }
            </Routes>
        </Router>
    )
}

export default Routing;