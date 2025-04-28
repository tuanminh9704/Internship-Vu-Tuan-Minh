import { useState } from "react"

export const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <div className="counter">
                <button onClick={() => setCount(count + 1)} className="button-counter">Click Me</button>
                <p>Số lần click: {count}</p>
            </div>
        </div>
    )
}

