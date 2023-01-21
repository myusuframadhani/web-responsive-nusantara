import apiConnection from "@/apiConnection";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setError("");
    try {
      await apiConnection
        .post("/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          router.push("/login");
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-screen flex justify-center items-center h-screen">
        <div className="flex bg-blue-200 w-1/3 h-2/3 justify-center items-center rounded-lg">
          <form
            className="form-signin w-full px-10 py-8"
            onSubmit={(e) => handleLogin(e, email, password)}
          >
            <p className="text-2xl font-bold">Registrasi</p>
            <p className="text-sm">Daftarkan akun anda!</p>
            <div className="pt-6">
              <label for="formNama">Nama</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="text"
                id="formNama"
                placeholder="Masukkan nama anda..."
                name="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label for="formEmail">Email</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="email"
                id="formEmail"
                placeholder="Masukkan email anda..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label for="formPassword">Password</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="password"
                id="formPassword"
                placeholder="Masukkan password anda..."
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label for="formKonfirmasiPassword">Konfirmasi Password</label>
              <input
                className="block w-full rounded-md my-2 px-2"
                type="password"
                id="formKonfirmasiPassword"
                placeholder="Konfirmasi password anda..."
                name="password"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <div className="flex justify-center items-center flex-col">
                <button
                  type="submit"
                  className="bg-blue-500 block w-1/2 px-auto rounded-lg px-4 py-2 my-2 text-white font-bold"
                >
                  Daftar
                </button>
                <div className="h-10 w-full">
                  {error && password_confirmation !== password && (
                    <p className="font-sm text-red-400">
                      Email dan Password tidak valid!
                    </p>
                  )}
                </div>
                <p className="text-sm my-3">
                  Sudah punya akun?
                  <a href="/login" className="text-blue-500 pl-1">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      ;
    </>
  );
}

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
