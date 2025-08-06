import { useEffect, useState, type FormEvent } from "react";

// icon & image

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setLocalStorage } from "../../services/storage";
import type { UserInfo } from "../../core/model/user.config";

export default function LoginNew() {
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "admin@sss.com",
    password: "admin",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // await loginAuth({
      //   identity: user.username,
      //   password: user.password,
      // });

      //demo
      const userInfo: UserInfo = {
        id: "1",
        email: user.username,
        role: "admin",
        first_name: "User",
        last_name: user.username,
      };
      setLocalStorage("token", "dummy_token"); // Replace with actual token from login response
      setLocalStorage("user", JSON.stringify(userInfo));
      window.location.href = "/home";
    } catch (err: any) {
      console.log("Login error:", err?.error);
    }
  };

  const handleFormChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <div className="flex flex-1 justify-center items-center h-[calc(100%-1rem)] relative">
      <div className="flex  items-center justify-center flex-1 h-full overflow-y-auto">
        <form
          className="flex flex-col w-fit min-h-96 gap-3 p-6 pt-0 items-center"
          onSubmit={(e) => void onSubmit(e)}
        >
          <div className="text-center">
            <h3 className="font-bold">Login</h3>
          </div>

          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              name="username"
              type="text"
              value={user.username}
              placeholder="Enter your username"
              className="input input-bordered w-full"
              onChange={handleFormChange}
            />
          </label>

          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text">Password</span>
            </div>

            <label className="input input-bordered flex items-center gap-2 pr-2 mb-2">
              <input
                type={!showPassword ? "password" : "text"}
                name="password"
                value={user.password}
                placeholder="Enter your password"
                className="w-full"
                onChange={handleFormChange}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
              <span
                className="btn h-fit min-h-fit min-w-max bg-opacity-0 hover:bg-opacity-0 p-0 border-hidden"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEyeSlash className="w-5 h-5" />
                ) : (
                  <FaRegEye className="w-5 h-5" />
                )}
              </span>
            </label>

            <div className="label flex-row-reverse">
              <span
                className="label-text-alt hover:cursor-pointer italic"
                // onClick={() => setShowReset(true)}
              >
                Forget Password
              </span>
            </div>
          </label>

          <button className="btn btn-primary w-full max-w-md" type="submit">
            Login
          </button>
        </form>
      </div>

      <div className="absolute right-0 bottom-0 text-xs">V 0.0.1</div>
    </div>
  );
}
