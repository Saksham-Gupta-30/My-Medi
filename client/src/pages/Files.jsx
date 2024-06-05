import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import { useStateContext } from '../context/index'
import Loader from '../components/Loader'

const Files = () => {
    const [file, setFile] = useState("")
    const [fileType, setFileType] = useState("")
    const [fileName, setFileName] = useState("")
    const { fetchData, address } = useStateContext()
    const [account, setAccount] = useState(address)
    const [data, setData] = useState([])
    const [otherAccount, setOtherAccount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const navigate = useNavigate()

    const getData = async (account) => {
        setIsLoading(true)
        // console.log(isLoading)
        setTimeout(async () => {
            try {
                const res = await fetchData(account)
                if (res.status === "success") {
                    setData(res.data)
                    setAccount(otherAccount)
                    setOtherAccount("")
                } else {
                    alert("Access Denied")
                    setData([])
                }
            } catch (error) {
                alert(error.message || "Access Denied")
            } finally {
                setIsLoading(false)
            }
        }, 2000)
        // setIsLoading(false)
        // console.log(res.data)
    }

    const handleClick = (item) => {
        // e.preventDefault();
        setFile(`https://gateway.pinata.cloud/ipfs${item.url.substring(6)}`)
        setFileName(item.fileName)
        setFileType(item.fileType)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getData(otherAccount)
    }

    useEffect(() => {
        setAccount(address)
        // setTimeout(() => {
        //     if (account === undefined) {
        //         alert('Wallet Not Connected')
        //         navigate('/')
        //     }
        // }, 2000)
        // if (address === undefined) {
        //     alert('Wallet Not Connected')
        //     navigate('/')
        // }
    }, [address])

    // const handleGet

    return (
        <div className='w-full flex h-screen'>
            {isLoading === true && (<Loader text="Fetching" />)}
            <div className='w-1/2 p-4 border-gray-500 flex flex-col justify-start items-center'>
                <div className='w-full flex flex-col items-center mt-8 text-xl text-center p-2 bg-[#2c2f3299] rounded-sm'>
                    <span className='font-bold'>Address: <span className='font-semibold underline'>{account}</span></span>
                    {/* <button className='w-full bg-purple-700 p-2 mt-2 rounded-sm border-2 border-gray-800 uppercase font-bold'>Get my files</button> */}
                </div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 bg-[#1e1e1f66] w-full flex">
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-purple-800 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Get
                        </button>
                    </div>
                </form>
                <div className='mt-4 w-full flex flex-col justify-center items-center'>
                    <h1 className='w-full border-b-4 border-[#000] text-center text-xl font-semibold'>File Records</h1>
                    <div className="overflow-x-auto mt-4 w-full">
                        {data.length !== 0 ? (
                            <table className="table-auto w-full border-4 rounded-sm">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Fie Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Date</div>
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
                                                    <div className="text-left font-semibold">{item.fileName}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap">
                                                    <div className="text-left font-medium text-green-500">{item.timestamp}</div>
                                                </td>
                                                <td className="p-2 whitespace-nowrap text-blue-500">
                                                    <button className='hover:bg-[#1e1e1f66] p-1 rounded-sm' onClick={() => handleClick(item)}>View</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <h1 className='font-bold uppercase text-2xl text-center'>No Data Found</h1>
                        )}
                    </div>
                </div>
            </div>
            <div className={`w-1/2 p-4 border-l-2 border-gray-500 flex flex-col items-center ${file !== "" ? 'justify-between' : 'justify-center'}`}>
                {file !== "" ? (<>
                    <h1 className="w-full bg-[#2c2f3299] text-xl text-center mt-8 p-2 font-semibold rounded-sm">{fileName}</h1>
                    {fileType !== "pdf" ? (
                        <div className=' bg-center flex items-center justify-center mb-16'>
                            <img src={file} alt={fileName} className='border-2 border-gray-400 p-2 rounded-sm w-full h-[500px] object-contain' />
                        </div>
                    ) : (
                        <iframe src={file} className='h-[500px] w-full mb-16' />
                    )}
                </>) : (
                    <h1 className="text-2xl font-bold">No File Selected</h1>
                )}
            </div>
        </div>
    )
}

export default Files