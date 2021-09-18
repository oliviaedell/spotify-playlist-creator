import React, { useEffect } from 'react'
import './CurrentSongPage.css'

/* split parameters from url after login into key-value pairs */
const getAuthParams = (hash:string) => {
    const params = hash.split('&')
    const paramsReduce = params.reduce<Record<string, string>>((acc, curr) => {
        const [key, val]:string[] = curr.split('=')
        acc[key] = val
        return acc

    }, {})

    return paramsReduce

}


const CurrentSong = () => {
    useEffect(() => {
        if (window.location.hash){
            const{
                access_token,
                expires_in,
                token_type
            } = getAuthParams(window.location.hash.substring(1))

        }
    })
    
    return (
        <>
        <h1>Current Song</h1>
        </>
    )

}
export default CurrentSong
