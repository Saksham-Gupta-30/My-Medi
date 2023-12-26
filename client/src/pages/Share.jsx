import React, { useEffect, useState } from 'react'

import { useStateContext } from '../context'

const Share = () => {
    const [data, setData] = useState([])
    const { grantAccess, address, getAccessList } = useStateContext()
    const [otherAccount, setOtherAccount] = useState("")

    useEffect(() => {
        const getData = async () => {
            // const res = await contract.call("ShareAccess")
            const res = await getAccessList()
            console.log(res.data[0])
            if (res.data.length > 0) {
                // con
                setData(res.data)
            } else {
                setData([])
                // console.log(res)
            }
        }
        if (address) getData()
    }, [address])

    const handleClick = (item) => {
        navigator.clipboard.writeText(item.user)
        alert('Copied to clipboard')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(otherAccount)
        try {
            const res = grantAccess(otherAccount)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        setOtherAccount("")
    }

    return (
        <div className='w-screen flex h-screen'>
            <div className='p-4 border-gray-500 w-1/2 flex flex-col'>
                <div className='flex flex-col mt-8 p-2 border-gray-900 rounded-sm bg-[#2c2f3299] justify-center items-center w-full'>
                    <p className='uppercase font-semibold'>Addresses</p>
                    <p>(Who Can Access Your Data)</p>
                </div>
                <div className='overflow-x-auto w-full flex justify-center mt-4'>
                    {data.length !== 0 ? (
                        <table className="table-auto border-4 rounded-sm w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">S.No.</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Address</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {data.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-semibold">{i + 1}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">{item.access === true && item.user}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap text-blue-500">
                                                <button className='hover:bg-[#1e1e1f66] p-1 rounded-sm' onClick={() => handleClick(item)}>Copy</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>) : (
                        <p className='uppercase font-bold text-xl mt-4 w-full text-center'>No one access</p>
                    )}
                </div>
            </div>
            <div className='p-4 border-l-2 border-gray-500 w-1/2'>
                <div className='w-full flex flex-col items-center mt-8 text-xl text-center p-2 bg-[#2c2f3299] rounded-sm'>
                    <span className='font-bold'>Grant Access</span>
                    {/* <button className='w-full bg-purple-700 p-2 mt-2 rounded-sm border-2 border-gray-800 uppercase font-bold'>Get my files</button> */}
                </div>
                <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-16 bg-[#1e1e1f66] w-full flex flex-col">
                    <div className="mr-4 w-full">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="text-input"
                            type="text"
                            placeholder="Enter Account Address"
                            value={otherAccount}
                            onChange={(e) => setOtherAccount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4 w-full">
                        <button
                            className="bg-purple-800 w-full hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Grant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Share