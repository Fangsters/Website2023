import { Inter } from '@next/font/google'

import { useEffect } from 'react'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from '@wagmi/core'

import { Network, Alchemy } from "alchemy-sdk";

import NavComponent from '@/components/Navbar'
import IntroSection from '@/components/Intro'
import MeetSection from '@/components/Meeting'
import PxlFangsSection from '@/components/PxlFangSection'
import GearSection from '@/components/GearUpSection';
import Join from '@/components/Join';
import NewFangCity from '@/components/NewFangCity';
import AwooStudios from '@/components/AwooStudios';
import OurPartners from '@/components/OurPartners';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    //uncomment to use a disconnect functionality
    // const { disconnect } = useDisconnect();

    const FANG_GANG_CONTRACT_ADDRESS = '0x9d418c2cae665d877f909a725402ebd3a0742844';
    const PXL_FANGS_CONTRACT_ADDRESS = '0x30917A657Ae7d1132bdcA40187D781FA3B60002F';

    //configure new alchemy object with an options obj
    const alchemy = new Alchemy({
        apiKey: "QVgxIPWahXBDZTW_ZvQdl-_pkMF2anDw",
        network: Network.ETH_MAINNET,
    });


    //make sure it's user is connected to the site
    // useEffect(()=>{
    //     if(isConnected){
    //         console.log("Connected with: ", address);
    //     }
    //     if(!isConnected){
    //         connect();
    //     }
    // },[])

  return (
    <>
        <NavComponent />
        <main>
            <IntroSection />
            <MeetSection />
            <PxlFangsSection 
                isConnected={isConnected}
                alchemy={alchemy}
                address={address}
                connect={connect}
                PXL_FANGS_CONTRACT_ADDRESS={PXL_FANGS_CONTRACT_ADDRESS}
                FANG_GANG_CONTRACT_ADDRESS={FANG_GANG_CONTRACT_ADDRESS}
            />
            <GearSection />
            <Join />
            <NewFangCity />
            <AwooStudios />
            <OurPartners />
        </main>
        <Footer />
    </>
  )
}
