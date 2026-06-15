import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Djordje Jovanovic — QA Engineer and Full-Stack Developer from Belgrade. Selenium C#, manual testing, REST API testing, .NET, React." />
        <meta name="keywords" content="QA Engineer, Selenium, C#, manual testing, API testing, .NET, React, Belgrade, freelance" />
        <meta name="author" content="Djordje Jovanovic" />

        <meta property="og:title" content="Djordje Jovanovic | QA Engineer & Developer" />
        <meta property="og:description" content="I build software and break it on purpose — so your users don't find the bugs first." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://djordjejo.github.io" />
        <meta property="og:image" content="https://djordjejo.github.io/og-image.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}