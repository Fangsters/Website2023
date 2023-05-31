import '@/styles/globals.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
config.autoAddCss = false

import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
})


library.add(faTwitter);

export default function App({ Component, pageProps }) {
  return(
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
