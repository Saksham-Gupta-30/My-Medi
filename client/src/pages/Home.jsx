import React from 'react';
import { Link } from 'react-router-dom';

import { Link as link } from '../assets';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header Section */}
            {/* <header className="bg-blue-600 p-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-white">Welcome to My-Medi</h1>
                    <p className="text-white mt-2">Securely manage and share your medical records on the blockchain</p>
                </div>
            </header> */}

            {/* Main Content */}
            <main className="container mx-auto p-6 mt-2 bg-white rounded shadow">
                {/* About the App Section */}
                <section id="about" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About My-Medi</h2>
                    <p className="text-gray-700 mb-4">
                        My-Medi is a secure platform that allows you to store, manage, and share your medical records using blockchain technology.
                        Our app ensures that your sensitive health information is safe and accessible only by authorized individuals.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>Upload and store medical records securely</li>
                        <li>View your records anytime, anywhere</li>
                        <li>Share access with healthcare providers</li>
                        <li>Revoke access when needed</li>
                    </ul>
                </section>

                {/* Guide to Use the App Section */}
                <section id="guide">
                    <h2 className="text-2xl font-bold mb-4">Guide to Use My-Medi</h2>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">
                            Step 1: Get a Wallet
                        </h3>
                        <p className="text-gray-700">
                            To get started, you need a wallet to store your digital assets. We recommend using MetaMask, a popular crypto wallet that works with most browsers.
                        </p>
                    </div>
                    <div className='mb-6'>
                        <h3 className='text-xl font-semibold mb-2'>
                            Step 2: Connect Wallet
                        </h3>
                        <p className='text-gray-700'>
                            Click on the "Connect Wallet" button in the header to sign in using your wallet. This will give you access to your dashboard.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                            Step 3: Upload Medical Records
                            <Link to="/upload" className="ml-2 text-blue-500 underline">
                                <img src={link} alt="link" className="ml-2 w-6 h-6" />
                            </Link>
                        </h3>
                        <p className="text-gray-700">
                            Upload your medical records securely to the blockchain. Your data will be encrypted and accessible only by you and authorized individuals.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                            Step 4: View Medical Records
                            <Link to="/files" className="ml-2 text-blue-500 underline">
                                <img src={link} alt="link" className="ml-2 w-6 h-6" />
                            </Link>
                        </h3>
                        <p className="text-gray-700">
                            View your medical records anytime, anywhere using our secure platform. You can download your files as needed.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                            Step 5: Share Access
                            <Link to="/share" className="ml-2 text-blue-500 underline">
                                <img src={link} alt="link" className="ml-2 w-6 h-6" />
                            </Link>
                        </h3>
                        <p className="text-gray-700">
                            Share access to your medical records with healthcare providers or family members. You control who can view your data.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                            Step 6: Revoke Access
                            <Link to="/remove" className="ml-2 text-blue-500 underline">
                                <img src={link} alt="link" className="ml-2 w-6 h-6" />
                            </Link>
                        </h3>
                        <p className="text-gray-700">
                            Revoke access to your medical records at any time. This will prevent unauthorized individuals from viewing your data.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
