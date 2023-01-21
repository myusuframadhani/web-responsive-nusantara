import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import apiConnection from "@/apiConnection";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = getCookie("token", { req, res });
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setError("");

    try {
      await apiConnection
        .post("/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          setCookie("token", response.data.token, { maxAge: 597 * 45 });
          router.push("/");
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen flex justify-center items-center h-screen">
        <div className="flex bg-blue-200 w-1/3 h-1/2 justify-center items-center rounded-lg">
          <form
            className="form-signin w-full px-10 py-8"
            onSubmit={(e) => handleLogin(e, email, password)}
          >
            <p className="text-2xl font-bold">LOGIN</p>
            <p className="text-sm">Log in untuk masuk ke akun anda!</p>
            <div className="pt-6">
              <label for="emailForm">Email</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="email"
                id="emailForm"
                placeholder="Masukkan email anda..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label for="passwordForm">Password</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="password"
                id="passwordForm"
                placeholder="Masukkan password anda..."
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-center items-center flex-col">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-slate-500 block w-1/2 px-auto rounded-lg px-4 py-2 my-2 text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Tunggu" : "Login"}
                </button>
                <p className="text-sm my-3">
                  Belum punya akun?
                  <a href="/register" className="text-blue-500 pl-1">
                    Registrasi
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
