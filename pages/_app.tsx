import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/Global.Style";
import 'tailwindcss/tailwind.css'
import '../styles/_app.css'
import {Provider, useSelector} from "react-redux";
import {RootState, store, useAppDispatch} from '../redux/store/store'
function MyApp({ Component, pageProps }: AppProps) {

    return (

          <Provider store={store}>
              <GlobalStyle/>
              <Component {...pageProps} />
          </Provider>

  )
}

export default MyApp



