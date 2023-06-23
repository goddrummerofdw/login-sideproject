'use client';
import React from 'react';

const page = () => {
    const [userData, setUserData] = React.useState({ firstName: "", lastName: "" })
    // Make sure to make a util function for this
    React.useEffect(() => {
        fetch('/api/user', { method: "GET" }).then((res) => res.json()).then((e) => setUserData(e))
    }, [])

    return (
        <div>
            <h1>{`Welcome, ${userData.firstName}${' '} ${userData.lastName}!`}</h1>

        </div>
    )
}
export default page