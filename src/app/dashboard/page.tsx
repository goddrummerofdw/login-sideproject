'use client';
import React from 'react';
// import axios from 'axios'

const Dashboard = () => {
    const [getUserData, setgetUserData] = React.useState({ firstName: "", lastName: "" })
    // Make sure to make a util function for this
    React.useEffect(() => {
        fetch('/api/user', {
            method: 'GET'
        }).then((res) => res.json()).then((e) => {
            setgetUserData(e)
        })
    }, [])

    return (
        <div>
            <h1>{`Welcome, ${getUserData.firstName}${' '} ${getUserData.lastName}!`}</h1>

        </div>
    )
}
export default Dashboard