


"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/services/AuthServices"
import { MessageSquare, SquareKanban, Vote } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserDashboardSection({
  voteCount,
  commentCount,
  ReviewsCount,
}: {
  commentCount: number
  voteCount: number
  ReviewsCount: number
}) {
  const [profileData, setProfileData] = useState<Record<string, string>>({
    name: "",
    email: "",
  })

  useEffect(() => {
    getCurrentUserData()
  }, [])

  const getCurrentUserData = async () => {
    try {
      const res = await getCurrentUser()
      if (res) {
        setProfileData(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-4 md:p-6 w-full">
      <Card className="shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow">
              <Image
                src="/images/profile-avatar.png"
                alt="Profile"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
            <div className="pt-2">
              <h1 className="text-2xl md:text-4xl font-bold">{profileData.name || "Loading..."}</h1>
              <h2 className="text-lg md:text-2xl text-gray-500">{profileData.email || "Loading..."}</h2>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg md:text-xl font-medium">My Total Reviews</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <SquareKanban className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{ReviewsCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg md:text-xl font-medium">Total Comments</CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{commentCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg md:text-xl font-medium">Total Votes</CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Vote className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{voteCount}</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
