import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { FangBtn } from './FangBtn';

const GearSection = () => {

    const [gearRef, gearRefInView] = useInView({ threshold: 0 });

    // function for img change on desktop and mobile
    // start code 
    const [imageUrl, setImageUrl] = useState(null);

    const handleWindowResize = () => {
        const imgSRC = () => {
        if (typeof window !== 'undefined') {
            const screenSize = window.innerWidth;

            if (screenSize < 950) {
            return '/images/fangmodelsMobile.png';
            } else {
            return '/images/fangmodels.png';
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

    const WldFngz = ({ placement }) => {
        const [wildFangLogoRef, wildFangLogoInView] = useInView({ threshold: 0 });

        useEffect(() => {
            wildFangLogoInView ? document.querySelector(".wildfang-logo-area > img").classList.add('zoomingIn') : null;
        }, [wildFangLogoInView])
        return(
            <div className='outter-img-wrap'>
            <div ref={wildFangLogoRef} className={placement == 'desktop' ? 'wildfang-logo-area desktop' : 'mobile wildfang-logo-area'} >
                <Image src='/images/wildfangslogo.png' height={135} width={157} />
            </div>
            </div>
        )
    }

    useEffect(()=>{

         //animation pills turned off. remove // to turn it on
         
        // if(gearRefInView){
        //     document.querySelector("#gear > div").classList.add("seperate-down")
        //     document.querySelector("#fangModels").classList.add("seperate-up")
        // }else{
        //     document.querySelector("#gear > div").classList.remove("seperate-down")
        //     document.querySelector("#fangModels").classList.remove("seperate-up")
        // }
    }, [gearRefInView])




    return (
        <section id="gear" ref={gearRef}>
            <div>
                <div className="section-copy purple-bg">
                    <div className='copy-wrap'>
                        <h2>GEAR UP WITH <span className="gold">WLDFNGZ</span>.</h2>
                        <WldFngz placement={'mobile'} />
                        <div className="copy-btns">

                            <FangBtn
                                label="SHOP"
                                linkTo="https://shop.awoostudios.com/pages/wldfngz"
                                extraClasses='section-button'
                            /> 
                            <FangBtn
                                label="FOLLOW"
                                linkTo="https://www.instagram.com/wldfngz/"
                                extraClasses='section-button'
                            />

                        </div>
                        <p className='section-p'>
                            WLDFNGZ is the streetwear brand worn by Fang Gang. From digital collectibles to the real world, we’re biting the gap between the dopest metaverse fits and real life streetwear.
                        </p>
                        <p className='section-p'>
                            Every piece of apparel is crafted with care in New Fang City.
                        </p>
                    </div>
                </div>
                <WldFngz placement={'desktop'} />
            </div>

            {imageUrl && (
                <Image id="fangModels" src={imageUrl} width={1253} height={415}/>
            )}
            
        </section>
    )
}

export default GearSection;