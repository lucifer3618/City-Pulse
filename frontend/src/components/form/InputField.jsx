import React from 'react'
import {Input} from "@/components/ui/input.jsx";

function InputField({ id, type, value, placeholder="", setEmail, error }) {
    return (
        <div className="flex flex-col">
            <Input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-[45px] pr-10 ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default InputField
