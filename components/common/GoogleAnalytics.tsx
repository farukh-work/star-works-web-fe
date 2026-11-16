import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3SR36FTMJ2"
        strategy="lazyOnload"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-3SR36FTMJ2');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
