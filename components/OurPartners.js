import React from 'react'
import Image from 'next/image'


const OurPartners = () => {
  return (
      <div id="ourPartners" >
          <div className='copy-wrap'>
            <h2>OUR PARTNERS.</h2>
            <div id="partners-area">
                <Image src="/images/nord.svg" width={180} height={41} />
                <Image src="/images/boson.png" width={188} height={41}/>
                <Image src="/images/nfc.svg" width={107} height={41} />
            </div>
        </div>
      </div>
  )
}

export default OurPartners;