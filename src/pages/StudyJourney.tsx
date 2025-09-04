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
  Lock,
  CheckCircle,
  Play,
  Star,
  Clock,
  Users,
  ArrowRight,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const StudyJourney = () => {
  const [selectedSubtest, setSelectedSubtest] = useState("tps");

  const subtests = {
    tps: {
      name: "Tes Potensi Skolastik",
      description: "Kemampuan penalaran umum, kuantitatif, pengetahuan dan pemahaman umum, serta kemampuan memahami bacaan dan menulis",
      progress: 65,
      totalNodes: 24,
      completedNodes: 16,
      color: "bg-blue-500"
    },
    literasi: {
      name: "Literasi Bahasa Indonesia",
      description: "Kemampuan memahami, menggunakan, mengevaluasi, merefleksikan berbagai jenis teks tertulis",
      progress: 45,
      totalNodes: 18,
      completedNodes: 8,
      color: "bg-green-500"
    },
    matematika: {
      name: "Penalaran Matematika",
      description: "Kemampuan berpikir menggunakan konsep, prosedur, fakta, dan alat matematika",
      progress: 30,
      totalNodes: 20,
      completedNodes: 6,
      color: "bg-purple-500"
    }
  };

  const journeyNodes = {
    tps: [
      { id: 1, title: "Pengenalan TPS", status: "completed", xp: 100, difficulty: "Mudah", estimatedTime: "15 menit" },
      { id: 2, title: "Penalaran Umum - Dasar", status: "completed", xp: 150, difficulty: "Mudah", estimatedTime: "30 menit" },
      { id: 3, title: "Penalaran Umum - Logika", status: "completed", xp: 200, difficulty: "Menengah", estimatedTime: "45 menit" },
      { id: 4, title: "Penalaran Kuantitatif - Aritmatika", status: "current", xp: 180, difficulty: "Menengah", estimatedTime: "40 menit" },
      { id: 5, title: "Penalaran Kuantitatif - Aljabar", status: "locked", xp: 220, difficulty: "Menengah", estimatedTime: "50 menit" },
      { id: 6, title: "Pengetahuan Kuantitatif - Geometri", status: "locked", xp: 250, difficulty: "Sulit", estimatedTime: "60 menit" },
      { id: 7, title: "Pemahaman Bacaan - Teks Informatif", status: "locked", xp: 200, difficulty: "Menengah", estimatedTime: "35 menit" },
      { id: 8, title: "Pemahaman Bacaan - Teks Argumentatif", status: "locked", xp: 230, difficulty: "Sulit", estimatedTime: "45 menit" }
    ],
    literasi: [
      { id: 1, title: "Pengenalan Literasi", status: "completed", xp: 100, difficulty: "Mudah", estimatedTime: "20 menit" },
      { id: 2, title: "Memahami Teks Naratif", status: "completed", xp: 150, difficulty: "Mudah", estimatedTime: "30 menit" },
      { id: 3, title: "Memahami Teks Eksposisi", status: "current", xp: 180, difficulty: "Menengah", estimatedTime: "40 menit" },
      { id: 4, title: "Memahami Teks Argumentasi", status: "locked", xp: 200, difficulty: "Menengah", estimatedTime: "45 menit" },
      { id: 5, title: "Analisis Struktur Teks", status: "locked", xp: 220, difficulty: "Sulit", estimatedTime: "50 menit" },
      { id: 6, title: "Evaluasi Isi Teks", status: "locked", xp: 250, difficulty: "Sulit", estimatedTime: "55 menit" }
    ],
    matematika: [
      { id: 1, title: "Pengenalan Matematika", status: "completed", xp: 100, difficulty: "Mudah", estimatedTime: "25 menit" },
      { id: 2, title: "Aljabar Dasar", status: "completed", xp: 150, difficulty: "Mudah", estimatedTime: "35 menit" },
      { id: 3, title: "Fungsi dan Grafik", status: "current", xp: 200, difficulty: "Menengah", estimatedTime: "50 menit" },
      { id: 4, title: "Geometri Bidang", status: "locked", xp: 220, difficulty: "Menengah", estimatedTime: "45 menit" },
      { id: 5, title: "Trigonometri", status: "locked", xp: 250, difficulty: "Sulit", estimatedTime: "60 menit" },
      { id: 6, title: "Statistika dan Peluang", status: "locked", xp: 280, difficulty: "Sulit", estimatedTime: "65 menit" }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "current":
        return <Play className="h-6 w-6 text-blue-500" />;
      case "locked":
        return <Lock className="h-6 w-6 text-gray-400" />;
      default:
        return <MapPin className="h-6 w-6 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800";
      case "Menengah":
        return "bg-yellow-100 text-yellow-800";
      case "Sulit":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Journey 🗺️</h1>
          <p className="text-muted-foreground">Ikuti jalur belajar terstruktur untuk menguasai semua subtest SNBT</p>
        </div>

        {/* Subtest Selection */}
        <Tabs value={selectedSubtest} onValueChange={setSelectedSubtest} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tps">TPS</TabsTrigger>
            <TabsTrigger value="literasi">Literasi</TabsTrigger>
            <TabsTrigger value="matematika">Matematika</TabsTrigger>
          </TabsList>

          {Object.entries(subtests).map(([key, subtest]) => (
            <TabsContent key={key} value={key} className="mt-6">
              {/* Subtest Overview */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{subtest.name}</CardTitle>
                      <p className="text-muted-foreground mt-2">{subtest.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{subtest.progress}%</div>
                      <p className="text-sm text-muted-foreground">{subtest.completedNodes}/{subtest.totalNodes} selesai</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={subtest.progress} className="h-3" />
                </CardContent>
              </Card>

              {/* Journey Path */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Jalur Pembelajaran</h2>
                
                <div className="relative">
                  {/* Journey Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  <div className="space-y-6">
                    {journeyNodes[key as keyof typeof journeyNodes].map((node, index) => (
                      <div key={node.id} className="relative flex items-start">
                        {/* Node Icon */}
                        <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-2 border-border rounded-full">
                          {getStatusIcon(node.status)}
                        </div>
                        
                        {/* Node Content */}
                        <div className="ml-6 flex-1">
                          <Card className={`${node.status === 'locked' ? 'opacity-60' : ''} hover:shadow-md transition-shadow`}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {node.estimatedTime}
                                    </span>
                                    <Badge className={getDifficultyColor(node.difficulty)}>
                                      {node.difficulty}
                                    </Badge>
                                    <span className="flex items-center gap-1">
                                      <Star className="h-4 w-4" />
                                      {node.xp} XP
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="ml-4">
                                  {node.status === 'completed' && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                      ✓ Selesai
                                    </Badge>
                                  )}
                                  {node.status === 'current' && (
                                    <Button>
                                      <Play className="h-4 w-4 mr-2" />
                                      Lanjutkan
                                    </Button>
                                  )}
                                  {node.status === 'locked' && (
                                    <Button variant="outline" disabled>
                                      <Lock className="h-4 w-4 mr-2" />
                                      Terkunci
                                    </Button>
                                  )}
                                </div>
                              </div>
                              
                              {node.status === 'completed' && (
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                  <span>Diselesaikan dengan baik!</span>
                                  <Button variant="ghost" size="sm">
                                    Review
                                  </Button>
                                </div>
                              )}
                              
                              {node.status === 'current' && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                  <p className="text-sm text-blue-800 mb-2">📍 Kamu sedang di sini!</p>
                                  <p className="text-sm text-blue-600">Lanjutkan pembelajaran untuk membuka materi selanjutnya.</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Achievement Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Pencapaian Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Object.values(subtests).reduce((acc, subtest) => acc + subtest.completedNodes, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Node Selesai</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round(Object.values(subtests).reduce((acc, subtest) => acc + subtest.progress, 0) / 3)}%
                </div>
                <p className="text-sm text-muted-foreground">Rata-rata Progress</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  2,450
                </div>
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyJourney;