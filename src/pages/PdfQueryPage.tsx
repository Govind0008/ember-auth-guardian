
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileSearch, ArrowLeft, Send, Upload, File, X } from "lucide-react";
import { Link } from "react-router-dom";

const PdfQueryPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Reset result when new file is selected
      setResult(null);
    }
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !selectedFile) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult(`Based on the analysis of "${selectedFile.name}", here's the answer to your query "${query}":\n\nThe document contains information about financial projections for Q2 2024, showing a 15% increase in revenue compared to Q1. Key factors include new product launches and market expansion into European territories. Risk factors include potential supply chain disruptions and currency exchange fluctuations.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with glassmorphism */}
      <header className="bg-card/40 backdrop-blur-md border-b py-4 shadow-md sticky top-0 z-50">
        <div className="container flex items-center">
          <Link to="/user/dashboard" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <FileSearch className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">PDF Query</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* File Upload Section */}
          <Card className="backdrop-blur-sm bg-white/30 border-white/20 shadow-lg animate-fade-in-up">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Upload a PDF file to analyze and query</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${selectedFile ? 'bg-blue-100/50 border-blue-400' : 'border-gray-200 hover:border-primary'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 animate-bounce-subtle">
                      <File className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="font-semibold text-blue-700">{selectedFile.name}</p>
                    <p className="text-sm text-blue-700/70 mb-4">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="flex items-center gap-1 bg-white/70"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 animate-pulse-subtle">
                      <Upload className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PDF (max. 10MB)
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf"
                />
              </div>
            </CardContent>
          </Card>

          {/* Query Form */}
          <Card className="backdrop-blur-sm bg-white/30 border-white/20 shadow-lg animate-fade-in-up [animation-delay:100ms]">
            <CardHeader>
              <CardTitle>Ask Questions</CardTitle>
              <CardDescription>Query your document with natural language</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Example: 'What are the key financial projections for Q2?'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[120px] bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                    disabled={!selectedFile || isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all"
                  disabled={!query.trim() || !selectedFile || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      <span>Submit Query</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Result Section - Only show when there's a result */}
        {result && (
          <Card className="mt-8 backdrop-blur-sm bg-white/40 border-white/20 shadow-xl animate-fade-in-up">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>AI-generated answer based on your document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white/50 rounded-lg p-6 whitespace-pre-wrap">
                {result}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">
                Export Result
              </Button>
              <Button variant="default" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                Save to History
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PdfQueryPage;
