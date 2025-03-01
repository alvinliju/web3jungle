"use client";


import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {ethers} from "ethers";


declare global {
    interface Window {
      ethereum?: any;
    }
  }

export default function NavbarListing() {
    
    const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
    const [balance, setBalance] = React.useState<string | null>(null);
    const provider = new ethers.BrowserProvider(window.ethereum);



    const connectWallet = async () => {
        if(typeof window!=='undefined' && window.ethereum){
            try{
                
                await provider.send("eth_requestAccounts", []); 
                const singer = await provider.getSigner();
                const address = await singer.getAddress();
                console.log(address)
                setWalletAddress(address);

            }catch(e){
                console.log(e);
            }
        }else{
            alert("Please install MetaMask");
        }
    }

  return (
    <header className="border-b border-zinc-800">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text"
        >
          Web3Jungle
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
            Submit
          </Link>
          <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
            About
          </Link>
        </div>
        {!walletAddress && <Button onClick={connectWallet} className="bg-emerald-600 hover:bg-emerald-700 text-white">Connect Wallet</Button>}
        {walletAddress && <div> <p className='text-xl font-bold'>{walletAddress.slice(0, 6)}...</p> </div>}
      </nav>
    </div>
  </header>
  )
}

