import { Link } from "react-router-dom";

function BreadCrumbs({ data }) {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap text-white">
      {data.map((item, index) => {
       return(
        <div className="text-white opacity-50 text-xs md:text-sm md:font-robot" key={item.name}>
        <Link to={item.link}>{item.name}</Link>
        {index != data.length - 1 && <span className="px-3">/</span>}
      </div>
       )
      }
      
      )}
      
    </div>
  );
}

export default BreadCrumbs;
