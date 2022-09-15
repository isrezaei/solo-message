import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/Global.Style";
import 'tailwindcss/tailwind.css'
import '../styles/_app.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>

  )
}

export default MyApp



