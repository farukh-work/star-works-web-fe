import ScrollRevealCard from "../common/ScrollRevealCard";
const Stats = () => {
  return (
    <section className="py-20 ">
      <div className="container-wrapper">
        <ScrollRevealCard className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="text-center group">
            <div className="mb-2 text-4xl font-bold transition-transform duration-300 lg:text-5xl text-primary   group-hover:scale-110">
              600+
            </div>
            <div className="text-white/80  ">Projects Completed</div>
          </div>
          <div className="text-center group">
            <div className="mb-2 text-4xl font-bold transition-transform duration-300 lg:text-5xl text-primary   group-hover:scale-110">
              400+
            </div>
            <div className="text-white/80  ">Happy Clients</div>
          </div>
          <div className="text-center group">
            <div className="mb-2 text-4xl font-bold transition-transform duration-300 lg:text-5xl text-primary   group-hover:scale-110">
              6+
            </div>
            <div className="text-white/80  ">Years Experience</div>
          </div>
          <div className="text-center group">
            <div className="mb-2 text-4xl font-bold transition-transform duration-300 lg:text-5xl text-primary   group-hover:scale-110">
              24/7
            </div>
            <div className="text-white/80  ">Support Available</div>
          </div>
        </ScrollRevealCard>
      </div>
    </section>
  );
};

export default Stats;
