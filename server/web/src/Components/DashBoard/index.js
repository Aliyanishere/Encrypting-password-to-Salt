import React, { useContext } from 'react';
import { GlobalContext } from '../../assests/Context api/Context';

const DashBoard = () => {
    let { dispatch, state } = useContext(GlobalContext);

    const logout = () => {
        dispatch({
            type: "USER_LOGOUT"
        })
    }

    return (
        <div>
            <h1>Welcome {state.userEmail}</h1><br />
            <button onClick={logout}>Logout</button><br /><br />
            <p>(On refresh you will be logout.)</p>
        </div>
    )
}

export default DashBoard;
