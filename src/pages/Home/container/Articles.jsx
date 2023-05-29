import {FaArrowRight} from "react-icons/fa"


import { ArtcileCard } from "../../../components/home/ArticleCard";

export default function Articles() {
  return (
    <section className="container flex flex-col ">
      {" "}
      <div className="container grid md:grid-cols-2  gap-7 lg:grid-cols-3">
        <ArtcileCard className="w-full" />
        <ArtcileCard className="w-full" />
        <ArtcileCard className="w-full" />
        <ArtcileCard className="w-full" />
      </div>
      <button className="  flex flex-row p-2 w-col-4 md:w-col-2 mt-2 items-center gap-x-2 font-bold text-white border-2  border-primary  rounded-lg hover:bg-primary ">
        <span>More articles</span>
        <FaArrowRight/>
      </button>
    </section>
  );
}
