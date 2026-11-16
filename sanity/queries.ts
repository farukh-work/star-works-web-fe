export const headerQuery = `
*[_type == "header"][0]{
  logo,
  buttonText,
  buttonLink,

  navLinks[]{
    title,
    href
  }
}
`;

export const footerQuery = `
*[_type == "footer"][0]{
  logo,
  description,
  copyrightText,

  socialLinks[]{
    name,
    href
  },

  footerSections[]{
    title,

    links[]{
      name,
      href
    }
  }
}
`;
