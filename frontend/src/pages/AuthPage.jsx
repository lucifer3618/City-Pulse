import BackButton from "@/components/common/BackButton.jsx";
import AuthTabs from "@/components/auth/AuthTabs.jsx";
import {useAuthContext} from "@/context/AuthContext.js";
import {Activity, MapPin, ShieldCheck, Wind} from "lucide-react";

function AuthPage() {

    const { setUser } = useAuthContext();

    return (
        <div className="grid grid-cols-4 w-screen h-screen m-0 p-0">
          <div className="flex w-full col-span-1 h-screen m-0 p-0 overflow-hidden bg-slate-50 font-sans">
            <div className="flex flex-1 justify-center items-center relative">
              <AuthTabs onTrigger={setUser} />
              <BackButton className="absolute top-4 left-4 z-20" />
            </div>
          </div>

          {/* RIGHT SIDE: Visuals & Context */}
          <div className="hidden col-span-3 lg:flex relative flex-1 h-screen">

            {/* Background Img */}
            <img
              className="h-full w-full object-cover absolute inset-0 z-0"
              src="./login-cover.jpg"
              alt="login-cover"
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#086e57]/90 to-[#0f4c3e]/80 mix-blend-multiply"></div>

            <div className="relative z-20 flex flex-col justify-between w-full h-full p-12 text-white">

              <div className="flex justify-end">
                <div className="w-16 h-16 border-2 border-white/20 rounded-full animate-pulse"></div>
              </div>

              <div className="flex flex-col justify-center mb-10 items-center">
                <h1 className="text-8xl font-bold leading-tight tracking-tight">
                  Monitor the <br/>
                  <span className="text-green-200">Pulse</span> of your city.
                </h1>
                <p className="mt-4 text-xl text-green-100 max-w-md text-center">
                  Real-time surveillance, resource allocation, and actionable insights to safeguard public well-being.
                </p>
              </div>

              <div className="flex justify-end">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl max-w-md shadow-2xl">
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {'★★★★★'}
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-90">
                    "The real-time outbreak mapping has drastically reduced our response times. We can finally deploy resources exactly where the city needs them, the moment they need them."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-green-200"></div>
                    <div className="text-xs">
                      <p className="font-bold">Dr. Elena Rostova</p>
                      <p className="opacity-75">Emergency Response Coordinator</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>
    )
}

export default AuthPage;
