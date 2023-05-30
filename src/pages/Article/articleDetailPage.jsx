import { Link } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";
import { MainLayout } from "../../components/home/MainLayout";
import { images } from "../../constant/images";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";

const BreadCrumb = [
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
    link: "/blog/1",
  },
];
const latestPosts = [
  {
    _id: "1",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },

  {
    _id: "2",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },
  {
    _id: "3",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },
  {
    _id: "4",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },
  {
    _id: "5",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },
  {
    _id: "6",
    image: images.Article,
    title: "Help children  get better education",
    createdAt: "2023-01-28T15:35:53.67+0000",
  },
];

const tags = [
  "Medical",
  "LifeStyle",
  "Learn",
  "Healthy",
  "Food",
  "Diet",
  "Education",
];

export default function ArticleDetailPage() {
  return (
    <MainLayout>
      <section className="text-white container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row items-start lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={BreadCrumb} />
          <img
            src={images.Article}
            alt="profile image  "
            className="rounded-xl w-full"
          />
          <Link
            className="text-primary text-sm font-robot inline-block mt-4 font-bold md:text-base"
            to="/blog?category=selectedCategory"
          >
            EDUCATION
          </Link>
          <h1 className="text-xl font-medium font-robotomt-4 text-white  md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
              maxime odio obcaecati voluptates, voluptate, possimus tenetur
              ducimus ullam dolorem quis ipsum neque, quas officiis? Sint nihil
              ut officia nesciunt reprehenderit? Earum necessitatibus harum
              error iste quibusdam ipsa animi quia facere amet architecto
              eveniet hic laboriosam suscipit quisquam beatae, alias ullam
              magnam! Unde odit quaerat placeat porro id earum ducimus iusto!
              Consequatur, voluptatem error animi placeat deserunt provident
              ullam facilis. Dolorem mollitia eius dicta veritatis tenetur,
              pariatur maxime sunt enim incidunt et numquam sequi, explicabo
              quis consectetur exercitationem dolorum aut harum!
            </p>
          </div>
          <CommentsContainer className="mt-10" logginedUSerId="a"/>
        </article>
        <div>
        <SuggestedPosts
          header="Latest Article"
          posts={latestPosts}
          tags={tags}
          className="mt-8 lg:mt-0 max-w-xs"
        />
          <div className="mt-7">
         <h2 className="font-roboto font-medium text-white mb-4 md:text-xl">Share on :</h2>
         <SocialShareButtons 
         url={encodeURI(`https://moonfo.com/post/client-side-and-server-side-explanation`)}
         title={encodeURIComponent( "Client-side and Server-side explanation")}
         />
       </div>
        </div>
     
      </section>
    </MainLayout>
  );
}
