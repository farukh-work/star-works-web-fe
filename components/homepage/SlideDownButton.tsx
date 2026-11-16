"use client";

const SlideDownButton = () => {
  const handleClick = () => {
    const hero = document.querySelector("section");
    const next = hero?.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  
  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to next section"
      className="slide-down-indicator absolute bottom-8 left-1/2 z-20 hidden md:flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 border-none bg-transparent p-2 transition-opacity duration-300 hover:opacity-80"
      style={{ opacity: 0 }}
    >
      <span className="font-body text-[10px] font-semibold tracking-[0.25em] text-white/60 uppercase">
        Slide Down
      </span>
      <div className="flex flex-col items-center gap-0.5">
        <svg className="chevron-1" width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L11 11L20 2" stroke="#26f077" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="chevron-2" width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L11 11L20 2" stroke="#26f077" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
};

export default SlideDownButton;
