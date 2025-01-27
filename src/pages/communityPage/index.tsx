import { CreateQuestionDialog } from "./component/createQuestion"
import { QuestionCard } from "./component/questionCard"
import { Leaderboard } from "./component/leadership"
import { LeaderboardUser, Question } from "./types"
import DesktopTitlebar from "../../components/header"

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    title: "How do you solve quadratic equations using the quadratic formula?",
    subject: "Mathematics",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      role: "student",
      points: 150,
    },
    tags: ["algebra", "equations", "mathematics"],
    stats: {
      views: 1234,
      answers: 5,
      votes: 23,
    },
    createdAt: "2 hours ago",
    solved: true,
  },
  {
    id: "2",
    title: "What's the difference between mitosis and meiosis?",
    subject: "Biology",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      role: "student",
      points: 89,
    },
    tags: ["cell-division", "biology", "genetics"],
    stats: {
      views: 892,
      answers: 3,
      votes: 15,
    },
    createdAt: "5 hours ago",
    solved: false,
  },
]

const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    name: "Dr. Emily Parker",
    avatar: "/placeholder.svg",
    role: "teacher",
    points: 1250,
    questionsAnswered: 145,
    helpfulVotes: 892,
    rank: 1,
  },
  {
    id: "2",
    name: "Michael Wong",
    avatar: "/placeholder.svg",
    role: "student",
    points: 980,
    questionsAnswered: 89,
    helpfulVotes: 567,
    rank: 2,
  },
  {
    id: "3",
    name: "Lisa Thompson",
    avatar: "/placeholder.svg",
    role: "student",
    points: 875,
    questionsAnswered: 76,
    helpfulVotes: 445,
    rank: 3,
  },
  {
    id: "4",
    name: "John Doe",
    avatar: "/placeholder.svg",
    role: "teacher",
    points: 1200,
    questionsAnswered: 150,
    helpfulVotes: 800,
    rank: 4,
  },
  {
    id: "5",
    name: "Sarah Wilson",
    avatar: "/placeholder.svg",
    role: "student",
    points: 1105,
    questionsAnswered: 100,
    helpfulVotes: 650,
    rank: 5,
  },
  {
    id: "6",
    name: "David Lee",
    avatar: "/placeholder.svg",
    role: "student",
    points: 1050,
    questionsAnswered: 90,
    helpfulVotes: 710,
    rank: 6,
  },
  {
    id: "7",
    name: "Olivia Martinez",
    avatar: "/placeholder.svg",
    role: "teacher",
    points: 1300,
    questionsAnswered: 180,
    helpfulVotes: 920,
    rank: 7,
  },
  {
    id: "8",
    name: "James Brown",
    avatar: "/placeholder.svg",
    role: "student",
    points: 950,
    questionsAnswered: 85,
    helpfulVotes: 500,
    rank: 8,
  },
  
];

export default function CommunityPage() {
  return (
    <div className="w-full h-full">
      <DesktopTitlebar pageTitle={"Our Community"} />
      
      {/* Change flex-row to flex-col on mobile */}
      <div className="w-full flex flex-col md:flex-row px-4 py-4 md:py-8 gap-4 md:gap-8 h-full">
        
        {/* Main content area */}
        <div className="w-full md:flex-1">
          <div className="mb-4 md:mb-8 flex items-center gap-4">
            <CreateQuestionDialog />
          </div>
          
          <div className="space-y-4 w-full mb-4 md:mb-0">
            {SAMPLE_QUESTIONS.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
  
        {/* Leaderboard - full width on mobile, side panel on desktop */}
        <div className="w-full md:w-80 overflow-y-auto">
          <Leaderboard initialUsers={SAMPLE_LEADERBOARD} />
        </div>
      </div>
    </div>
  );
}