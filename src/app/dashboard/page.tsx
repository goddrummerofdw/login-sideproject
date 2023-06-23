'use client';
import React from 'react';
// import axios from 'axios'

const Dashboard = () => {
    const [userData, setUserData] = React.useState({ firstName: "", lastName: "" })
    // Make sure to make a util function for this
    React.useEffect(() => {
        fetch('/api/user', {
            method: 'GET'
        }).then((res) => res.json()).then((e) => {
            console.log(e)
            setUserData(e)
        })
    }, [])

    return (
        <div>
            <h1>{`Welcome, ${userData.firstName}${' '} ${userData.lastName}!`}</h1>

        </div>
    )
}
export default Dashboard