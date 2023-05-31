import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { MainLayout } from "../../components/home/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users";
import { ProfilePicture } from "../../components/ProfilePictute";
import { userActions } from "../../store/reducers/userReducer";
import { toast } from "react-hot-toast";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading
  
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading :updateProfileIsLoading} = useMutation({
    mutationFn: ({ username, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { username, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("profile is  updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    values: {
      username: profileIsLoading ? "" : profileData?.username,
      email: profileIsLoading ? "" : profileData?.email,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { username, email, password } = data;
    mutate({ username, email, password });
  };

  return (
    <MainLayout>
      <section className=" container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto ">
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="name" className=" text-white font-semibold block">
                username
              </label>
              <input
                type="text"
                id="name"
                {...register("username", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter new password"
                className={` darkFields ${
                  errors.username ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.username?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="email" className="text-white font-semibold block">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`darkFields ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-white font-semibold block"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 1,
                    message: "Password length must be at least 1 character",
                  },
                })}
                placeholder="Enter new password"
                className={`darkFields ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading  || updateProfileIsLoading}
              className={`signUp text-white sm:mb-3  `}
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};
