import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Flame,
  Star,
  Clock,
  Award,
  Users,
  ChevronRight,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(2450);
  const [currentLevel, setCurrentLevel] = useState(12);
  const [nextLevelXP, setNextLevelXP] = useState(2800);

  const todayStats = {
    questionsAnswered: 45,
    timeSpent: 120, // minutes
    accuracy: 78,
    xpEarned: 180
  };

  const weeklyProgress = [
    { day: 'Sen', completed: true, xp: 150 },
    { day: 'Sel', completed: true, xp: 200 },
    { day: 'Rab', completed: true, xp: 180 },
    { day: 'Kam', completed: true, xp: 220 },
    { day: 'Jum', completed: true, xp: 190 },
    { day: 'Sab', completed: true, xp: 160 },
    { day: 'Min', completed: true, xp: 180 }
  ];

  const recentAchievements = [
    { title: "First Try Out", description: "Menyelesaikan try out pertama", icon: Target, earned: "2 hari lalu" },
    { title: "Week Warrior", description: "Belajar 7 hari berturut-turut", icon: Flame, earned: "1 minggu lalu" },
    { title: "Math Master", description: "Skor 90+ di Penalaran Matematika", icon: Award, earned: "2 minggu lalu" }
  ];

  const recommendedTopics = [
    { title: "Penalaran Matematika - Fungsi", progress: 60, difficulty: "Menengah", estimatedTime: "30 menit" },
    { title: "Literasi Bahasa Indonesia - Teks Argumentasi", progress: 30, difficulty: "Mudah", estimatedTime: "25 menit" },
    { title: "Penalaran Umum - Logika", progress: 0, difficulty: "Sulit", estimatedTime: "45 menit" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selamat datang kembali! 👋</h1>
          <p className="text-muted-foreground">Mari lanjutkan perjalanan belajar SNBT mu hari ini</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{currentStreak} hari</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="text-2xl font-bold">{currentLevel}</p>
                  <Progress value={(totalXP / nextLevelXP) * 100} className="mt-2" />
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hari Ini</p>
                  <p className="text-2xl font-bold">{todayStats.questionsAnswered}</p>
                  <p className="text-xs text-muted-foreground">soal dikerjakan</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Progress Minggu Ini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end mb-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        day.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {day.completed ? '✓' : day.day}
                      </div>
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                      {day.completed && (
                        <span className="text-xs font-medium text-primary">{day.xp} XP</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="px-3 py-1">
                    🔥 {currentStreak} hari berturut-turut!
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Rekomendasi Belajar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{topic.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {topic.estimatedTime}
                        </span>
                        <Badge variant={topic.difficulty === 'Mudah' ? 'secondary' : topic.difficulty === 'Menengah' ? 'default' : 'destructive'} className="text-xs">
                          {topic.difficulty}
                        </Badge>
                      </div>
                      {topic.progress > 0 && (
                        <Progress value={topic.progress} className="mt-2 h-2" />
                      )}
                    </div>
                    <Button size="sm" className="ml-4">
                      <Play className="h-4 w-4 mr-1" />
                      Mulai
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistik Hari Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Soal Dikerjakan</span>
                  <span className="font-medium">{todayStats.questionsAnswered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Waktu Belajar</span>
                  <span className="font-medium">{Math.floor(todayStats.timeSpent / 60)}j {todayStats.timeSpent % 60}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Akurasi</span>
                  <span className="font-medium">{todayStats.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">XP Earned</span>
                  <span className="font-medium text-primary">+{todayStats.xpEarned}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pencapaian Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <achievement.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.earned}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/practice">
                  <Button className="w-full justify-between" variant="outline">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Latihan Soal
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/tryout">
                  <Button className="w-full justify-between" variant="outline">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Try Out
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/leaderboard">
                  <Button className="w-full justify-between" variant="outline">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Leaderboard
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;