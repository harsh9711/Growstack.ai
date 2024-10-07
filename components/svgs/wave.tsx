import React from 'react'

const Wave = ({ color = "#fff" }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H8L12 20V4L16 12H21" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default Wave;