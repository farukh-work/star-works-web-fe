import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initWhatYouGetAnimations = (
    container: HTMLDivElement | null,
    line: HTMLDivElement | null,
    stepRefs: (HTMLDivElement | null)[],
    processSteps: any[]
) => {
    if (!container || !line) return;

    const ctx = gsap.context(() => {
        // Section Header Entrance (from bottom)
        gsap.from(".curved-text-entrance", {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".curved-text-entrance",
                                toggleActions: "play none none reverse"
            }
        });

        // Initialize state for all content boxes to avoid flash of content
        stepRefs.forEach((stepEl, i) => {
            if (!stepEl) return;
            const content = stepEl.querySelector<HTMLElement>('.step-content-box');
            if (content) {
                if (i === 0) {
                    gsap.set(content, { opacity: 1, x: 0, y: 0 });
                } else {
                    const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)").matches;
                    const step = processSteps[i];
                    const align = step?.align || 'right';
                    const startX = isMobile ? 0 : (align === 'left' ? -80 : 80);
                    const startY = isMobile ? 20 : 0;
                    gsap.set(content, { opacity: 0, x: startX, y: startY });
                }
            }
        });

        // ─── Activate a step pill + content ─────────────────────────────────
        const activateStep = (stepEl: HTMLDivElement | null) => {
            if (!stepEl) return;
            const pill = stepEl.querySelector<HTMLElement>('.step-pill-indicator');
            const content = stepEl.querySelector<HTMLElement>('.step-content-box');

            if (pill) {
                gsap.to(pill, {
                    backgroundColor: 'var(--color-orange-start)',
                    color: 'var(--color-text-active)',
                    boxShadow: '0 0 20px var(--color-orange-glow)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
            if (content) {
                gsap.to(content, {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    force3D: true,
                });
            }
        };

        // ─── Deactivate a step pill + content ───────────────────────────────
        const deactivateStep = (stepEl: HTMLDivElement | null) => {
            if (!stepEl) return;
            const pill = stepEl.querySelector<HTMLElement>('.step-pill-indicator');
            const content = stepEl.querySelector<HTMLElement>('.step-content-box');

            if (pill) {
                gsap.to(pill, {
                    backgroundColor: '',      // revert to original CSS color
                    color: '',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power2.in',
                });
            }
            if (content) {
                const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 767px)").matches;
                const index = stepRefs.indexOf(stepEl);
                const step = index !== -1 ? processSteps[index] : null;
                const align = step?.align || 'right';

                const targetX = isMobile ? 0 : (align === 'left' ? -80 : 80);
                const targetY = isMobile ? 20 : 0;

                gsap.to(content, {
                    opacity: 0,
                    x: targetX,
                    y: targetY,
                    duration: 0.3,
                    ease: 'power2.in',
                    force3D: true,
                });
            }
        };

        // ─── First step always stays active (never deactivate index 0) ──────
        activateStep(stepRefs[0]);

        // ─── Compute each pill's 0-1 threshold after layout settles ─────────
        const computeThresholds = (): number[] => {
            const lineWrapper = line.parentElement;
            if (!lineWrapper) return stepRefs.map(() => 0);

            const wrapperTop = lineWrapper.getBoundingClientRect().top + window.scrollY;
            const totalHeight = lineWrapper.offsetHeight;

            return stepRefs.map((stepRef) => {
                if (!stepRef) return 0;
                const pill = stepRef.querySelector<HTMLElement>('.step-pill-indicator');
                if (!pill) return 0;
                const pillCentreY =
                    pill.getBoundingClientRect().top +
                    window.scrollY -
                    wrapperTop +
                    pill.offsetHeight / 2;
                return totalHeight > 0 ? pillCentreY / totalHeight : 0;
            });
        };

        // ─── Wire ScrollTrigger after first paint ────────────────────────────
        requestAnimationFrame(() => {
            let thresholds = computeThresholds();
            // Track current activation state for each step
            const activated = stepRefs.map((_, i) => i === 0);

            gsap.to(line, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                                        end: 'bottom 55%',
                    scrub: 1,
                    onRefresh: () => {
                        thresholds = computeThresholds();
                    },
                    onUpdate(self) {
                        const progress = self.progress;

                        stepRefs.forEach((stepRef, i) => {
                            if (i === 0) return; // first step always active

                            const shouldBeActive = progress >= thresholds[i];

                            if (shouldBeActive && !activated[i]) {
                                // ── Scroll DOWN: line reached this pill ──
                                activated[i] = true;
                                activateStep(stepRef);
                            } else if (!shouldBeActive && activated[i]) {
                                // ── Scroll UP: line retreated above this pill ──
                                activated[i] = false;
                                deactivateStep(stepRef);
                            }
                        });
                    },
                },
            });
        });

    }, container);

    return ctx;
};

export const initFaqAnimations = (container: HTMLElement | null) => {
    if (!container) return;

    const ctx = gsap.context(() => {
        // FAQ Entrance
        gsap.from([".custom-heading", ".faq-list-container", ".faq-view-all"], {
            opacity: 0,
            y: 40,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                                toggleActions: "play none none reverse"
            }
        });
    }, container);

    return ctx;
};

export const initOurWorkAnimations = (
    container: HTMLElement | null,
    lineFill: HTMLElement | null,
    cardRefs: (HTMLElement | null)[],
    setCtaGlow: (glow: boolean) => void,
    setActiveCards: (updater: (prev: Set<number>) => Set<number>) => void
) => {
    if (!container || !lineFill) return;

    const ctx = gsap.context(() => {
        // Section Headings Entrance (from bottom)
        gsap.from([".our-work-small-heading", ".our-work-main-heading"], {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                                toggleActions: "play none none reverse"
            }
        });

        // Description Entrance (from right)
        gsap.from(".our-work-description", {
            opacity: 0,
            x: 100,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".our-work-description",
                                toggleActions: "play none none reverse"
            }
        });

        // Compute thresholds for each card after layout
        const computeThresholds = () => {
            const lineRect = lineFill.parentElement?.getBoundingClientRect();
            if (!lineRect) return cardRefs.map(() => 0);

            const lineTopAbs = lineRect.top + window.scrollY;
            const lineHeight = lineRect.height;

            return cardRefs.map(el => {
                if (!el) return 0;
                const rect = el.getBoundingClientRect();
                const centerAbs = rect.top + window.scrollY + rect.height / 2;
                return (centerAbs - lineTopAbs) / lineHeight;
            });
        };

        requestAnimationFrame(() => {
            let thresholds = computeThresholds();

            gsap.to(lineFill, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                                        end: 'bottom 50%',
                    scrub: 0.3,
                    onRefresh: () => {
                        thresholds = computeThresholds();
                    },
                    onUpdate: (self) => {
                        const progress = self.progress;
                        setCtaGlow(progress > 0.98);

                        setActiveCards(prev => {
                            const next = new Set<number>();
                            thresholds.forEach((t, i) => {
                                if (progress >= t) next.add(i);
                            });

                            // Only update state if the set has actually changed
                            const hasChanged = next.size !== prev.size || Array.from(next).some(val => !prev.has(val));
                            return hasChanged ? next : prev;
                        });
                    }
                }
            });
        });
    }, container);

    return ctx;
};