import DesktopTitlebar from "../../../components/header";
import coin from "../../../../public/images/coin.png";
import resources from "../../../../public/images/resources.png";
import assignment from "../../../../public/images/assignment.png";
import HomePageTab from "../../../components/ui/homepagetab";
import { useState } from "react";
import { Leaderboard } from "../../communityPage/component/leadership";
import { LeaderboardUser } from "../../communityPage/types";

export default function HomePage() {
  const [filter, setFilter] = useState("today");

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

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
    {
      id: "9",
      name: "Charlotte Harris",
      avatar: "/placeholder.svg",
      role: "teacher",
      points: 1400,
      questionsAnswered: 200,
      helpfulVotes: 1000,
      rank: 9,
    },
    {
      id: "10",
      name: "Ethan Clark",
      avatar: "/placeholder.svg",
      role: "student",
      points: 980,
      questionsAnswered: 92,
      helpfulVotes: 600,
      rank: 10,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Titlebar */}
      <DesktopTitlebar pageTitle="Home Page" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row overflow-y-auto">
        <div className="flex flex-col flex-1 gap-10 p-4">
          {/* HomePageTabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <HomePageTab
              image={coin}
              statCount={300}
              sectionName="Total Coins Mined"
              link="/coins"
            />
            <HomePageTab
              image={resources}
              statCount={15}
              sectionName="Resources"
              link="/resources"
            />
            <HomePageTab
              image={assignment}
              statCount={8}
              sectionName="Assignments"
              link="/dashboard/assignments"
            />
          </div>

          {/* Remaining Space Container */}
          <div className="flex-1 text-black py-6 flex flex-col">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-lg font-medium">Today - {today}</p>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <label htmlFor="filter" className="text-black text-lg font-medium">
                  Sort:
                </label>
                <div className="relative flex-1 sm:flex-none">
                  <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="w-full sm:w-auto bg-white text-black border border-gray-300 rounded px-4 py-2 pr-10 appearance-none"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="last-week">Last Week</option>
                  </select>
                  {/* Dropdown Icon */}
                  <span className="absolute text-black right-3 top-1/2 transform -translate-y-1/2 mr-2 pointer-events-none">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* Centered Content */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl font-bold">No points gained</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto md:pt-6 overflow-y-auto">
          <Leaderboard initialUsers={SAMPLE_LEADERBOARD} />
        </div>
      </div>
    </div>
  );
}