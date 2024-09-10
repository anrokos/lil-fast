import React from 'react';
import { MdGeneratingTokens } from "react-icons/md";

const Header = () => {
    return (
        <header className="flex justify-start items-center p-4 h-16">
            <div className="flex gap-1 items-center">
                <MdGeneratingTokens size={28} className="mt-1"/>
                <h1 className="text-2xl font-bold">Lightnote</h1>
            </div>
        </header>
    )
}

export default Header;