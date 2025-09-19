import React from 'react'

export const Container = (props) => {
    return (
        <div
            className='
            flex 
            flex-col 
            min-h-screen 
            bg-gray-950
            p-8'
        >{props.children}</div>
    )
}
