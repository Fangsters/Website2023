import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { FangBtn } from './FangBtn';

import ClaimDrawer from './ClaimDrawer';
import FangRunner from './FangRunnerDrawer';

const PxlFangsSection = (props) => {
  const [claimDrawerActive, setClaimDrawerActive] = useState(false);
  const [fangRunnerActive, setFangRunnerActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pxldivRef = useRef(null);

  const handleToggleClaimDrawer = () => {
    if (fangRunnerActive) {
      setFangRunnerActive(false);
      setTimeout(() => {
        document.querySelector('#game-drop-down').classList.add('hidden');
        setClaimDrawerActive(true);
      }, 1000);
    } else if (claimDrawerActive == false) {
      setClaimDrawerActive(true);
    }

    if (claimDrawerActive) {
      setClaimDrawerActive(false);
      pxldivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      setTimeout(() => {
        document.querySelector('#claim-drop-down').classList.add('hidden');
      }, 1000);
    }
  };

  const handleToggleFangRunnerDrawer = () => {
    if (claimDrawerActive) {
      setClaimDrawerActive(false);
      setTimeout(() => {
        document.querySelector('#claim-drop-down').classList.add('hidden');
        setFangRunnerActive(true);
      }, 1000);
    } else if (fangRunnerActive == false) {
      setFangRunnerActive(true);
    }

    if (fangRunnerActive) {
      setFangRunnerActive(false);
      pxldivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      setTimeout(() => {
        document.querySelector('#game-drop-down').classList.add('hidden');
      }, 1000);
    }
  };

  const PxlMascot = ({ placement }) => {
    const [pxlFangAvatarRef, pxlFangAvatarRefInView] = useInView({ threshold: 1 });
    useEffect(() => {
      pxlFangAvatarRefInView ? document.querySelector('.px-fang-img-area > img').classList.add('toaster-pop-up') : null;
      pxlFangAvatarRefInView ? document.querySelector('#px-top > div.outter-img-wrap.desktop > div > img').classList.add('toaster-pop-up') : null;
    }, [pxlFangAvatarRefInView]);
    return (
      <div ref={pxldivRef} className={placement == 'desktop' ? 'outter-img-wrap desktop' : 'outter-img-wrap mobile'}>
        <Image id="musicfang" src="/images/musicfang.gif" width={106} height={70} />
        <div className="px-fang-img-area" ref={pxlFangAvatarRef}>
          <Image src="/images/superpxlmascot.png" alt="pxlfang mascot" width={200} height={200} />
        </div>
        <Image className="logo" id="pxl-logo" src="/images/px-fang-copy-logo.png" alt="pxlfang mascot" width={212} height={80} />
      </div>
    );
  };

  useEffect(() => {
    document.querySelector('#game-drop-down').classList.add('hidden');
    document.querySelector('#claim-drop-down').classList.add('hidden');
  }, []);

  return (
    <section id="pxlfangs">
      <div id="px-wrapper">
        <div id="px-top">
          <div id="pxl-copy">
            <h2>
              RUN WITH THE <span className="gold">PXLFANGS</span>.
            </h2>
            <PxlMascot placement={'mobile'} />
            <div className="copy-btns">
              <FangBtn label="JOIN" linkTo="https://magiceden.io/collections/ethereum/0x30917a657ae7d1132bdca40187d781fa3b60002f" extraClasses="section-button" />
              <FangBtn label="CLAIM" extraClasses="section-button" passedFunction={() => handleToggleClaimDrawer()} />
              <FangBtn label={'PLAY'} extraClasses="section-button" passedFunction={() => handleToggleFangRunnerDrawer()} />
            </div>
            <p className="raised">To expand the Fangverse we introduced PxlFangs, a first of its kind pixelated side collection. Every Fangster has a PxlFangster attached, claimable for free.</p>
            <p>With PxlFangs you’ll get access to exclusive skins in some of the most popular metaverse projects, passive $AWOO income and more.</p>
            <p>To accompany this expansion we also released the arcade game Fang Runner.</p>
          </div>

          <PxlMascot placement={'desktop'} />
        </div>
        <Image id="pxl-clock" src="/images/pxlclock.gif" width={38} height={38} />
        <Image id="brain" src="/images/pxl_brain.gif" width={38} height={38} />
        <Image id="fangrunner-runs-to-left" src="/images/fangrun.gif" width={150} height={150} />
        <Image id="smallDiamond-left" src="/images/pxl_smalldiamond.gif" width={19} height={19} />
        <Image id="smallDiamond-middle" src="/images/pxl_smalldiamond.gif" width={19} height={19} />
        <Image id="smallDiamond-right" src="/images/pxl_smalldiamond.gif" width={19} height={19} />
        <Image id="bigDiamond-left" src="/images/big-diamond.gif" width={38} height={38} />
        <Image id="bigDiamond-right" src="/images/big-diamond.gif" width={38} height={38} />
        <Image id="icecream-fangster" src="/images/icecreamfang.gif" width={95} height={106} />
        <Image id="sidewalk" src="/images/sidewalk.png" width={1441} height={25} />
      </div>

      <div className="drawers-wrapper">
        <ClaimDrawer handleToggleClaimDrawer={handleToggleClaimDrawer} claimDrawerActive={claimDrawerActive} web3={props} />
        <FangRunner handleToggleFangRunnerDrawer={handleToggleFangRunnerDrawer} fangRunnerActive={fangRunnerActive} isConnected={props.isConnected} />
      </div>
    </section>
  );
};

export default PxlFangsSection;
