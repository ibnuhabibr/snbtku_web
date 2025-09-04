import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  Filter,
  Flame,
  Loader2,
  Play,
  Search,
  Target,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// Import services and models
import {
  getQuestionSets,
  getRecentActivity,
  getUserPracticeStats,
  PracticeFilter,
  PracticeStats,
  QuestionSet,
  RecentActivity,
} from "@/services/practiceService";

const PracticeZone = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  // State untuk filter dan pencarian
  const [selectedSubtest, setSelectedSubtest] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("browse");

  // State untuk data
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  const [practiceStats, setPracticeStats] = useState<PracticeStats>({
    totalQuestions: 0,
    answeredQuestions: 0,
    accuracy: 0,
    averageTime: "0:00",
    streak: 0,
  });

  // State untuk loading
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingQuestionSets, setIsLoadingQuestionSets] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const subtests = [
    { value: "all", label: "Semua Subtest" },
    { value: "TPS", label: "Tes Potensi Skolastik" },
    { value: "LITERASI", label: "Literasi Bahasa Indonesia" },
    { value: "MATEMATIKA", label: "Penalaran Matematika" },
    { value: "PPU", label: "Pengetahuan dan Pemahaman Umum" },
  ];

  const difficulties = [
    { value: "all", label: "Semua Tingkat" },
    { value: "MUDAH", label: "Mudah" },
    { value: "MENENGAH", label: "Menengah" },
    { value: "SULIT", label: "Sulit" },
  ];

  const topics = {
    all: [{ value: "all", label: "Semua Topik" }],
    TPS: [
      { value: "all", label: "Semua Topik" },
      { value: "Penalaran Umum", label: "Penalaran Umum" },
      { value: "Penalaran Kuantitatif", label: "Penalaran Kuantitatif" },
      { value: "Pengetahuan Kuantitatif", label: "Pengetahuan Kuantitatif" },
      { value: "Pemahaman Bacaan", label: "Pemahaman Bacaan" },
    ],
    LITERASI: [
      { value: "all", label: "Semua Topik" },
      { value: "Teks Naratif", label: "Teks Naratif" },
      { value: "Teks Eksposisi", label: "Teks Eksposisi" },
      { value: "Teks Argumentasi", label: "Teks Argumentasi" },
      { value: "Analisis Struktur", label: "Analisis Struktur" },
    ],
    MATEMATIKA: [
      { value: "all", label: "Semua Topik" },
      { value: "Aljabar", label: "Aljabar" },
      { value: "Fungsi dan Grafik", label: "Fungsi dan Grafik" },
      { value: "Geometri", label: "Geometri" },
      { value: "Trigonometri", label: "Trigonometri" },
      { value: "Statistika dan Peluang", label: "Statistika dan Peluang" },
    ],
    PPU: [
      { value: "all", label: "Semua Topik" },
      { value: "Sejarah", label: "Sejarah" },
      { value: "Geografi", label: "Geografi" },
      { value: "Ekonomi", label: "Ekonomi" },
      { value: "Sosiologi", label: "Sosiologi" },
      { value: "Kewarganegaraan", label: "Kewarganegaraan" },
    ],
  };

  // Fungsi untuk mengambil data dari Firestore
  const fetchQuestionSets = async (resetPagination = false) => {
    if (!user) return;

    try {
      setIsLoadingQuestionSets(true);

      // Buat filter berdasarkan state
      const filter: PracticeFilter = {
        searchQuery: searchQuery,
        subtest: selectedSubtest !== "all" ? selectedSubtest : undefined,
        difficulty:
          selectedDifficulty !== "all" ? selectedDifficulty : undefined,
        topic: selectedTopic !== "all" ? selectedTopic : undefined,
      };

      // Reset pagination jika diperlukan
      const paginationDoc = resetPagination ? null : lastDoc;

      // Ambil data dari Firestore
      const result = await getQuestionSets(filter, paginationDoc);

      // Update state
      if (resetPagination) {
        setQuestionSets(result.questionSets);
      } else {
        setQuestionSets((prev) => [...prev, ...result.questionSets]);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.questionSets.length > 0);
    } catch (error) {
      console.error("Error fetching question sets:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil data soal latihan",
        variant: "destructive",
      });
    } finally {
      setIsLoadingQuestionSets(false);
    }
  };

  // Fungsi untuk mengambil statistik latihan
  const fetchPracticeStats = async () => {
    if (!user) return;

    try {
      setIsLoadingStats(true);
      const stats = await getUserPracticeStats(user.uid);
      setPracticeStats(stats);
    } catch (error) {
      console.error("Error fetching practice stats:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil statistik latihan",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fungsi untuk mengambil aktivitas terbaru
  const fetchRecentActivity = async () => {
    if (!user) return;

    try {
      setIsLoadingActivities(true);
      const activities = await getRecentActivity(user.uid);
      setRecentActivities(activities);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil aktivitas terbaru",
        variant: "destructive",
      });
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // Fungsi untuk memulai latihan soal
  const handleStartPractice = (questionSetId: string) => {
    navigate(`/practice/${questionSetId}`);
  };

  // Fungsi untuk me-review hasil latihan
  const handleReviewPractice = (resultId: string) => {
    navigate(`/practice/result/${resultId}`);
  };

  // Fungsi untuk me-reset filter
  const handleResetFilter = () => {
    setSelectedSubtest("all");
    setSelectedDifficulty("all");
    setSelectedTopic("all");
    setSearchQuery("");
  };

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = () => {
    fetchQuestionSets(true);
  };

  // Efek untuk mengambil data saat komponen dimount
  useEffect(() => {
    if (user) {
      fetchPracticeStats();
      fetchRecentActivity();
      fetchQuestionSets(true);
    }
  }, [user]);

  // Efek untuk mengambil data saat filter berubah
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        fetchQuestionSets(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedSubtest, selectedDifficulty, selectedTopic, searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "MUDAH":
        return "bg-green-100 text-green-800";
      case "MENENGAH":
        return "bg-yellow-100 text-yellow-800";
      case "SULIT":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSubtestColor = (subtest: string) => {
    switch (subtest) {
      case "TPS":
        return "bg-blue-100 text-blue-800";
      case "LITERASI":
        return "bg-green-100 text-green-800";
      case "MATEMATIKA":
        return "bg-purple-100 text-purple-800";
      case "PPU":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Kita tidak perlu filter lagi karena sudah difilter di Firestore
  // Namun kita tetap mempertahankan variabel ini untuk kompatibilitas dengan kode yang ada
  const filteredQuestionSets = questionSets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Zone 🎯</h1>
          <p className="text-muted-foreground">
            Latihan soal dengan ribuan bank soal berkualitas dan pembahasan
            lengkap
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Soal
                  </p>
                  {isLoadingStats ? (
                    <div className="h-8 flex items-center mt-1">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">
                      {practiceStats.totalQuestions}
                    </h3>
                  )}
                </div>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Soal Terjawab
                  </p>
                  {isLoadingStats ? (
                    <div className="h-8 flex items-center mt-1">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">
                      {practiceStats.answeredQuestions}
                    </h3>
                  )}
                </div>
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Akurasi
                  </p>
                  {isLoadingStats ? (
                    <div className="h-8 flex items-center mt-1">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">
                      {practiceStats.accuracy}%
                    </h3>
                  )}
                </div>
                <Target className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Waktu Rata-rata
                  </p>
                  {isLoadingStats ? (
                    <div className="h-8 flex items-center mt-1">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">
                      {practiceStats.averageTime}
                    </h3>
                  )}
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Streak
                  </p>
                  {isLoadingStats ? (
                    <div className="h-8 flex items-center mt-1">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    <h3 className="text-2xl font-bold mt-1">
                      {practiceStats.streak} hari
                    </h3>
                  )}
                </div>
                <Flame className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Soal</TabsTrigger>
            <TabsTrigger value="activity">Aktivitas Terbaru</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter & Pencarian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari soal..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedSubtest}
                    onValueChange={(value) => setSelectedSubtest(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Subtest" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtests.map((subtest) => (
                        <SelectItem key={subtest.value} value={subtest.value}>
                          {subtest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={(value) => setSelectedDifficulty(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tingkat Kesulitan" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem
                          key={difficulty.value}
                          value={difficulty.value}
                        >
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={handleResetFilter}
                    disabled={isLoadingQuestionSets}
                  >
                    {isLoadingQuestionSets ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Reset
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Question Sets */}
            {isLoadingQuestionSets && filteredQuestionSets.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuestionSets.map((set) => {
                    // Tentukan apakah set soal sudah pernah dikerjakan
                    // Ini hanya placeholder, seharusnya diambil dari data hasil latihan
                    const isCompleted = false;

                    return (
                      <Card
                        key={set.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">
                                {set.title}
                              </CardTitle>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge className={getSubtestColor(set.subtest)}>
                                  {set.subtest}
                                </Badge>
                                <Badge
                                  className={getDifficultyColor(set.difficulty)}
                                >
                                  {set.difficulty}
                                </Badge>
                              </div>
                            </div>
                            {isCompleted && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {set.questionCount} soal
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {set.estimatedTime}
                              </span>
                            </div>

                            {/* Placeholder untuk statistik */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Tingkat Kesulitan</span>
                                <span className="font-medium">
                                  {set.difficulty}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Topik</span>
                                <span className="font-medium">{set.topic}</span>
                              </div>
                            </div>

                            <Button
                              className="w-full"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={() => handleStartPractice(set.id)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {isCompleted ? "Ulangi" : "Mulai"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {!isLoadingQuestionSets &&
                  filteredQuestionSets.length === 0 && (
                    <Card className="text-center py-12">
                      <CardContent>
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">
                          Tidak ada soal ditemukan
                        </h3>
                        <p className="text-muted-foreground">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                      </CardContent>
                    </Card>
                  )}

                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => fetchQuestionSets(false)}
                      disabled={isLoadingQuestionSets}
                    >
                      {isLoadingQuestionSets ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Memuat...
                        </>
                      ) : (
                        "Muat Lebih Banyak"
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Aktivitas Latihan Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingActivities ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            {/* @ts-ignore */}
                            <span>
                              {(activity as any).questionCount || 0} soal
                            </span>
                            <span>Skor: {activity.score}%</span>
                            <span>{activity.time}</span>
                            <span>{String(activity.date)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              activity.score >= 80
                                ? "default"
                                : activity.score >= 60
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {activity.score >= 80
                              ? "Excellent"
                              : activity.score >= 60
                              ? "Good"
                              : "Needs Improvement"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReviewPractice(activity.id)}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}

                    {!isLoadingActivities && recentActivities.length === 0 && (
                      <div className="text-center py-8">
                        <Clock className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">
                          Belum ada aktivitas
                        </h3>
                        <p className="text-muted-foreground">
                          Mulai latihan soal untuk melihat aktivitas terbaru
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PracticeZone;
