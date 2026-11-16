import Navbar from "./Navbar";
import { client } from "@/sanity/client";
import { headerQuery } from "@/sanity/queries";

const NavbarWrapper = async () => {
  const headerData = await client.fetch(headerQuery);

  return <Navbar headerData={headerData} />;
};

export default NavbarWrapper;
