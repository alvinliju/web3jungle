"use client";
import { motion } from "motion/react"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ethers } from "ethers";
import { FiMenu, FiX } from "react-icons/fi";
import { Menu, X, ExternalLink, Wallet } from "lucide-react"
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function NavbarListing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await provider.send("eth_requestAccounts", []);
        const singer = await provider.getSigner();
        const address = await singer.getAddress();
        console.log(address);
        setWalletAddress(address);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

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

          {/* Desktop Menu Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/listings"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/submit"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Submit
            </Link>
            <Link
              href="/about"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
          {!walletAddress && (
            <Button
              onClick={connectWallet}
              className=" hidden md:flex bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Connect Wallet
            </Button>
          )}
          {walletAddress && (
            <div className="hidden md:flex">
              {" "}
              <p className="text-xl font-bold">
                {walletAddress.slice(0, 6)}...
              </p>{" "}
            </div>
          )}

          
          {/* Mobile Menu Toggle */}
          <motion.div className="md:hidden" exit={{ opacity: 0 }}>
            <Button onClick={(e)=> setMenuOpen(prev => !prev)} className="hover:cursor-pointer bg-black hover:bg-slate-950">
             {!menuOpen ? <FiMenu /> : <X />}

            </Button>     
          </motion.div>

          
        </nav>
      </div>
      {menuOpen && <div className="bg-black w-full min-h-screen max-h-full z-50 absolute p-12">

            <div className="flex flex-col items-center gap-12">
            <Link
              href="/listings"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/submit"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Submit
            </Link>
            <Link
              href="/about"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <div>
            {!walletAddress && (
            <Button
              onClick={connectWallet}
              className="flex bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Connect Wallet
            </Button>
          )}
          {walletAddress && (
            <div>
              {" "}
              <p className="text-xl font-bold">
                {walletAddress.slice(0, 6)}...
              </p>{" "}
            </div>
          )}
            </div>
            
          </div>
          </div> }
    </header>
  );
}
