import React, { useState } from 'react'

import { useStateContext } from '../context/index'

const Upload = () => {
    const [fileName, setFileName] = useState('NO FILE SELECTED')
    const [file, setFile] = useState(null)

    const { uploadData, address } = useStateContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (address === undefined) {
            alert('Wallet Not Connected')
            return
        }
        const formData = new FormData();
        formData.append('file', file);
        // console.log(formData.get('file').type.split('/')[1])
        const res = await uploadData({ formData })
        if (res.status === 'success') {
            alert('File Uploaded Successfully')
        } else {
            alert('Error while uploading file')
        }
        setFileName('NO FILE SELECTED')
        setFile(null)
    }

    const handleFileChange = async (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0])
        }
        setFileName(e.target.files[0].name)
    }

    return (
        <div className='flex w-screen h-screen'>
            <form onSubmit={handleSubmit} className="flex w-1/2">
                <div className='flex flex-col w-full p-4 border-r-2 border-gray-500 items-center justify-between'>
                    <h1 className="text-lg font-semibold mt-8 bg-[#2c2f3299] w-full text-center p-2 rounded-sm">Upload Your File</h1>
                    <div className='flex justify-center items-center flex-col mb-[250px] border-2 w-full p-4 rounded-md border-gray-400 bg-[#2c2f3233] hover:bg-[#2c2f3255]'>
                        <main className="flex items-center justify-center bg-gray-100 font-sans rounded-xl">
                            <label for="dropzone-file" className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>

                                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Upload File</h2>

                                <p className="mt-2 text-gray-500 tracking-wide">Upload or darg & drop your file JPEG, PNG, JPG or PDF. </p>

                                <input id="dropzone-file" type="file" className="hidden" accept='.pdf, .jpg, .jpeg, .png' name='data' onChange={handleFileChange} />
                            </label>
                        </main>
                        {/* <input type="file" className="block text-md text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 mb-4" accept='.pdf, .jpg, .jpeg, .png' name='data' onChange={handleFileChange} /> */}
                        <span className='font-bold uppercase flex mb-4 mt-4'>File : <p className='text-gray-500 font-normal'>- {fileName}</p></span>
                        <button type="submit" disabled={!file} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload</button>
                    </div>
                </div>
            </form>
            <div className={`w-1/2 p-4 border-l-2 border-gray-500 flex flex-col items-center ${file !== null ? 'justify-between' : 'justify-center'}`}>
                {file !== null ? (<>
                    <h1 className="w-full bg-[#2c2f3299] text-xl text-center mt-8 p-2 font-semibold rounded-sm">File Preview</h1>
                    {file.type.startsWith('image') ? (
                        <div className='bg-center flex items-center justify-center mb-16'>
                            <img src={URL.createObjectURL(file)} alt={fileName} className='border-2 border-gray-400 p-2 rounded-sm object-contain h-[500px] w-max' />
                        </div>
                    ) : (
                        <iframe src={URL.createObjectURL(file)} className='h-[500px] w-full mb-16' />
                    )}
                </>) : (
                    <h1 className="text-2xl font-bold">No File Selected</h1>
                )}
            </div>
        </div>
    )
}

export default Upload