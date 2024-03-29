import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import style from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--dark', style.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      {
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe
          src="https://frow-engine.web.app/flow"
          width="100%"
          scrolling="no"
          style={{ border: 'none', height: '95vh', overflow: 'hidden' }}
        />
      }
    </Layout>
  )
}
