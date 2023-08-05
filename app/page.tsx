"use client"

import { getZeroDevSigner, getPrivateKeyOwner } from '@zerodevapp/sdk'
import { useState } from "react";
require('dotenv').config();


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const secretKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;


export default function PrivateKeyExample() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [privateKey, setPrivateKey] = useState(secretKey)


  const createWallet = async () => {

    setLoading(true)
    const signer = await getZeroDevSigner({
      projectId: projectId,
      owner: getPrivateKeyOwner(privateKey),
    })
    setAddress(await signer.getAddress())
    setLoading(false)
  }

  return (
    <div className='m-2'>
      <div>
        <input value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} className='border mr-2' />
        <button onClick={createWallet} disabled={loading}>{loading ? 'loading...' : 'Create Wallet'}</button>
      </div>
      {address &&
        <div>
          <label>Wallet: {address}</label>
        </div>
      }
    </div>
  )

}