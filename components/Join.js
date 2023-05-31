import Image from "next/image"
import { FangBtn } from "./FangBtn"

const Join = () => {

  const FloatyFang = ({ placement }) => {
    return (
        <div id='cfw_discord' className={placement == 'desktop' ? 'desktop' : 'mobile'}>
            <Image src="/images/CFW.png" className="floaty1" width={284} height={384} />
            <Image src="/images/discord_chat.png" width={359} height={311} />
        </div>
    )
  } 

  return (
    <section id="join" className="purple-bg">
        <div className="section-copy">
            <div className="copy-wrap">
                  <h2>JOIN A CREATIVE <span className='gold'> COMMUNITY</span>.</h2>
                  <FloatyFang placement={'mobile'} />
                <div className="copy-btns">
                  
                  <FangBtn
                    label="CHAT"
                    linkTo="https://discord.gg/fanggang"
                    extraClasses='section-button'
                  />

                  <FangBtn
                    label="ART"
                    linkTo="https://opensea.io/collection/fangganggoodies"
                    extraClasses='section-button'
                  />

                </div>
                  <p className="section-p">
                      A supportive network full of talented and enthusiastic contributors to web3. The Fang Gang community as a whole has established itself as one of the most welcoming ones.
                  </p>
                  <p className="section-p">
                      Tons of meaningful connections have been made, great projects have been founded from within the community and making others feel included is always a priority to its members.
                  </p>
                  <p className="section-p">
                      Join our Discord to get to know us and get a Fangster when you’re ready.
                  </p>
            </div>
        </div> 
        <FloatyFang placement={'desktop'}/>
    </section>
  )
}

export default Join;
