import React from 'react'

const ExternalLink = ({ width = 24, height = 24 }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7H6C4.89543 7 4 7.89543 4 9V18C4 19.1046 4.89543 20 6 20H15C16.1046 20 17 19.1046 17 18V13" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 7H6C4.89543 7 4 7.89543 4 9V18C4 19.1046 4.89543 20 6 20H15C16.1046 20 17 19.1046 17 18V13" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 14L20 4" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 14L20 4" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 4H20V9" stroke="#4B465C" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 4H20V9" stroke="white" stroke-opacity="0.2" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default ExternalLink;