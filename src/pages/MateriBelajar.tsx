import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Filter, Star, Clock, Users, Download, Eye, Bookmark } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  duration: string;
  views: number;
  downloads: number;
  rating: number;
  isBookmarked: boolean;
  type: 'pdf' | 'video' | 'interactive';
  thumbnail?: string;
}

const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Matematika Dasar - Aljabar Linear',
    description: 'Materi lengkap tentang aljabar linear untuk persiapan SNBT',
    subject: 'Matematika',
    difficulty: 'Sedang',
    duration: '45 menit',
    views: 1250,
    downloads: 340,
    rating: 4.8,
    isBookmarked: false,
    type: 'pdf'
  },
  {
    id: '2',
    title: 'Bahasa Indonesia - Teks Argumentasi',
    description: 'Panduan lengkap memahami dan menganalisis teks argumentasi',
    subject: 'Bahasa Indonesia',
    difficulty: 'Mudah',
    duration: '30 menit',
    views: 980,
    downloads: 220,
    rating: 4.6,
    isBookmarked: true,
    type: 'video'
  },
  {
    id: '3',
    title: 'Fisika - Mekanika Newton',
    description: 'Konsep dasar hukum Newton dan aplikasinya dalam soal SNBT',
    subject: 'Fisika',
    difficulty: 'Sulit',
    duration: '60 menit',
    views: 750,
    downloads: 180,
    rating: 4.9,
    isBookmarked: false,
    type: 'interactive'
  },
  {
    id: '4',
    title: 'Kimia - Stoikiometri',
    description: 'Perhitungan kimia dan konsep mol dalam reaksi kimia',
    subject: 'Kimia',
    difficulty: 'Sedang',
    duration: '40 menit',
    views: 650,
    downloads: 150,
    rating: 4.7,
    isBookmarked: true,
    type: 'pdf'
  },
  {
    id: '5',
    title: 'Biologi - Sistem Pencernaan',
    description: 'Anatomi dan fisiologi sistem pencernaan manusia',
    subject: 'Biologi',
    difficulty: 'Mudah',
    duration: '35 menit',
    views: 890,
    downloads: 200,
    rating: 4.5,
    isBookmarked: false,
    type: 'video'
  },
  {
    id: '6',
    title: 'Sejarah - Kemerdekaan Indonesia',
    description: 'Peristiwa penting menjelang dan sesudah kemerdekaan Indonesia',
    subject: 'Sejarah',
    difficulty: 'Sedang',
    duration: '50 menit',
    views: 720,
    downloads: 160,
    rating: 4.4,
    isBookmarked: false,
    type: 'pdf'
  }
];

const MateriBelajar: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const subjects = ['Matematika', 'Bahasa Indonesia', 'Fisika', 'Kimia', 'Biologi', 'Sejarah'];
  const difficulties = ['Mudah', 'Sedang', 'Sulit'];
  const types = ['pdf', 'video', 'interactive'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || material.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'bookmarked' && material.isBookmarked) ||
                      (activeTab === 'popular' && material.views > 800);
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesType && matchesTab;
  });

  const toggleBookmark = (materialId: string) => {
    setMaterials(prev => prev.map(material => 
      material.id === materialId 
        ? { ...material, isBookmarked: !material.isBookmarked }
        : material
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-100 text-green-800';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800';
      case 'Sulit': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Materi Belajar</h1>
          <p className="text-gray-600">Koleksi lengkap materi pembelajaran untuk persiapan SNBT</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Materi</p>
                  <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {materials.reduce((sum, m) => sum + m.views, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {materials.reduce((sum, m) => sum + m.downloads, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bookmark className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bookmarked</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {materials.filter(m => m.isBookmarked).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari materi pembelajaran..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Mata Pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Tingkat Kesulitan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tingkat</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Tipe Materi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="interactive">Interaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua Materi</TabsTrigger>
            <TabsTrigger value="bookmarked">Tersimpan</TabsTrigger>
            <TabsTrigger value="popular">Populer</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getTypeIcon(material.type)}</span>
                      <Badge variant="outline">{material.subject}</Badge>
                      <Badge className={getDifficultyColor(material.difficulty)}>
                        {material.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{material.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {material.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(material.id)}
                    className={material.isBookmarked ? 'text-orange-600' : 'text-gray-400'}
                  >
                    <Bookmark className={`h-4 w-4 ${material.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{material.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{material.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{material.downloads}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{material.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada materi ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter pencarian atau kata kunci Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriBelajar;