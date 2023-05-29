import { images } from "../../constant/images";
export const ArtcileCard = () => {
  return (
    
   <div className="text-white flex flex-col gap-4  p-2">
      <div className=" flex items-center gap-2"> 
        
          <img
            src={images.Profile2}
            alt=""
            className="w-[15%] rounded-full"
          />
          <div>
            <h4 className=" ">
              Jodos jodos
            </h4>
          </div>
        
      </div>
      <img
        src={images.Blinders}
        alt="article image"
        className=" rounded-3xl"
      />
      <div className="bg-[#030B00] rounded-lg"> 
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam quos tempore velit officiis neque rem. Ratione possimus, assumenda nemo quos officiis minima consequuntur repellat accusamus. Nostrum temporibus minima itaque doloribus.
      </div>
     <div className="bg-secondary rounded-lg p-3">
        <h4 className=" m-3">jodos</h4>
        <p>As a designer, I believe that user experience should always be at the forefront of any project. My design philosophy is centered around creating digital products that are not only aesthetically pleasing but also intuitive and easy to use. With a keen eye for detail and a strong uuser  See more</p>
     </div>
    </div>
    
 
  );
};
