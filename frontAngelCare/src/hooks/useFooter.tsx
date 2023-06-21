import React, { useState } from 'react'

export const useFooter = () => {

    const [showFooter, setShowFooter] = useState(false);
    const onShowFooter = (show:boolean) => {
        console.log("hola desde useFooter")
        setShowFooter(show);
    }

    return (
        {
            showFooter,
            onShowFooter
        }
    )
}
