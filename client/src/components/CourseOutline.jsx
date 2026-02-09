import supabase from "../config/supabaseClient";
import {useNavigate} from "react-router-dom"
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const CourseOutline = ({ Response }) => {

  const navigate = useNavigate()
  const {session} = useAuth()
  console.log(Response)

  const addToWorkspace = async () => {
    const {data, error} = await supabase
    .from('courses')
    .insert({
      user_id: session.user.id,
      title: Response.title.name,
      overview: Response.title.description,
      total_topics: Response.course_structure_rules.total_topics,
      total_subtopics: Response.course_structure_rules.total_subtopics,
      estimated_duration: Response.course_structure_rules.total_estimated_time
    })
    .select()
    .single()

    if (error){
      console.error("Error inserting course: ", course)
    } else{
      console.log("Course created: ", data)
      navigate("/workspace")
    }
  }

  if (!Response.title){
    return (
        <div>
            {Response.error}
        </div>
    )
  }

  return (
    
    <div className="max-w-3xl space-y-10 text-white leading-relaxed">
      {console.log('hey')}
      {/* Topic Overview */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          {Response.title.name}
        </h2>
        <p className="text-white/90">
          {Response.title.description}
        </p>
      </div>

      {/* Learning Plan Introduction */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Learning Plan Introduction
        </h2>
        <p className="text-white/90">
          {Response.learning_plan_introduction.description}
        </p>
      </div>

      {/* Course Structure Rules */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Course Structure
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-white/90">
          <li>
            <span className="font-medium">
              Total Topics:
            </span>{" "}
            {Response.course_structure_rules.total_topics}
          </li>
          <li>
            <span className="font-medium">
              Total Subtopics:
            </span>{" "}
            {Response.course_structure_rules.total_subtopics}
          </li>
          <li>
            <span className="font-medium">
              Estimated Time:
            </span>{" "}
            {Response.course_structure_rules.total_estimated_time}
          </li>
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Course Layout */}
      <div className="space-y-10">
        {Response.course_layout.map((topic, index) => (
          <div key={topic.topic_name + "-" + index} className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">
              Topic {topic.topic_number} — {topic.topic_name}
            </h3>

            <p className="text-sm text-white/70">
              Estimated time: {topic.estimated_time}
            </p>

            <ul className="list-disc pl-6 space-y-2 text-white/90">
              {topic.subtopics.map((sub, i) => (
                <li key={`${topic.topic_number}-${i}`}>{sub}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Positive Closing */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          What You’ll Gain
        </h2>
        <p className="text-white/90">
          {Response.positive_closing.description}
        </p>
      </div>

        <button className='bg-[#305cde] px-3 py-3 rounded-[10px] mt-10 cursor-pointer flex justify-center items-center gap-2' onClick={addToWorkspace}><FaPlus className='inline'/>Add to Workspace</button>

    </div>
  );
};

export default CourseOutline;