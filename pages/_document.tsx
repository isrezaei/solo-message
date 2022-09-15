import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta property="og:title" content="solo message"/>
                <meta property="og:description" content="solo message"/>
                <meta property="og:image" content='https://user-images.githubusercontent.com/77073972/190473962-0d101210-910c-4bac-9d1b-79a0d9326f4b.png'/>
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet"/>
                <link rel="icon" href="https://user-images.githubusercontent.com/77073972/190473962-0d101210-910c-4bac-9d1b-79a0d9326f4b.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}