import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import capitalize from "../utils/capitalize"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Workspace = () => {

  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [loadingPage, setLoadingPage] = useState(true)

  const [courses, setCourses] = useState([])
  useEffect(() => {
    const getDashboardInfo = async () => {
      const { data, error } = await supabase.
        from("courses")
        .select('*')
      if (error) {
        console.error("Error in fetching dashboard info: ", error)
      } else {
        console.log(data)
        setCourses([...data])
        setLoadingPage(false)
      }
    }

    getDashboardInfo()
  }, [])

  if (loading){
    return(
      <h1>Loading bitch</h1>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8 flex">
      <Sidebar />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {capitalize(session.user.email.split('@')[0])}</h1>
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 px-6 py-3 rounded-xl border border-purple-500/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-sm text-gray-300">Streak</p>
                <p className="text-xl font-bold">12 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
            <p className="text-gray-400 text-sm mb-2">Progress</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              0 courses
            </p>
            <p className="text-gray-400 text-sm mt-1">completed</p>
          </div>
        </div>

        {/* Continue Learning Section */}
        {/* <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <p className="text-purple-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                Continue Learning
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">React JS</h2>
              <p className="text-gray-400 mb-6">Lesson 4: Routers</p>
              
              <div className="mb-2">
                <div className="w-full bg-zinc-800 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">45% completed</p>
              
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                Resume Learning
              </button>
            </div>


            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center p-8">
              <img 
                src="https://placehold.co/600x400/1a1a1a/purple?text=React+Course" 
                alt="Course preview"
                className="rounded-lg w-full h-full object-cover max-h-80"
              />
            </div>
          </div>
        </div> */}

        {/* Generate Learning Path Section */}
        <div className="bg-gradient-to-r from-indigo-950 to-purple-950 rounded-xl border border-indigo-800/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <p className="text-lg">What skill you want to learn next?</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 whitespace-nowrap" onClick={() => { navigate("/") }}>
              Generate Path
            </button>
          </div>
        </div>

        {/* Your Generated Paths Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Your Generated Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {/* Path Card */}
                  {courses.map((course) => {
                    {console.log(course)}
                    return (
                      <div key={course.id} className="bg-gradient-to-br from-emerald-950 to-green-950 rounded-xl border border-emerald-700/50 p-6 hover:border-emerald-500 transition-all transform hover:scale-105 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-emerald-600 p-2 rounded-lg">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <span className="text-xs bg-emerald-800/50 px-3 py-1 rounded-full">{course.estimated_duration}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{capitalize(course.title)}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{course.total_topics + " topics"}</span>
                      <span>•</span>
                      <span>{course.total_subtopics + " subtopics"}</span>
                    </div>
                  </div>
                    )
                  })}

                </div>
              </div>
      </div>
    </div>
  );
};

export default Workspace;