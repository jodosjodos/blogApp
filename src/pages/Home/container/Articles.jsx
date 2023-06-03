import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { ArticleCard } from "../../../components/home/ArticleCard";
import { getAllPosts } from "../../../services/index/posts";
import { ArticleCardSkeleton } from "../../../ArticleCardSkeleton";
import { ErrorMessage } from "../../../components/errorMessage";

export default function Articles() {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  if (isError) {
    console.log([isError]);
  }
  if (isLoading) {
    console.log("page is loading");
  }
  return (
    <section className="container flex flex-col ">
      {" "}
      <div className="container grid md:grid-cols-2  gap-7 lg:grid-cols-3">
        {isLoading ? (
          [...Array(3)].map((item, index) => {
            return <ArticleCardSkeleton key={index} className="w-full " />;
          })
        ) : isError ? (
          <ErrorMessage message="couldn't fetch posts successfully"/>
        ) : (
          data.map((post) => {
            return (
              <ArticleCard key={post._id} post={post} className="w-full" />
            );
          })
        )}
      </div>
      <button className="  flex flex-row p-2 w-col-4 md:w-col-2 mt-2 items-center gap-x-2 font-bold text-white border-2  border-primary  rounded-lg hover:bg-primary ">
        <span>More articles</span>
        <FaArrowRight />
      </button>
    </section>
  );
}
