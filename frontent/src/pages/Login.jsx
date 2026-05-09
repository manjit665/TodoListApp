import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";

const AUTH_STORAGE_KEY = "timer-auth-account";
const SESSION_STORAGE_KEY = "timer-auth-session";

const initialSignInState = {
  email: "",
  password: "",
};

const initialSignUpState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Login() {
  const [active, setActive] = useState(false);
  const [signInForm, setSignInForm] = useState(initialSignInState);
  const [signUpForm, setSignUpForm] = useState(initialSignUpState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);

    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
    }
  }, []);

  const handleInputChange = (setter) => (event) => {
    const { name, value } = event.target;

    setter((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const trimmedName = signUpForm.name.trim();
    const trimmedEmail = signUpForm.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !signUpForm.password || !signUpForm.confirmPassword) {
      setStatus({ type: "error", message: "Fill in all sign up fields." });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      return;
    }

    if (signUpForm.password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters." });
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    const account = {
      name: trimmedName,
      email: trimmedEmail,
      password: signUpForm.password,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(account));
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(account));
    setCurrentUser(account);
    setSignUpForm(initialSignUpState);
    setSignInForm({
      email: trimmedEmail,
      password: "",
    });
    setStatus({ type: "success", message: "Account created and signed in." });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const storedAccount = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedAccount) {
      setStatus({ type: "error", message: "No account found. Create one first." });
      setActive(true);
      return;
    }

    const account = JSON.parse(storedAccount);
    const email = signInForm.email.trim().toLowerCase();

    if (!email || !signInForm.password) {
      setStatus({ type: "error", message: "Enter your email and password." });
      return;
    }

    if (account.email !== email || account.password !== signInForm.password) {
      setStatus({ type: "error", message: "Incorrect email or password." });
      return;
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(account));
    setCurrentUser(account);
    setSignInForm(initialSignInState);
    setStatus({ type: "success", message: `Welcome back, ${account.name}.` });
  };

  const handleSignOut = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
    setStatus({ type: "success", message: "Signed out successfully." });
    setActive(false);
  };

  if (currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_55%,_#e0e7ff)] p-6 font-sans">
        <section className="w-full max-w-3xl rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_rgba(79,70,229,0.18)] backdrop-blur">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
                Timer Workspace
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                Welcome, {currentUser.name}
              </h1>
              <p className="mt-3 max-w-xl text-base text-slate-600">
                Your login flow is now connected end to end with account creation,
                session persistence, and sign out.
              </p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <p>
                  Signed in as <span className="font-semibold text-slate-900">{currentUser.email}</span>
                </p>
                <p className="mt-2">
                  This uses browser storage for now, so it works as a complete frontend flow
                  without needing a backend yet.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-[1px] shadow-lg">
              <div className="rounded-[27px] bg-slate-950 px-6 py-7 text-left text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Session</p>
                <p className="mt-3 text-2xl font-bold">Active</p>
                <p className="mt-2 text-sm text-white/70">Refresh-safe until you sign out.</p>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#e0f2fe_0%,_#eef2ff_45%,_#f8fafc_100%)] p-5 font-sans">
      <div className="w-full max-w-5xl">
        {status.message ? (
          <div
            className={`mb-4 rounded-2xl border px-4 py-3 text-sm shadow-sm ${
              status.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {status.message}
          </div>
        ) : null}

        <div className="relative min-h-[640px] overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div
            className={`absolute left-0 top-0 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out ${
              active ? "translate-y-full opacity-0 md:translate-x-full md:translate-y-0 md:opacity-100 md:z-50" : "z-10"
            }`}
          >
            <form
              onSubmit={handleSignUp}
              className="flex h-full flex-col items-center justify-center bg-white px-6 py-10 text-center md:px-10"
            >
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Create Account</h1>

              <div className="my-5 flex gap-2">
                <SocialIcon icon={<FaGooglePlusG />} />
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaGithub />} />
                <SocialIcon icon={<FaLinkedinIn />} />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Use your email for registration
              </span>

              <AuthInput
                name="name"
                type="text"
                value={signUpForm.name}
                onChange={handleInputChange(setSignUpForm)}
                placeholder="Name"
              />
              <AuthInput
                name="email"
                type="email"
                value={signUpForm.email}
                onChange={handleInputChange(setSignUpForm)}
                placeholder="Email"
              />
              <AuthInput
                name="password"
                type="password"
                value={signUpForm.password}
                onChange={handleInputChange(setSignUpForm)}
                placeholder="Password"
              />
              <AuthInput
                name="confirmPassword"
                type="password"
                value={signUpForm.confirmPassword}
                onChange={handleInputChange(setSignUpForm)}
                placeholder="Confirm Password"
              />

              <button className="mt-5 rounded-xl bg-slate-950 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                Sign Up
              </button>
            </form>
          </div>

          <div
            className={`absolute left-0 top-0 z-20 h-full w-full md:w-1/2 transition-all duration-700 ease-in-out ${
              active ? "translate-y-[-100%] md:translate-x-full md:translate-y-0" : ""
            }`}
          >
            <form
              onSubmit={handleSignIn}
              className="flex h-full flex-col items-center justify-center bg-white px-6 py-10 text-center md:px-10"
            >
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Sign In</h1>

              <div className="my-5 flex gap-2">
                <SocialIcon icon={<FaGooglePlusG />} />
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaGithub />} />
                <SocialIcon icon={<FaLinkedinIn />} />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Use your email and password
              </span>

              <AuthInput
                name="email"
                type="email"
                value={signInForm.email}
                onChange={handleInputChange(setSignInForm)}
                placeholder="Email"
              />
              <AuthInput
                name="password"
                type="password"
                value={signInForm.password}
                onChange={handleInputChange(setSignInForm)}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setStatus({ type: "success", message: "Password reset is not wired yet." })}
                className="mt-4 text-sm text-slate-500 transition hover:text-slate-800"
              >
                Forgot your password?
              </button>

              <button className="mt-5 rounded-xl bg-slate-950 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                Sign In
              </button>
            </form>
          </div>

          <div
            className={`absolute left-0 top-1/2 z-[1000] h-1/2 w-full overflow-hidden rounded-t-[40px] transition-all duration-700 ease-in-out md:left-1/2 md:top-0 md:h-full md:w-1/2 md:rounded-l-[150px] md:rounded-t-none ${
              active ? "translate-y-[-100%] rounded-b-[40px] md:-translate-x-full md:translate-y-0 md:rounded-l-none md:rounded-r-[150px]" : ""
            }`}
          >
            <div
              className={`relative top-[-100%] h-[200%] w-full bg-[linear-gradient(160deg,_#0f172a_0%,_#4338ca_45%,_#0ea5e9_100%)] text-white transition-all duration-700 ease-in-out md:left-[-100%] md:top-0 md:h-full md:w-[200%] ${
                active ? "translate-y-1/2 md:translate-x-1/2 md:translate-y-0" : ""
              }`}
            >
              <div
                className={`absolute left-0 top-0 flex h-1/2 w-full flex-col items-center justify-center px-8 text-center transition-all duration-700 md:h-full md:w-1/2 ${
                  active ? "translate-y-0 md:translate-x-0" : "-translate-y-[200%] md:-translate-x-[200%] md:translate-y-0"
                }`}
              >
                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">Welcome Back!</h2>
                <p className="my-5 max-w-sm text-sm leading-6 text-white/80">
                  Sign in with the account you created to continue into the timer workspace.
                </p>
                <button
                  type="button"
                  onClick={() => setActive(false)}
                  className="rounded-xl border border-white/70 bg-white/10 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/20"
                >
                  Sign In
                </button>
              </div>

              <div
                className={`absolute bottom-0 left-0 flex h-1/2 w-full flex-col items-center justify-center px-8 text-center transition-all duration-700 md:right-0 md:left-auto md:top-0 md:h-full md:w-1/2 ${
                  active ? "translate-y-[200%] md:translate-x-[200%] md:translate-y-0" : "translate-y-0"
                }`}
              >
                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">Hello, Friend!</h2>
                <p className="my-5 max-w-sm text-sm leading-6 text-white/80">
                  Create your account to save a local session and complete the login flow.
                </p>
                <button
                  type="button"
                  onClick={() => setActive(true)}
                  className="rounded-xl border border-white/70 bg-white/10 px-10 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/20"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthInput({ name, type, value, onChange, placeholder }) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-3 w-full max-w-sm rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
    />
  );
}

function SocialIcon({ icon }) {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100"
    >
      {icon}
    </button>
  );
}
