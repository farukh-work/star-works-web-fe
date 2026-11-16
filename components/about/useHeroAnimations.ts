"use client";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';

gsap.registerPlugin(useGSAP);

interface AnimationRefs {
    container: RefObject<HTMLDivElement | null>;
    titleRef: RefObject<HTMLHeadingElement | null>;
    paraRef: RefObject<HTMLParagraphElement | null>;
    star1Ref: RefObject<HTMLSpanElement | null>;
    star2Ref: RefObject<HTMLSpanElement | null>;
    tagRef?: RefObject<HTMLHeadingElement | null>;
}

export const useHeroAnimations = ({
    container,
    titleRef,
    paraRef,
    star1Ref,
    star2Ref,
    tagRef
}: AnimationRefs) => {
    useGSAP(() => {
        const tl = gsap.timeline();
        const navEl = document.querySelector("nav");

        if (navEl) {
            tl.fromTo(
                navEl,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
        }

        if (tagRef?.current) {
            tl.fromTo(tagRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                navEl ? "-=0.4" : 0.2
            );
        }

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                tagRef?.current ? "-=0.5" : (navEl ? "-=0.4" : 0.2)
            );
        }

        if (paraRef.current) {
            tl.fromTo(paraRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                "-=0.5"
            );
        }

        const stars = [star1Ref.current, star2Ref.current].filter(Boolean);
        if (stars.length > 0) {
            tl.from(stars, {
                scale: 0,
                rotation: -180,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'back.out(2)',
            }, "-=0.5");

            // Floating animation for stars
            gsap.to(stars, {
                y: 15,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.5,
                    repeat: -1,
                    yoyo: true
                }
            });
        }
    }, { scope: container });
};
