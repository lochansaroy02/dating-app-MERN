import { HomeIcon, MessageCircle, UserRound } from 'lucide-react'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NavMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { name: "profile", icon: <UserRound />, to: "/login" },
        { name: "home", icon: <HomeIcon />, to: "/" },
        { name: "Messages", icon: <MessageCircle />, to: "/signup" },
    ];

    return (
        <div className='bg-neutral-950 border-t lg:hidden border-neutral-600 flex fixed bottom-0 h-12 w-full'>
            <div className='flex justify-around w-full items-center'>
                {
                    items.map((item, index) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <h1
                                key={index}
                                onClick={() => navigate(item.to)}
                                className={`cursor-pointer py-1 px-4 rounded-full
                                    ${isActive ? 'bg-neutral-800' : 'bg-transparent'}`}
                            >
                                {item.icon}
                            </h1>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NavMenu;
