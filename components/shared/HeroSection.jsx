"use client";

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

const HeroSection = () => {
    const imageRef = useRef();

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            } else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
  return (
      <div className='pb-20 px-4'>
          <div className='container text-center mx-auto'>
              <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title'>Manage your Finances <br /> with Intelligence</h1>
              <p className='text-xl text-gray-600 my-8 max-w-2xl mx-auto'>An AI-Powered financial management platform that helps you track, manage, optimize and analyze your spending with real time insights</p>
              <div className="flex justify-center space-x-4">
                  <Button size={"lg"} className="px-8" asChild>    
                  <Link href={"/dashboard"} className=''>Get Started</Link>
                  </Button>
                  <Button size="lg" asChild variant={"outline"} className="px-8">
                      <Link href={"/demo"}>
                          Watch Demo
                      </Link>
                  </Button>
              </div>
              <div className="hero-image-wrapper">
                  <div ref={imageRef} className="hero-image">
                      <Image
                          src={"/banner.jpeg"}
                          width={1280}
                          height={720}
                          alt='Dashboard Preview'
                          className='rounded-lg shadow-2xl border mx-auto'
                      />
                  </div>
              </div>
          </div>
    </div>
  )
}

export default HeroSection