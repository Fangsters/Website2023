import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { FangBtn } from './FangBtn';

const MeetSection = () => {

    // function for img change on desktop and mobile made with ChatGPT
    // start code 
    const [imageUrl, setImageUrl] = useState(null);

    const handleWindowResize = () => {
        const imgSRC = () => {
        if (typeof window !== 'undefined') {
            const screenSize = window.innerWidth;

            if (screenSize < 950) {
            return '/images/GRID_PILLhalf.png';
            } else {
            return '/images/GRID_PILLfull.png';
            }
        }

        return null;
        };

        setImageUrl(imgSRC());
    };

    useEffect(() => {
        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    // end code
    // src img should look like this:
    //         {imageUrl && (
    //             <Image id="fanggrid" src={imageUrl} width={1253} height={415}/>
    //         )}


    const [meetRef, meetRefInView] = useInView({ threshold: 0 });

    const FangMascot = ({ placement }) => {        
        const [fangAvatarRef, fangAvatarRefInView] = useInView({ threshold: 1 });

        useEffect(() => {
            console.log('fang in view: ', fangAvatarRefInView)
            fangAvatarRefInView ? document.querySelector(".fang-img-area img").classList.add('toaster-pop-up') : null;
            fangAvatarRefInView ? document.querySelector("#meet > div > div.outter-img-wrap > div > img").classList.add('toaster-pop-up') : null;
        }, [fangAvatarRefInView]);
        
        return( 
            <div className={placement == 'desktop' ? 'outter-img-wrap desktop' : 'outter-img-wrap mobile'} >
                <div className="fang-img-area" ref={fangAvatarRef}>
                    <Image src='/images/mascot.png' width={200} height={195} />
                </div>
                <Image className='logo' src='/images/logoNoHash.png' width={212} height={80} />
            </div>
        )
    };


    useEffect(() => {

        //animation pills turned off. remove // to turn it on

        // if(meetRefInView){
        //     document.querySelector("#meet > div").classList.add('seperate-down');
        //     document.querySelector("#fanggrid").classList.add('seperate-up');
        // }else{
        //     document.querySelector("#meet > div").classList.remove('seperate-down');
        //     document.querySelector("#fanggrid").classList.remove('seperate-up');
        // }
    }, [meetRefInView])

    return (
        <section id="meet" ref={meetRef}>
            <div>
                <div className="section-copy purple-bg">
                    <div className='copy-wrap'>
                        <h2>MEET THE <span className="gold no-break-wrap">FANG GANG</span>.</h2>
                        <FangMascot placement={'mobile'} />
                        <div className="copy-btns">

                            <FangBtn 
                                label="JOIN"
                                linkTo="https://magiceden.io/collections/ethereum/0x9d418c2cae665d877f909a725402ebd3a0742844"
                                extraClasses='section-button'
                            />

                            <FangBtn 
                                label="SHOP"
                                linkTo="https://shop.awoostudios.com/pages/fang-gang"
                                extraClasses='section-button'
                            />

                        </div>
                        <p className='section-p'>
                            The Fang Gang comes out at night to throw parties, hang around in dark alleys and have fun on the streets of New Fang City.
                        </p>
                        <p className='section-p'>
                            What started as a character built for digital collectibles has grown to be so much more. They love streetwear, a tight-knit community, music and art. All of which has been established within the Awoo Studios ecosystem.
                        </p>
                    </div>
                </div>
                <FangMascot placement={'desktop'}/>
            </div>
            
            {imageUrl && (
                <Image id="fanggrid" src={imageUrl} width={1253} height={415}/>
            )}
            {/* <Image id="fanggrid" src={imageUrl} width={1253} height={415} /> */}
        </section>
    )
}

export default MeetSection;
