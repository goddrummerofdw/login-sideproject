// 'use client';
// import React from 'react';
// import axios from 'axios'

// const Dashboard =  () => {
//     const [userData, setUserData] = React.useState({ firstName: null, lastName: null })
//     // Make sure to make a util function for this
//     React.useEffect(() => {
//         axios.get('http://localhost:3000/api/user').then((e) => setUserData(e.data))
//     }, [userData])

//     return (
//         <div>
//             <h1>{`Welcome, ${userData.firstName}${' '} ${userData.lastName}!`}</h1>
//             dashboard

//         </div>
//     )
// }
// export default Dashboard



import React from 'react'

const page = () => {
    return (
        <div>page</div>
    )
}

export default page