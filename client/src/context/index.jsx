import { useContext, createContext } from 'react';
import { useAddress, useContract, useContractWrite, useSigner } from '@thirdweb-dev/react';
import axios from 'axios';
import { ethers } from 'ethers';

import MedicalRecord from './MedicalRecord.json'
import { currentTimestamp } from '../utils';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // const { contract } = useContract('0x862441F3a8E967b15423BC5587773A9e8c2D9b37')
    const { contract } = useContract('0xDc3bDC2e7605A856498b3cD509249A856FE9F7f3')
    const { mutateAsync: Add } = useContractWrite(contract, 'Add')
    const { mutateAsync: Allow } = useContractWrite(contract, 'Allow')

    const address = useAddress();
    const signer = useSigner();

    const contractCopy = new ethers.Contract('0xDc3bDC2e7605A856498b3cD509249A856FE9F7f3', MedicalRecord.abi, signer)

    const uploadData = async ({ formData }) => {
        const data = {}
        try {
            // console.log(formData, import.meta.env.VITE_REACT_APP_PINATA_API_KEY, import.meta.env.VITE_REACT_APP_PINATA_API_SECRET)
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': import.meta.env.VITE_REACT_APP_PINATA_API_KEY,
                    'pinata_secret_api_key': import.meta.env.VITE_REACT_APP_PINATA_API_SECRET,
                    "Content-Type": "multipart/form-data"
                }
            })
            const fileHash = `ipfs://${resFile.data.IpfsHash}`
            const fileName = formData.get('file').name.split('.')[0]
            const fileType = formData.get('file').type.split('/')[1]
            const timestamp = currentTimestamp()

            try {
                const res = await Add({
                    args: [
                        fileHash,
                        fileName,
                        timestamp,
                        fileType
                    ]
                })
                data.res = res
            } catch (error) {
                return {
                    message: "Error while uploading file to blockchain",
                    error: error.message,
                    status: 'error'
                }
            }
            data.fileData = resFile.data
            return {
                data: data,
                status: 'success'
            }
        } catch (error) {
            return {
                message: "Error while uploading file to IPFS",
                error: error,
                status: 'error'
            }
        }
    }

    const fetchData = async (_user) => {
        try {
            const res = await contractCopy.Display(_user)
            return {
                data: res,
                status: 'success'
            }
        } catch (error) {
            return {
                message: "Error while fetching data from blockchain",
                error: error.message,
                status: 'error'
            }
        }
    }

    const getAccessList = async () => {
        try {
            const res = await contractCopy.ShareAccess()
            // console.log(res)
            return {
                data: res,
                status: 'success'
            }
        } catch (error) {
            return {
                message: "Error while fetching data from blockchain",
                data: error.message,
                status: 'error'
            }
        }
    }

    const grantAccess = async (_user) => {
        try {
            const res = await Allow({
                args: [
                    _user
                ]
            })
            return {
                data: res,
                status: 'success'
            }
        } catch (error) {
            return {
                message: "Error while granting access",
                data: error.message,
                status: 'error'
            }
        }
    }

    return (
        <StateContext.Provider value={{
            contract,
            address,
            uploadData,
            fetchData,
            getAccessList,
            grantAccess
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);