import type {AppProps} from 'next/app'
import {GlobalStyle} from "../styles/Global.Style";
import 'tailwindcss/tailwind.css'
import '../styles/_app.css'
import {Provider} from "react-redux";
import {store} from '../redux/store/store'
import {FETCH_CHAT_DATA} from "../redux/reducer/Chats.Reducer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <GlobalStyle/>
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
      </>

  )
}

export default MyApp



