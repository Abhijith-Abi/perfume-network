import React from 'react'
import { Reveal } from '@/components/ui'
import { FeaturedScents } from '@/features/catalog'
import HeroIntro from '../components/HeroIntro'
import CategoryShowcase from '../components/CategoryShowcase'
import AboutSection from '../components/AboutSection'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroIntro />
      <Reveal><CategoryShowcase /></Reveal>
      <Reveal><FeaturedScents /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><Newsletter /></Reveal>
    </>
  )
}
