import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { modeActions } from "../../store/reducers/mode";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
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
                <Link
                  to="/home"
                  className="flex flex-row py-3 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Home</span>
                </Link>
                <Link
                  to="/Articles"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Articles</span>
                </Link>
                <Link
                  to="/aboutUs"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">About us</span>
                </Link>
                <Link
                  to="/contactUs"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Contact us</span>
                </Link>
                <Link
                  to="/Pricing"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Pricing</span>
                </Link>
                <Link
                  to="/fq"
                  className="flex flex-row py-4 items-center justify-start pl-1 hover:bordering"
                >
                  <RiHomeSmile2Fill size={32} color="#279B00" />
                  <span className="font-bold">Fq</span>
                </Link>
              </div>
              <div className="flex flex-col pb-0">
                <div>
                  {userState ? (
                    <>
                      <Link
                        onClick={handleLogout}
                        className="borderButton w-col-7 mt-2 hover:bg-[#279b00]"
                      >
                        logout
                      </Link>
                      <Link className="borderButton w-col-7 mt-2 hover:bg-[#279b00]">
                        dashboard
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="borderButton w-col-7 hover:bg-[#279b00]"
                    >
                      Sign in
                    </Link>
                  )}
                </div>

                <p onClick={handleMode}>
                  {mode === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
                </p>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </section>
  );
};