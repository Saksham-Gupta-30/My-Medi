import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDisconnect, ConnectWallet } from '@thirdweb-dev/react'

import { Logo, Logout } from '../assets'
import { useStateContext } from '../context/index'
import { navLinks } from '../constants'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <span className={`p-2 hover:bg-[#2c2f3299] h-[48px] w-[48px] rounded-full flex items-center justify-center ${isActive && isActive === name && 'bg-[#2c2f3299]'} cursor-pointer`} onClick={handleClick}>
        <img src={imgUrl} alt={name} className='w-3/4 h-3/4 grayscale' />
    </span>
)

const Header = () => {
    const { address } = useStateContext()
    const [isActive, setIsActive] = useState('')
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate()
    const disconnectWallet = useDisconnect()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () => {
        setIsActive('')
        navigate('/')
    }

    const handleDisconnect = async () => {
        await disconnectWallet()
        setIsActive('')
        navigate('/')
    }

    return (
        <div className={`flex justify-between h-16 sticky top-4 rounded-[20px] ml-4 mr-4 border-gray-700 border-b-4 ${isScrolled ? 'bg-[#51505266]' : 'bg-[#515052]'}`}>
            <div className='m-2 pl-8 flex-none cursor-pointer' onClick={handleClick}>
                <img src={Logo} alt="Logo" className='h-full rounded-[20px]' />
            </div>
            <div className="flex items-center justify-around grow">
                <div className='flex justify-between gap-3'>
                    {navLinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                if (!link.disabled) {
                                    setIsActive(link.name)
                                    navigate(link.link)
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className='flex items-center pr-8 ml-2 gap-2'>
                <div className=''>
                    <ConnectWallet
                        theme="dark"
                        modalSize='compact'
                        className='hover:bg-purple-500'
                        detailsBtn={() => {
                            return (
                                <p className='text-white text-sm mr-2 rounded-full bg-[#1e1e1f66] p-2'>
                                    {address}
                                </p>
                            )
                        }}
                        modalTitle='My Medi'
                    />
                </div>
                <button onClick={handleDisconnect} className='w-[48px] h-[48px] hover:bg-[#2c2f3299] rounded-full items-center justify-center flex'>
                    <img src={Logout} alt="disconnect" className='w-1/2 h-1/2' />
                </button>
            </div>
        </div>
    )
}

export default Header