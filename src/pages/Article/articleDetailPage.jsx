import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";

import BreadCrumbs from "../../components/BreadCrumbs";
import { MainLayout } from "../../components/home/MainLayout";
import { images } from "../../constant/images";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import { useState } from "react";
import { stables } from "../../constant/stables";
import { ArticleDetailsSkeleton } from "../../components/ArticleDetailsSkeleton";
import { ErrorMessage } from "../../components/errorMessage";
import { useSelector } from "react-redux";



export default function ArticleDetailPage() {
  const [breadCrumbData, setBreadCrumbData] = useState([]);
  const [body, setBody] = useState(null);
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      console.log(window.location.href);
      setBreadCrumbData([
        {
          name: "home",
          link: "/",
        },
        {
          name: "blog",
          link: "/blog",
        },
        {
          name: "Article title",
          link: `/blog/${data.slug}`,
        },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Document, Paragraph, Text, Bold, Italic])
        )
      );
    },
  });



  const { data : postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
   
  });

// console.log(com);
  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailsSkeleton />
      ) : isError ? (
        <ErrorMessage message="couldn't fetch post details" />
      ) : (
        <>
          <section className="text-white container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row items-start lg:gap-x-5 lg:items-start">
            <article className="flex-1">
              <BreadCrumbs data={breadCrumbData} />
              <img
                src={
                  data?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                    : images.Sample
                }
                alt={`${data?.title}`}
                className="rounded-xl w-fit"
              />
              <div className="mt-4 flex gap-2">
                {data?.categories.map((category) => (
                  <Link
                    key={category.id}
                    className="text-primary text-sm font-robot inline-block mt-4 font-bold md:text-base"
                    to={`/blog?category=${category.name}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <h1 className="text-xl font-bold font-robotomt-4 text-[#279B00]   md:text-[26px]">
                {data?.title}
              </h1>
              <div className="mt-4 prose prose-sm sm:prose-base">{body}</div>
              <CommentsContainer
                className="mt-10"
                logginedUSerId={userState?.userInfo?._id}
                comments={data?.comments}
                postSlug={slug}
              />
            </article>
            <div>
              <SuggestedPosts
                header="Latest Article"
                posts={postsData}
                tags={data?.tags}
                className="mt-8 lg:mt-0 max-w-xs"
              />
              <div className="mt-7">
                <h2 className="font-roboto font-medium text-white mb-4 md:text-xl">
                  Share on :
                </h2>
                <SocialShareButtons
                  url={encodeURI(
                   window.location.href
                  )}
                  title={encodeURIComponent(
                    data?.title
                  )}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </MainLayout>
  );
}
