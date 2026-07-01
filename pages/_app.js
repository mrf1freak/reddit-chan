import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KD3CG888BB" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-KD3CG888BB');
          `}
        </Script>
        <Component {...pageProps} />
  </>
}

export default MyApp
