'use client';
import React from 'react';

const Dashboard = () => {
    const [getUserData, setgetUserData] = React.useState({ firstName: "", lastName: "" })
    // Make sure to make a util function for this

    React.useEffect(() => {
        fetch('/api/user', {
            cache: 'no-store',
            method: 'GET',
        }).then((res) => res.json()).then((e) => {
            setgetUserData(e)
        })
    }, [])

    return (
        <div>
            <h1>{`Welcome, ${getUserData.firstName}${' '} ${getUserData.lastName}!`}</h1>
            <p>This is a test</p>
        </div>
    )
}

export default Dashboard