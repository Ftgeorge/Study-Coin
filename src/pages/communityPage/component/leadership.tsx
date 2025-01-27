import { useEffect, useState } from "react";
import { Medal } from "lucide-react";
import { LeaderboardUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import TrophyIcon from "../../../components/icons/trophyicon";

interface LeaderboardProps {
  initialUsers: LeaderboardUser[];
}

export function Leaderboard({ initialUsers }: LeaderboardProps) {
  const [users, setUsers] = useState<LeaderboardUser[]>(initialUsers);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
      setUsers(shuffledUsers);
    }, 3000);

    return () => clearInterval(interval);
  }, [users]);

  return (
    <div className="rounded-lg border bg-white shadow p-6 w-65">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Leaderboard</h2>
        <TrophyIcon size="8" />
      </div>

      {/* Leaderboard Cards */}
      <div className="space-y-4 overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 rounded-lg border shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
          >
            {/* Rank */}
            <div className="flex items-center gap-4">
              {/* Avatar and Name */}
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-gray-800 font-medium">{user.name}</h3>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <span className="text-lg font-semibold text-blue-600">{user.points} pts</span>
                  <span className="text-gray-300 text-sm">•</span>
                  <span className="text-sm text-gray-500">{user.questionsAnswered} answers</span>
                </div>
                {/* <Badge variant="outline" className="text-xs">{user.role}</Badge> */}
              </div>
            </div>

            {/* Points */}
            {/* <div className="flex flex-col items-end">
              
            </div> */}

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-800 font-bold text-lg">
              {index + 1 === 1 ? (
                <Medal className="h-6 w-6 text-yellow-500" />
              ) : index + 1 === 2 ? (
                <Medal className="h-6 w-6 text-gray-400" />
              ) : index + 1 === 3 ? (
                <Medal className="h-6 w-6 text-amber-700" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
