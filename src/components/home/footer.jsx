import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillGithub,
  AiFillHeart
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { RiChat1Line } from "react-icons/ri";
import { useSelector } from "react-redux";

function Footer() {
  const mode = useSelector((state) => state.mode.mode);
  return (
    <section className="bg-dark-hard min-w-full pr-24">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-3 lg:col-span-2">
          <h3 className="text-white font-bold md:text-lg">Product</h3>
          <ul className="text-white text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Landing page</a>
            </li>
            <li>
              <a href="/">features</a>
            </li>
            <li>
              <a href="/">Documentation</a>
            </li>
            <li>
              <a href="/">Referral Program</a>
            </li>
            <li>
              <a href="/">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 lg:col-span-2">
          <h3 className="text-white font-bold md:text-lg">Services</h3>
          <ul className="text-white text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentaion</a>
            </li>
            <li>
              <a href="/">Design</a>
            </li>
            <li>
              <a href="/">Themes</a>
            </li>
            <li>
              <a href="/">Illustrations</a>
            </li>
            <li>
              <a href="/">UI kit</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="text-white font-bold md:text-lg">Company</h3>
          <ul className="text-white text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Terms</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-white font-bold md:text-lg">More</h3>
          <ul className="text-white text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Documentaion</a>
            </li>
            <li>
              <a href="/">License</a>
            </li>
            <li>
              <a href="/">Changelog</a>
            </li>
          </ul>
        </div>
        <div className="text-white col-span-10 md:order-first flex flex-col items-center justify-center md:col-span-5 lg:col-span-2">
          <div 
            className="flex flex-col items-center justify-center col-span-12"
            style={{ color: mode ? "#279B00" : "black" }}
          >
            <RiChat1Line size={42} className="m-2" />
            <p className="title text-center  font-bold   md:text-3xl">RISEBLOG</p>
          </div>
          <p className="text-sm text-white text-center mt-4 md:text-left md:text-base lg:text-sm" >Build a modern and creative website with RiseBlog</p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="">{<AiOutlineTwitter size={35} />}</a>
            </li>
            <li>
              <a href="">{<AiFillYoutube size={35} />}</a>
            </li>
            <li>
              <a href="">{<AiFillInstagram size={35} />}</a>
            </li>
            <li>
              <a href="">{<FaFacebook size={35} />}</a>
            </li>
            <li>
              <a href="">{<AiFillGithub size={35}/>}</a>
            </li>
          </ul>
        </div>
      <div className="hidden md:flex flex-col items-center space-y-4  md:col-span-12 justify-center lg:col-span-10">
        <div className="bg-secondary text-white p-3 rounded-full">

        <AiFillHeart size={30}/>
        </div>
        <p className="font-bold italic text-white ">Copyright © 2023 . Crafted with peace </p>

      </div>
      </footer>
    </section>
  );
}

export default Footer;
