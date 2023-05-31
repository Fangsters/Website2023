import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ethers, BigNumber } from 'ethers'

import PxlABI from '../artifacts/contracts/PxlFangs.sol/PxlFangs.json'
import FangABI from '../artifacts/contracts/FangGang.sol/FangGang.json'
import { FangBtn } from './FangBtn';

const ClaimDrawer = ({ web3, handleToggleClaimDrawer, claimDrawerActive}) => {

    const {
        isConnected, connect,
        FANG_GANG_CONTRACT_ADDRESS, 
        PXL_FANGS_CONTRACT_ADDRESS
    } = web3;

    const [fangsterToCheckClaim, setFangsterToCheckClaim] = useState('');
    const [userFangs, setUserFangs] = useState([]);
    const [toggledForClaimTokens, setToggledForClaimedTokens] = useState([]);
    const [unclaimedFangs, setUnclaimedFangs] = useState([]);

    const [isClaimable, setIsClaimable] = useState(null);
    const [invalidFangster, setInvalidFangster] = useState(false);

    const AvailableFangsterText = () => {
        return <h3 className='available-text'>Fangster {fangsterToCheckClaim} can still claim a PxlFangster.</h3>
    }

    const UnavailableFangsterText = () => {
        return <h3 className='unavailable-text'>Fangster {fangsterToCheckClaim} has already claimed its PxlFangster.</h3>
    }

    const InvalidFangsterText = () => {
        return <h3 className='unavailable-text'>You've entered an invalid Fangster ID. <br /> Please try something between 0 and 8887.</h3>
    }

    const fangLoader = ({ src }) => {
        return `https://fanggang.s3.us-east-2.amazonaws.com/img/${src}`;
    }

    async function getFangstersFromWallet() {
        if (!isConnected) {
            return
        } else {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const [add] = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fgcontract = new ethers.Contract(FANG_GANG_CONTRACT_ADDRESS, FangABI.abi, signer);
            const pxcontract = new ethers.Contract(PXL_FANGS_CONTRACT_ADDRESS, PxlABI.abi, signer);

            
            let fangs = await fgcontract.tokensOfOwner(add);


            let fangIds = fangs.map(fang => {
               return BigNumber.from(fang._hex).toString();
            })

            console.log("fangs from contract methods: ", fangIds);


            let _data = fangIds.map(async (id) => {
                let claimed = await pxcontract.claimed(id);
                return { id, claimed }
            })

            let fangsters = await Promise.all(_data);
            //uncomment to see data on fangs
            // fangsters.forEach(fang => console.log(fang));
            setUserFangs(fangsters);


        }

    }


    async function checkFangster() {
        if (fangsterToCheckClaim == null || fangsterToCheckClaim == '') return
        if (fangsterToCheckClaim > 8887 || fangsterToCheckClaim < 0) {
            setInvalidFangster(true)
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(PXL_FANGS_CONTRACT_ADDRESS, PxlABI.abi, signer);
        
        const claimed = await contract.claimed(fangsterToCheckClaim);

        if (claimed) {
            setIsClaimable(false);
        } else {
            setIsClaimable(true);
        }
    }

    // handle input change for claim checker
    const handleClaimCheckChange = (event) => {
        setFangsterToCheckClaim(event.target.value)
    }

    const handleSelectMax = () => {
        let all = unclaimedFangs.map(each => each.id)
        setToggledForClaimedTokens(all);
    }

    const handleUnselectAll = () => {
        setToggledForClaimedTokens([]);
    }


    //adds fangster ids to an array for claiming
    //if it's already in the array, it removes it
    const toggleForClaim = (fangId) => {
        if (toggledForClaimTokens.includes(fangId)) {
            console.log('removing token...')
            let arr = toggledForClaimTokens.filter(id => id != fangId);
            setToggledForClaimedTokens(arr);
        } else {
            console.log('adding token...')
            let arr = [...toggledForClaimTokens, fangId]
            setToggledForClaimedTokens(arr);
        }
    }

    const handlePxlClaims = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(PXL_FANGS_CONTRACT_ADDRESS, PxlABI.abi, signer);

        try {
            await contract.claimToken(toggledForClaimTokens);
            alert("Successfully Claimed pxl fangs")
        } catch (error) {
            console.error("There was an error during claim: ", error);
        }

    }
  
    const RenderFangsters = () => {
        let fangsters = userFangs.map(fang => {
            fang.claimed ? console.log(fang.id + ' is claimed') : console.log(fang.id + ' is not claimed');
            if (fang.claimed) {
                return (
                    <div key={`fang-${fang.id}`}>
                        <div className='already-claimed'>
                            <p className='claimed-text'>CLAIMED</p>
                        </div>
                        <Image 
                            key={`fang-${fang.id}`}
                            loader={fangLoader}
                            src={`${fang.id}.png`}
                            width={250}
                            height={250}
                            alt={`Fangster ${fang.id}`}
                        />
                    </div>
                )
            } else {
                return (
                    <>
                        <Image
                            key={`fang-${fang.id}`}
                            onClick={() => toggleForClaim(fang.id)}
                            src={`${fang.id}.png`}
                            loader={fangLoader}
                            className={toggledForClaimTokens.includes(fang.id) ? 'selected-for-claim' : 'claimable'}
                            width={250}
                            height={250}
                        />
                    </>
                )
            }
        })
        return fangsters;
        
    }


    useEffect(() => {
        getFangstersFromWallet();
    }, [isConnected])

    useEffect(() => {
        let unclaimed = userFangs.filter(fangster => fangster.claimed == false);
        setUnclaimedFangs(unclaimed);
    }, [userFangs.length])

    useEffect(()  => {
        setTimeout(()=>{
            claimDrawerActive ? document.getElementById('claim-drop-down').scrollIntoView({ behavior: 'smooth' }) : null;
        },1000)
    }, [claimDrawerActive])

    useEffect(() => {
        setIsClaimable(null);
        setInvalidFangster(null);
    }, [fangsterToCheckClaim])


    return (
        <div id="claim-drop-down" className={claimDrawerActive ? 'droppingDown' : 'closingUp'}>
            <div className='drawer-x-btn' onClick={() => handleToggleClaimDrawer()}>
                <Image src="/images/menu-x.svg" width={25} height={25} />
            </div>
            <div id="claim">
                <div id="claim-header">
                    <h2 className="black">CLAIM YOUR PXLFANGSTER.</h2>
                    <div id='claim-inputs-wrap'>
                        <input
                            value={fangsterToCheckClaim}
                            type="number"
                            placeholder="8888"
                            onChange={(event) => handleClaimCheckChange(event)}
                            min={0}
                            max={8887}
                        />
                        <a
                            onClick={() => checkFangster()}
                            className='purple-drawer-btn'
                        >
                            CHECK CLAIM STATUS
                        </a>
                    </div>
                    {isClaimable &&
                        <AvailableFangsterText />
                    }

                    {!isClaimable && isClaimable != null &&
                        <UnavailableFangsterText />
                    }

                    {invalidFangster &&
                        <InvalidFangsterText/>
                    }


                </div>

                {!isConnected &&
                    <a 
                    id='wallet-connect'
                    onClick={() => connect()}
                    >
                        CONNECT WALLET
                    </a>
                }

                {userFangs.length == 0 && isConnected &&
                    <div id='no-fangsters'>
                        <Image
                            src='/images/FangySweat.png'
                            width={175}
                            height={156}
                            alt="fangy!"
                        />
                        <h3>Uh oh! It looks like you don't have any fangsters yet!</h3>
                        <a
                            href="https://opensea.io/collection/fanggangnft"
                        >
                            JOIN
                        </a>

                    </div>
                }

                {userFangs.length > 0 && isConnected &&
                <>
                    <div id="current_fangs" style={{ display: userFangs ? 'flex' : 'none' }}>
                        <RenderFangsters />
                    </div>
                
                    <div id="claim-options">
                        <div>
                            <a
                                onClick={() => handleSelectMax()}
                                className='claim-options-button'
                            >
                                SELECT MAX (${unclaimedFangs.length})
                            </a>
                            <a
                                
                                onClick={() => handleUnselectAll()}
                                className='claim-options-button'
                            >
                                UNSELECT ALL
                            </a>
                        </div>
                        <a
                            id='claim-btn'
                            disabled={unclaimedFangs.length > 0 ? false : true}
                            className={unclaimedFangs.length == 0 || toggledForClaimTokens.length == 0 ? 'none-to-claim' : 'some-to-claim'}
                            onClick={() => handlePxlClaims()}
                        >
                            CLAIM
                        </a>
                    </div>
                
                </>
                }
                
            </div>
            <Image
                className="pxl-arrow"
                src="/images/pxlfangarrow.png"
                width={103}
                height={69}
                onClick={() => handleToggleClaimDrawer()}
            />
        </div>
    )
};


export default ClaimDrawer;