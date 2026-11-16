import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes the scroll entrance, SplitType text split, and floating stars animations
 * for the Contact Us section.
 *
 * @param {Object} refs - References to the DOM elements
 * @returns {Function} Cleanup function to revert SplitType and destroy ScrollTriggers/timelines
 */
export const initContactSection = ({
  container,
  subHeading,
  heading,
  star1,
  star2,
  formContainer,
}) => {
  if (!container) return null;

  // 1. Set Initial Hidden States (prevents flash of unstyled content)
  gsap.set(subHeading, { opacity: 0, y: 20 });
  gsap.set(heading, { opacity: 0, y: 50 });
  gsap.set([star1, star2], { scale: 0, rotation: -180, opacity: 0 });
  gsap.set(formContainer, { opacity: 0, y: 40, filter: "blur(4px)" });

  // Create main scroll-triggered entrance timeline
  const mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      toggleActions: "play none none none",
    },
  });

  // 2. Animate Subheading
  mainTl.to(
    subHeading,
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    0,
  );

  // 3. Animate Heading with simple slide-up
  mainTl.fromTo(
    heading,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    0.1,
  );

  // 4. Animate Star Icons scale/rotation entrance
  mainTl.to(
    [star1, star2],
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.7,
      ease: "back.out(1.5)",
    },
    0.2,
  );

  // 5. Animate Form container blur-to-sharp fade
  mainTl.to(
    formContainer,
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power2.out",
    },
    0.3,
  );

  // 6. Staggered reveal of form fields
  const fields = formContainer.querySelectorAll(".contact-field");
  if (fields.length > 0) {
    gsap.set(fields, { opacity: 0, y: 30 });
    mainTl.to(
      fields,
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform", // preserves layout + cursor-follow transforms
      },
      0.4,
    );
  }

  // 7. Slow floating idle animation loop for star icons
  const floatAnim = gsap.to([star1, star2], {
    y: 15,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      each: 0.6,
      repeat: -1,
      yoyo: true,
    },
  });

  // 8. Mouse Parallax for Star Icons (Desktop only)
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(star1, {
        x: xPos * 25,
        y: yPos * 25,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(star2, {
        x: -xPos * 30,
        y: -yPos * 30,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  // Cleanup handler
  return () => {
    floatAnim.kill();
    mm.revert();
    if (mainTl.scrollTrigger) mainTl.scrollTrigger.kill();
    mainTl.kill();
  };
};

/**
 * Animates the placeholder floating label and bottom border line on field focus/value change.
 */
export const animateFieldFocus = (
  label,
  borderLine,
  input,
  isTextArea,
  isFocused,
  value,
) => {
  if (!label || !borderLine || !input) return;

  const hasValue =
    (value && value.length > 0) || (input.value && input.value.length > 0);
  const isAutofilled =
    input.matches(":-webkit-autofill") || input.matches(":autofill");
  const shouldFloat = isFocused || hasValue || isAutofilled;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const yTrans = isMobile ? (isTextArea ? -20 : -26) : isTextArea ? -32 : -36;

  // Floating label slide up and fade
  gsap.to(label, {
    y: shouldFloat ? yTrans : 0,
    x: shouldFloat ? -4 : 0,
    scale: shouldFloat ? 0.75 : 1,
    opacity: shouldFloat ? 0.45 : 0.7,
    duration: 0.35,
    ease: "power2.out",
    transformOrigin: "left center",
    overwrite: "auto",
  });

  // Bottom focus border line scaling
  gsap.to(borderLine, {
    scaleX: isFocused ? 1 : 0,
    opacity: isFocused ? 1 : 0.6,
    duration: 0.45,
    ease: "power2.out",
    overwrite: "auto",
  });
};

export const initFieldAnimation = (
  wrapper,
  input,
  label,
  borderLine,
  isTextArea,
  isFocused,
  value,
) => {
  if (!wrapper || !input || !label || !borderLine) return null;

  let lastFloatState = null;

  // Define update helper checking the current DOM active element and value/autofill states
  const update = () => {
    const activeFocus = document.activeElement === input || isFocused;
    const hasValue =
      (value && value.length > 0) || (input.value && input.value.length > 0);
    const isAutofilled =
      input.matches(":-webkit-autofill") || input.matches(":autofill");
    const shouldFloat = activeFocus || hasValue || isAutofilled;

    if (shouldFloat !== lastFloatState) {
      lastFloatState = shouldFloat;
      animateFieldFocus(
        label,
        borderLine,
        input,
        isTextArea,
        activeFocus,
        value,
      );
    }
  };

  // Run initial state update
  update();

  // Register events for instant detection of user input, autofill, focus/blur, and CSS autofill animation
  const events = ["input", "change", "focus", "blur", "animationstart"];
  events.forEach((event) => {
    input.addEventListener(event, update);
  });

  // Polling check for late autofills (common on page load / page refresh / credential restore)
  const checkInterval = setInterval(update, 100);
  const timeoutId = setTimeout(() => clearInterval(checkInterval), 2000);

  // Return cleanup function
  return () => {
    clearInterval(checkInterval);
    clearTimeout(timeoutId);
    events.forEach((event) => {
      input.removeEventListener(event, update);
    });
  };
};

/**
 * Initializes the subtle magnetic hover pull for input fields.
 */
export const initFieldMagnetic = (wrapper, content) => {
  if (!wrapper || !content) return null;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // 3% magnetic shift relative to cursor distance
      gsap.to(content, {
        x: distanceX * 0.03,
        y: distanceY * 0.03,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  return () => mm.revert();
};

/**
 * Initializes the liquid expand background hover, scale, and text magnetic follow on the submit button.
 */
export const initButtonHover = (btn, liquid, text) => {
  if (!btn || !liquid || !text) return null;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    const handleMouseEnter = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Start expansion coordinate at mouse point, resetting scale to 0 to prevent visual jump from previous state
      gsap.set(liquid, {
        left: x,
        top: y,
        scale: 0,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.to(liquid, {
        scale: 3.8,
        xPercent: -50,
        yPercent: -50,
        duration: 1.2,
        ease: "sine.out",
      });
      gsap.to(text, {
        color: "#000000",
        duration: 0.3,
      });
      gsap.to(btn, {
        scale: 1.025,
        boxShadow: "0 0 25px rgba(38, 240, 119, 0.5)",
        borderColor: "#26f077",
        duration: 0.45,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Micro shift of text/arrow toward cursor (magnetic)
      gsap.to(text, {
        x: distanceX * 0.12,
        y: distanceY * 0.12,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Liquid background exit (scale down at the current position to avoid slippery sliding glitches)
      gsap.to(liquid, {
        left: x,
        top: y,
        scale: 0,
        xPercent: -50,
        yPercent: -50,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        color: "#26f077",
        duration: 0.4,
      });
      gsap.to(btn, {
        scale: 1,
        boxShadow: "0 0 0px rgba(38, 240, 119, 0)",
        borderColor: "rgba(38, 240, 119, 0.4)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(btn, {
        scale: 0.96,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(btn, {
        scale: 1.025,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("mousedown", handleMouseDown);
    btn.addEventListener("mouseup", handleMouseUp);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btn.removeEventListener("mousedown", handleMouseDown);
      btn.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // Mobile touch scaling feedback
  mm.add("(max-width: 1023px)", () => {
    const handleMouseDown = () => {
      gsap.to(btn, { scale: 0.96, duration: 0.1 });
    };
    const handleMouseUp = () => {
      gsap.to(btn, { scale: 1, duration: 0.2 });
    };

    btn.addEventListener("touchstart", handleMouseDown, { passive: true });
    btn.addEventListener("touchend", handleMouseUp, { passive: true });

    return () => {
      btn.removeEventListener("touchstart", handleMouseDown);
      btn.removeEventListener("touchend", handleMouseUp);
    };
  });

  return () => mm.revert();
};

/**
 * Triggers the success glow pulse scale-up/flash animation when a message sends successfully.
 */
export const animateButtonSuccess = (btn) => {
  return null;
};

/**
 * Triggers validation error animation on a field: shake, red border line reveal, red glow pulse, and tooltip entry.
 */
export const animateFieldError = (
  wrapper,
  borderLine,
  errorBorderLine,
  tooltip,
) => {
  if (!wrapper || !errorBorderLine || !tooltip) return;

  // Kill existing timelines/tweens on these elements to avoid conflicts
  gsap.killTweensOf([wrapper, errorBorderLine, tooltip]);

  // 1. Horizontal Shake Animation (subtle, premium, elastic feel)
  gsap
    .timeline()
    .to(wrapper, { x: -8, duration: 0.05, ease: "power1.inOut" })
    .to(wrapper, { x: 7, duration: 0.05, ease: "power1.inOut" })
    .to(wrapper, { x: -5, duration: 0.05, ease: "power1.inOut" })
    .to(wrapper, { x: 4, duration: 0.05, ease: "power1.inOut" })
    .to(wrapper, { x: -2, duration: 0.05, ease: "power1.inOut" })
    .to(wrapper, { x: 0, duration: 0.1, ease: "power1.out" });

  // 2. Error Border Line scale-x to 1, and flash
  gsap.fromTo(
    errorBorderLine,
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
    },
  );

  // 3. Error border line neon pulse (repeats infinitely while in error state)
  gsap.to(errorBorderLine, {
    opacity: 0.5,
    duration: 0.7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.45,
  });

  // 4. Fade and slide upward tooltip
  gsap.fromTo(
    tooltip,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    },
  );

  // Ensure default green focus border line is hidden during error
  if (borderLine) {
    gsap.to(borderLine, { scaleX: 0, duration: 0.2 });
  }
};

/**
 * Triggers success animation: green border flashes and glows, error tooltip slides/fades out.
 */
export const animateFieldSuccess = (
  wrapper,
  borderLine,
  errorBorderLine,
  tooltip,
  isFocused,
) => {
  if (!wrapper || !errorBorderLine || !tooltip) return;

  gsap.killTweensOf([wrapper, errorBorderLine, tooltip]);

  // 1. Tooltip exit animation
  gsap.to(tooltip, {
    opacity: 0,
    y: 10,
    duration: 0.35,
    ease: "power2.in",
  });

  // 2. Transition border line from red to green
  gsap.to(errorBorderLine, {
    scaleX: 0,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
  });

  // 3. Success border green glow flash animation
  if (borderLine) {
    gsap
      .timeline()
      .to(borderLine, {
        scaleX: 1,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(borderLine, {
        boxShadow:
          "0 0 25px rgba(38, 240, 119, 1), 0 0 6px rgba(38, 240, 119, 0.6)",
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      })
      .to(borderLine, {
        scaleX: isFocused ? 1 : 0,
        opacity: isFocused ? 1 : 0.6,
        boxShadow:
          "0 0 10px rgba(38, 240, 119, 0.8), 0 0 2px rgba(38, 240, 119, 0.4)",
        duration: 0.35,
        ease: "power2.out",
      });
  }
};

/**
 * Clears error states and resets elements without a full success animation (e.g. on manual reset).
 */
export const clearFieldValidation = (
  wrapper,
  borderLine,
  errorBorderLine,
  tooltip,
  isFocused,
) => {
  if (!wrapper || !errorBorderLine || !tooltip) return;

  gsap.killTweensOf([wrapper, errorBorderLine, tooltip]);

  gsap.to(tooltip, {
    opacity: 0,
    y: 10,
    duration: 0.2,
    ease: "power2.in",
  });

  gsap.to(errorBorderLine, {
    scaleX: 0,
    opacity: 0,
    duration: 0.2,
  });

  if (borderLine) {
    gsap.to(borderLine, {
      scaleX: isFocused ? 1 : 0,
      opacity: isFocused ? 1 : 0.6,
      duration: 0.2,
    });
  }
};
