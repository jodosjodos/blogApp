import { FiSearch } from "react-icons/fi";

import { images } from "../../../constant/images";
export default function Hero() {
  return (
    <section className=" container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          <h1 className="font-roboto text-3xl text-center font-bold text-primary lg:text-left lg:max-w[540px]">
            Read the most interesting articltes
          </h1>
          <p className="text-white mt-4 text-center md:text-xl lg:text-left">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
            molestias! Atque magnam, a illum odio quas ipsum veritatis iste
            pariatur blanditiis sapiente, non fugiat porro voluptate, quaerat
            praesentium? Dolorum, quae!
          </p>
          <p></p>

          <div className=" grid grid-cols-1 lg:grid-cols-2     relative">
            <div className="w-col-12">
              <FiSearch className="absolute font-bold text-xl left-5 top-10 -translate-y-1/2 w-6 h-6 text-primary focus:outline-none focus:text-primary" />
              <input
                type="text"
                className=" placeholder:text-primary placeholder:font-bold   rounded-lg  w-col-12 focus:border-none focus:outline-none px-10 "
                placeholder=" search article"
              />
            </div>
            <button
              type="submit"
              className="hover:bg-primary  borderButton h-[3.25em] rounded-lg  text-white  w-col-12  lg:w-col-8 lg:mt-4 "
            >
              Search
            </button>
          </div>
          <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:mt-8 mt-4">
            <span className=" text-white font-semibold italic ">
              Popular Tags:
            </span>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3">
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                Design
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                User Experiences
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
                User Interface
              </li>
            </ul>
          </div>
          <div className="hidden lg:block lg:1/2 lg:mt-5"></div>
        </div>

      
      </div>
    </section>
  );
}
