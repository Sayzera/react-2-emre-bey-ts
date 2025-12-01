
import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'

type Props = {
    children: React.ReactNode
}


function ProtectedRoute({children}: Props) {
    // Kullanıcı Tipi
    const [userType, setUserType] = useState('user');
    const [isAuthenticated, setIsAuthenticated] = useState(true);



    if(!isAuthenticated) {
        return (
            <Navigate to="/" replace />
        )
    }

    if(userType !== 'admin') {
        // return (
        //     <Navigate to="/" replace />
        // )
    
        return (
            <div>
                Yetkisiz Erişim!
            </div>
        )
    }



    return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute