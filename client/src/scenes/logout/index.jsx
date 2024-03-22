import React, { useEffect } from 'react'
import authStore from 'store/authStore'

export default function LogoutPage() {
    const store = authStore();

    useEffect(() => {
        store.logout();
    }, []);

  return (
    <div>LogoutPage
    
    </div>
  )
}
