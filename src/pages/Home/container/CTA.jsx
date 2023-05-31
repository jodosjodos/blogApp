import { images } from "../../../constant/images";

export const CTA = () => {
  return (
    <section className="relative bg-primaary">
      <div className="container grid grid-cols-12 mx-auto md:pb-20 lg:place-items-center lg:text-left">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="text-white font-roboto font-bold  text-2xl md:text-4xl md:text-center md:leading-normal">
            Get our stories delivered from us to you inbox weekly.
          </h2>
          <div className="w-row-12 max-w-[494px] mt-12 space-y-3 mx-auto flex flex-col md:flex-row md:space-y-0 space-x-2  lg:mx-0">
            <input
              type="text"
              name=""
              id=""
              className="px-4 py-3 rounded-lg w-row-12 placeholder:text-primary placeholder:bold border-none focus:border-none active:border-none"
              placeholder="your email"
            />
            <button
              className="w-full h-[3em] md:ml-4 rounded-lg
        font-bold text-white mt-2 hover:bg-primary border-2 border-primary md:whitespace-nowrap">
              Get started
            </button>
          </div>
          <p className="text-sm leading-7 mt-6  text-white md:text-center md:text-base lg:text-left ">
            <span className="font-bold italic text-[#B3BAC5 ] md:not-italic md:font-normal ">
              Get a response tomorrow
            </span>{" "}
            if you submit by 9pm today . if we received after 9pm will get a
            response the following day
          </p>
        </div>
        <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:order-last lg:col-span-6">
          <div className="w-3/4 mx-auto relative">
            
            <div></div>
            <div className="w-full rounded-xl bg-secondary p-3 z-[1] relative">
              <img
                src={images.Article}
                alt="article image"
                className=" rounded-3xl m-2"
              />
              <div className="bg-secondary  text-white rounded-lg p-3">
        <h4 className=" m-3 ">jodos</h4>
        <p>As a designer, I believe that user experience should always be at the forefront of any project. My design philosophy is centered around creating digital products that are not only aesthetically pleasing but also intuitive and easy to use. With a keen eye for detail and a strong uuser  See more</p>
     </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
