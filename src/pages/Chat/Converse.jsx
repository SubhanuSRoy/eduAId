import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// icons
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
function Converse() {
  const { transcript } = useSpeechRecognition();

  const [searchQuery, setSearchQuery] = useState(null);
  const [listening, setListening] = useState(false);
  const [AIResponse, setAIResponse] = useState("");
  const [loading, setloading] = useState(false);

  const [messages, setMessages] = useState([]);

  const empID = useSelector((state) => state.user.empID);

  useEffect(() => {
    document.title =  "Chat with eduAId";
  }, [])

  const listen = () => {
    setListening(true);
    // setLoading(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.onresult = (e) => {
      const query = e.results[0][0].transcript;
      setSearchQuery(query);
      setListening(false);
      // setLoading(false);
      recognition.stop();
    };
    recognition.onerror = (e) => {
      console.log(e);
      setListening(false);
      // setLoading(false);
    };
  };
  const updateQuery = () => {
    SpeechRecognition.stopListening();
    console.log(transcript);
    setSearchQuery(transcript);
  };

  const getRes = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(searchQuery);
    //
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "llm/generate/", {
        prompt: searchQuery,
        model: "gemini-pro",
      })
      .then((res) => {
        console.log(res.data);
        setAIResponse(res.data.content);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.message);
      });
  };

  const showMessages = async () => {
    setloading(false);
    setMessages((oldArr) => [
      ...oldArr,
      {
        query: searchQuery,
        ans: AIResponse,
      },
    ]);
  };
  useLayoutEffect(() => {
    if (AIResponse?.length > 0) {
      showMessages();
    }
  }, [AIResponse]);

  const data = {
    jobs: [
      {
        role: "SDE",
        company: "Microsoft",
        salary: "15LPA",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        role: "SDE",
        company: "Microsoft",
        salary: "15LPA",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
    courses: [
      {
        title: "Java Crash Course",
        course_creator: "Tim Buchalka",
        totalTime: "15hrs",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        title: "Java Crash Course",
        course_creator: "Tim Buchalka",
        totalTime: "15hrs",
        logo: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
    mentors: [
      {
        mentor_name: "Jonathan Watson",
        quali: "Btech",
        tags: ["software", "backend"],
        img: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
      {
        mentor_name: "Jonathan Watson",
        quali: ["Btech", "MTech"],
        tags: ["software", "backend"],
        img: "https://drive.google.com/file/d/1fkR0HV1uPCTEKos7I4QpJG7zwVVK5S0l/view?usp=sharing",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center ">
      {/* chat */}
      <div class="flex flex-col bg-transparent w-full h-5/6 rounded-lg overflow-auto">
        {/* <img src={`data:image/png;base64,${AIResponse}`}/> */}
        {messages?.map((m) => {
          return (
            <div class="flex flex-col w-full mx-auto  p-4 mb-24">
              <div class="flex w-full mt-2 space-x-3 max-w-full">
                <div class="flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center">
                  <BiUserCircle className="h-10 w-10" />
                </div>
                <div>
                  <div class="bg-gray-50 p-3  rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">{m.query}</p>
                  </div>
                </div>
              </div>
              <div class="flex w-full mt-2 space-x-3 ml-auto justify-end">
                <div>
                  <div class="bg-gray-50 text-gray-800 p-3 rounded-md">
                    <TypeAnimation
                      speed={75}
                      sequence={[m.ans]}
                      wrapper="Markdown"
                      className="text-sm whitespace-pre-wrap"
                    />
                  </div>
                </div>
                <div class="flex-shrink-0 h-12 w-12 ">
                  <img
                    src="https://cdn.dribbble.com/users/214929/screenshots/4967879/ai-loader-opt.gif"
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* placeholder examples */}
      {messages.length < 1 && (
        <div className="flex gap-8 w-3/4 h-3/4 ">
          <div className="flex flex-col gap-4 text-gray-400 items-center w-1/3 mx-auto">
            <h2 className="text-xl flex items-center gap-2">
              eduAId Chatbot
            </h2>
            {/* Example student question */}
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              What are the key concepts in quantum physics?
            </div>

            {/* Example teacher question */}
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              How can I improve student engagement during online classes?
            </div>

            {/* Another student question */}
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              Can you recommend resources for learning JavaScript for beginners?
            </div>

            {/* Another teacher question */}
            <div className="bg-midnight p-4 rounded-md w-full flex-wrap text-center">
              What strategies work best for teaching complex mathematical
              concepts?
            </div>
          </div>
        </div>
      )}

      {/* input */}
      <div className="fixed bottom-8 w-3/4">
        <form class="w-full flex items-center gap-4" onSubmit={getRes}>
          <div class="relative flex items-center flex-grow">
            <input
              class="h-20 w-full rounded-lg border-2 border-prim pl-8 pr-10 bg-gray-50 text-gray-800 text-lg outline-none placeholder-gray-300 focus:z-10"
              placeholder="Ask me anything..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              type="text"
            />
            {!listening && (
              <button
                onClick={listen}
                class="absolute  right-2 rounded-full p-2  text-gray-800 hover:bg-prim hover:text-white"
              >
                <span class="sr-only">Start Listening</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}
            {listening && (
              <button
                onClick={updateQuery}
                class="absolute right-2 rounded-full p-2  text-red-500 bg-gray-50 hover:bg-red-500 hover:text-white"
              >
                <span class="sr-only">Stop Listening</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
            )}
          </div>
          {loading ? (
            <img
              className="h-12"
              src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"
            />
          ) : (
            <></>
          )}
          <button
            className="bg-prim p-4 h-16 rounded-md text-center text-white"
            type="submit"
            onClick={getRes}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Converse;
