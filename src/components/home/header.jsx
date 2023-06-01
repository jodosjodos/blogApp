import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { ImPriceTag } from "react-icons/im";
import { modeActions } from "../../store/reducers/mode";
import { navVisibilityActions } from "../../store/reducers/navVisibilySlice";
import { Logout } from "../../store/actions/user";

export const Navbar = () => {
  const mode = useSelector((state) => state.mode.mode);
  const isNavVisible = useSelector(
    (state) => state.navVisibility.navVisibility
  );
  const userState = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    // dispatch(modeActions.changeMode());
    localStorage.removeItem("mode");
    localStorage.removeItem("account");
  };

  const handleMode = () => {
    dispatch(modeActions.changeMode());
  };

  // handle navVisibliltiy:
  const navVisibilityHandler = () => {
    dispatch(navVisibilityActions.changeNav());
  };

  // when user logout redirect hime

  return (
    <section className="">
      <header>
        <div className="text-white">
          <div onClick={navVisibilityHandler} className="lg:hidden">
            {isNavVisible ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
          <nav
            className={`h-row-12 ml-0 ${
              isNavVisible ? "mobileNavs" : "hidden"
            } lg:block `}
          >
            <ul className="grid grid-rows-2 gap-5">
              <div className="flex flex-col gap-2">
                <Link onClick={navVisibilityHandler}
                  to="/"
                  className="flex flex-row py-3 items-center justify-start pl-1 hover:bordering gap-2"
                >
                  <AiFillHome size={32} color="#279B00" />
                  <span className="font-bold">Home</span>
                </Link>
                <Link
                onClick={navVisibilityHandler}
                  to="/Articles"
                  className=" flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2"
                >
                  <FaStar size={32} color="#279B00" />
                  <span className="font-bold">Articles</span>
                </Link>
                <Link
                onClick={navVisibilityHandler}
                  to="/aboutUs"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2"
                >
                  <AiOutlineInfoCircle size={32} color="#279B00" />
                  <span className="font-bold">About us</span>
                </Link>
                <Link
                onClick={navVisibilityHandler}
                  to="/contactUs"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2"
                >
                  <FcContacts size={32} color="#279B00" />
                  <span className="font-bold">Contact us</span>
                </Link>
                <Link
                onClick={navVisibilityHandler}
                  to="/Pricing"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2 "
                >
                  <ImPriceTag size={32} color="#279B00" />
                  <span className="font-bold">Pricing</span>
                </Link>
                <Link
                onClick={navVisibilityHandler}
                  to="/fq"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Fq</span>
                </Link>
                {userState ? (
                  <>
                    <Link
                    onClick={navVisibilityHandler}
                      className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering gap-2"
                      to="/profile"
                    >
                      <CgProfile size={32} color="#279B00" />
                      <span className="font-bold">Profile</span>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col pb-0">
                <div>
                  {userState ? (
                    <>
                      <Link
                      
                        onClick={handleLogout}
                        className="borderButton w-col-7 mt-2 hover:bg-[#279b00] "
                      >
                        logout
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="borderButton w-col-8 hover:bg-[#279b00]"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
                <button className="borderButton w-col-7 mt-2 hover:bg-[#279b00]">
                  <p onClick={handleMode}>
                    {mode === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
                  </p>
                </button>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </section>
  );
};
