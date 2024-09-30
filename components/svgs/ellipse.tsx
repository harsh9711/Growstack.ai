import React from 'react'


interface Props {
    isFilled: boolean
}

const Ellipse = ({ isFilled }: Props) => {
    if (isFilled) {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#034737" />
                <circle cx="8" cy="8" r="4" fill="white" />
            </svg>
        )
    }

    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7.5" stroke="#6F6B7D" />
        </svg>
    )
}

export default Ellipse;