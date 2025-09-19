import React from 'react'

export const Title = (props) => {
    return (
        <h1
            className='
            text-4xl
            font-bold
            text-gray-200
            '
        >{props.children}</h1>
    )
}
