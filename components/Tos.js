import React from 'react';
import Image from 'next/image';

export const Tos = ({hidden, setShowTos}) => {
  return (
    <div id="terms-modal" className={hidden ? '' : 'hidden'}>
        <div className="modal">
              <h2>Terms of Use and Conditions</h2>
              <div className='close-btn-wrapper'>
                <Image
                  onClick={() => setShowTos(false)}
                  src="/images/menu-x.svg"
                  width={25}
                  height={25}
                />
              </div>
            <div className="modal-wrap">
                  <div className="modal-section">
                    <h3>Terms of Use</h3>
                      <p>This website www.fanggang.io ("our website") is property of Awoo Studios, LDA., legal person no. 516717030, with registered office at Rua Fialho de Almeida n. º 14, 2.º Esq. – Escritório DD5, 1070-129, Avenidas Novas, Lisboa, Portugal ("Awoo Studios").

                        These Terms and Conditions ("T&C") establish the terms governing the use of our website. Please read them carefully before using our website.</p>
                  </div>
                  <div className="modal-section">
                      <h3>Information about Fang Gang</h3>
                      <p>Fang Gang is a Non-Fungible Token ("NFT") collection on the Ethereum Blockchain based on trait-generative art. Our main characters are called Fangsters.

                          Fang Gang is not a wallet provider, exchange, broker, financial institution, or creditor.

                          Please read carefully these T&C as they contain important information on the use of this website which may affect your legal rights.</p>
                  </div>
                  <div className="modal-section">
                      <h3>Intellectual property</h3>
                      <p>The contents and materials available in Awoo Studios website (including, but not limited to, text, graphics, images, pictures, logos, page headers, button icons, scripts, sound files or any other files, and the selection and arrangement thereof) are property of Awoo Studios and are protected under copyright, trademark rights and other industrial and intellectual property rights ("IP").

                          By using our website, you agree not to take any action(s) inconsistent with such IP rights and interests, namely, you shall not copy, use, reproduce or broadcast, in whole or in part, any contents and materials without Awoo Studios prior written permission.

                          All other third-party IP rights displayed on our website are property of their respective right holders and may not be copied, used, reproduced or broadcast, in whole or in part, without their permission.

                          Reference to any websites, services or other information by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship, or recommendation by Awoo Studios.

                          Awoo Studios authorizes the visualization, printing, and storage of the contents on our website exclusively for personal use and without lucrative intent. Any other use or exploitation will be subject to prior written authorisation from Awoo Studios.</p>
                  </div>
                  <div className="modal-section">
                      <h3>Contents and links</h3>
                      <p>Our website provides content of its own and content made available by third parties. Awoo Studios reserves the right to modify at any time the presentation, configuration and location of the website and/or the respective contents and materials. Awoo Studios does not guarantee the reliability, truthfulness, accuracy, exhaustiveness, and timeliness of third-party content on our website.

                          At any time and without prior notice, Awoo Studios reserves the right to change or update all information in our website.

                          Awoo Studios only provides links to the websites that it considers to be compliant with the applicable legislation and it reserves the right to remove links to any website, for any reason, and without prior notice, particularly if it becomes aware that the activities carried out on such website or its content are illegal or infringe the rights of third-parties, or if ordered to do so by court or administrative decision.</p>
                  </div>
                  <div className="modal-section">
                      <h3>Modification of the terms and conditions</h3>
                      <p>Awoo Studios reserves the right, whenever it deems necessary, to change, add or delete parts of these T&C without prior notice. Periodical consultation of these T&C is, therefore, advised.</p>
                  </div>
                  <div className="modal-section">
                      <h3>Applicable law and jurisdiction</h3>
                      <p>These T&C are governed by and shall be construed in accordance with the Portuguese law. Any dispute arising from the use of our website shall be governed by Portuguese law and shall be submitted to the exclusive jurisdiction of the Portuguese courts.</p>
                  </div>
                  <hr />
                  <span id="last-updated">Last updated: <strong>4 February 2022</strong></span>
            </div>
        </div> 
    </div>
  )
}
