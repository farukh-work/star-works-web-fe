const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: "12m48ewa",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: "skNf5bfy6FDJyHc1TQ8PNib5HZtQ2gHYKv4nACZLsDYLSuH9ldOpVV4JsiLR5GcAWNPXChOZ0BHF6TjZwwQbe9tT6jfNLAyFGTgMtTpwawWBmMq0CGATsZlMU24UXwZ7ZVmAit8mzkGydb30Xf2qcj4dKpX8JiE9KOaoZGHyp5hs3yyAZxMr",
  useCdn: false,
});

async function main() {
  console.log("Uploading bulb.png to Sanity...");
  const bulbPath = path.join(__dirname, '../public/images/bulb.png');
  let imageAsset;
  if (fs.existsSync(bulbPath)) {
    imageAsset = await client.assets.upload('image', fs.createReadStream(bulbPath), {
      filename: 'bulb.png'
    });
    console.log("Uploaded bulb.png successfully. Asset ID:", imageAsset._id);
  } else {
    console.warn("bulb.png not found at path:", bulbPath);
  }

  const doc = {
    _type: 'locationPage',
    _id: 'locationPage',
    seo: {
      metaTitle: "Web Design Agency in Hisar - Star Works",
      metaDescription: "Star Works is a premier web design and development agency in Hisar, specializing in stunning web designs, scalable apps, memorable brand identities, and e-commerce solutions."
    },
    heroSection: {
      heading: "Top Web Design\nAgency in [ Hisar ]",
      description: "we help Hisar businesses build powerful digital presence — from bold brand identities to conversion-focused websites.",
      stats: [
        { number: "200+", title: "Projects Completed" },
        { number: "50+", title: "Cities" },
        { number: "8", title: "Years" },
        { number: "5★", title: "Rating" }
      ]
    },
    servicesSection: {
      tag: "--OUR SERVICES",
      heading: "What We Do in Hisar",
      description: "We create modern, user-friendly, and responsive digital experiences that help businesses grow and engage their audience.",
      services: [
        {
          icon: "DesignIcon",
          title: "Web Design",
          desc: "Our web design process focuses on creating digital experiences that not only look stunning but also perform exceptionally."
        },
        {
          icon: "DevelopmentIcon",
          title: "Web Development",
          desc: "Building fast, scalable, and secure websites with modern technologies that ensure performance, reliability, and smooth functionality."
        },
        {
          icon: "IdentityIcon",
          title: "Brand Identity",
          desc: "Crafting memorable brand identities through strategic design, helping businesses stand out and connect with their audience."
        },
        {
          icon: "MarketingIcon",
          title: "Digital Marketing",
          desc: "Driving growth through targeted digital marketing strategies that increase visibility, generate leads, and boost conversions."
        },
        {
          icon: "commerceIcon",
          title: "E-commerce Solutions",
          desc: "Developing powerful online stores with seamless shopping experiences, secure payments, and optimized customer journeys."
        },
        {
          icon: "DevelopmenstIcon",
          title: "App Development",
          desc: "Designing and developing intuitive mobile applications that provide engaging user experiences across all devices."
        }
      ]
    },
    whyChooseUsSection: {
      tag: "--WHY CHOOSE US",
      heading: "Why [ Hisar ] Businesses Choose Star Works",
      items: [
        {
          title: "Creative Solutions",
          description: "WE THINK OUTSIDE THE BOX TO DELIVER INNOVATIVE SOLUTIONS THAT SET YOU APART FROM THE COMPETITION.",
          icon: imageAsset ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          } : undefined
        },
        {
          title: "Agile Development",
          description: "FAST, FLEXIBLE, AND EFFICIENT DEVELOPMENT PROCESS THAT ADAPTS TO YOUR EVOLVING NEEDS.",
          icon: imageAsset ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          } : undefined
        },
        {
          title: "Result-Driven",
          description: "WE FOCUS ON DELIVERING MEASURABLE RESULTS THAT CONTRIBUTE TO YOUR BUSINESS GROWTH.",
          icon: imageAsset ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          } : undefined
        }
      ]
    },
    faqSection: {
      tag: "--FAQS",
      heading: "Frequently Asked Questions",
      buttonText: "Ask More Questions",
      buttonLink: "/",
      items: [
        {
          title: "What services do you offer?",
          desc: "We specialize in web design and development, focusing on converting Figma designs into fully functional websites. Our services include HTML, CSS, React, Next.js, and Tailwind implementations, as well as creating responsive and interactive UI/UX designs. We also offer backend services including Node.js, MongoDB, Python, Express, Firebase, and Strapi for CMS."
        },
        {
          title: "How do you ensure the quality of your work?",
          desc: "Our team has over five years of experience and has successfully transformed over 450 Figma designs into high-quality websites. We perform thorough testing and optimizations to ensure that all projects meet the highest standards."
        },
        {
          title: "What technologies are you proficient in?",
          desc: "We are proficient in a wide range of technologies including HTML, CSS, React, Next.js, Tailwind, Bootstrap, Firebase, Node.js, MongoDB, and Strapi CMS."
        },
        {
          title: "Can you customize a project to fit my specific needs?",
          desc: "Absolutely! We take the time to understand your vision and requirements to ensure that the final product is tailored to your needs. We also welcome your feedback throughout the development process."
        },
        {
          title: "How do you handle project management and communication?",
          desc: "We value clear and consistent communication. Our project management approach involves regular updates and checkpoints with our clients to ensure that the project is on track and aligns with their expectations."
        },
        {
          title: "What is your pricing model?",
          desc: "Our pricing varies depending on the complexity and requirements of the project. We offer competitive rates and can provide a detailed quote after understanding your specific needs."
        },
        {
          title: "How long does it typically take to complete a website?",
          desc: "The timeline for website completion can vary based on the project's scope. On average, a standard website takes approximately 4-6 weeks from start to finish."
        },
        {
          title: "Do you provide support after the website goes live?",
          desc: "Yes, we offer maintenance and support services post-launch to ensure your website continues to run smoothly."
        },
        {
          title: "How can we start a project with you?",
          desc: "You can start by reaching out to us through our contact form or Fiverr profile. We'll schedule a consultation to discuss your project in detail."
        }
      ]
    }
  };

  console.log("Writing locationPage document to Sanity...");
  const result = await client.createOrReplace(doc);
  console.log("Published locationPage document successfully:", result);
}

main().catch(console.error);
