import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const tweets_api_base_url = "http://localhost:8082";

interface GoogleOauthResponse {
  credential?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginGoogleSuccess = (response: GoogleOauthResponse) => {
    console.log("response google success:", response);

    // TODO: integrate with backend to save user google credential
    // If user is valid, save the token and redirect to home page
  };

  return (
    <div>
      <div className="flex flex-row ">
        <div className="basis-1/2">
          <img src="" alt="" />
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-xl mb-3">Login</h1>

          <form>
            <input
              className="px-5 py-2 border min-w-full mb-5"
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
              placeholder="Masukkan email"
            />
            <input
              className="px-5 py-2 border min-w-full mb-5"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              type="password"
              placeholder="Masukkan password"
            />
            <div className="min-w-full">
              <button
                className="bg-blue-400 px-5 py-2 text-white rounded-md min-w-full mb-5"
                onClick={async (e) => {
                  e.preventDefault();

                  const payload = {
                    email: email,
                    password: password,
                  };

                  const response = await fetch(tweets_api_base_url + "/api/auth/login", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  const responseJson = await response.json();

                  if (response.status !== 200) {
                    alert("error: " + responseJson.message);
                  }

                  localStorage.setItem("access_token", responseJson.data.access_token);

                  // If login succeed, redirect ke home
                  navigate("/");
                }}
              >
                Login
              </button>
            </div>

            <div className="flex justify-center">
              <GoogleOAuthProvider clientId="504159366363-jg775b5lafts22j82krd9mskhk0f7kkd.apps.googleusercontent.com">
                <GoogleLogin onSuccess={handleLoginGoogleSuccess} />
              </GoogleOAuthProvider>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
