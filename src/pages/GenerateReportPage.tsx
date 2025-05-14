
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker"; // This is a custom component
import { ArrowLeft, FileText, Download, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const GenerateReportPage: React.FC = () => {
  const [reportName, setReportName] = useState<string>("");
  const [reportType, setReportType] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [includeCharts, setIncludeCharts] = useState<boolean>(true);
  const [includeRawData, setIncludeRawData] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedReport, setGeneratedReport] = useState<boolean>(false);
  
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName || !reportType) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(true);
      toast.success("Report generated successfully!");
    }, 3000);
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Generate Report</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {!generatedReport ? (
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 animate-fade-in-up">
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
                <CardDescription>Configure and generate detailed document analysis reports</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateReport} className="space-y-6">
                  <div className="space-y-4">
                    {/* Report Name */}
                    <div className="space-y-2">
                      <Label htmlFor="reportName" className="text-base">Report Name</Label>
                      <Input 
                        id="reportName" 
                        value={reportName} 
                        onChange={(e) => setReportName(e.target.value)} 
                        placeholder="Q2 Financial Analysis"
                        className="bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                        required
                      />
                    </div>
                    
                    {/* Report Type */}
                    <div className="space-y-2">
                      <Label htmlFor="reportType" className="text-base">Report Type</Label>
                      <Select onValueChange={(value) => setReportType(value)}>
                        <SelectTrigger className="bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Document Summary</SelectItem>
                          <SelectItem value="analytics">Analytics Report</SelectItem>
                          <SelectItem value="comparison">Document Comparison</SelectItem>
                          <SelectItem value="insights">Key Insights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Date Range */}
                    <div className="space-y-2">
                      <Label className="text-base">Time Period</Label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="fromDate" className="text-sm">From Date</Label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <Input 
                              id="fromDate" 
                              type="date"
                              className="pl-10 bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                              onChange={(e) => setDateRange({ ...dateRange, from: e.target.valueAsDate || undefined })}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center mt-2 sm:mt-8">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="toDate" className="text-sm">To Date</Label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <Input 
                              id="toDate" 
                              type="date"
                              className="pl-10 bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary transition-all"
                              onChange={(e) => setDateRange({ ...dateRange, to: e.target.valueAsDate || undefined })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Options */}
                    <div className="space-y-2 pt-4">
                      <Label className="text-base">Report Options</Label>
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeCharts" 
                            checked={includeCharts} 
                            onCheckedChange={(checked) => setIncludeCharts(checked === true)}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label htmlFor="includeCharts" className="text-base cursor-pointer">Include visualizations and charts</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="includeRawData" 
                            checked={includeRawData} 
                            onCheckedChange={(checked) => setIncludeRawData(checked === true)}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label htmlFor="includeRawData" className="text-base cursor-pointer">Include raw data tables</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isGenerating || !reportName || !reportType}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all relative overflow-hidden"
                    >
                      {isGenerating ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Generate Report</span>
                        </>
                      )}
                      
                      {/* Ripple effect */}
                      {isGenerating && (
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <span className="absolute inset-0 rounded-md bg-white/10 animate-pulse"></span>
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="backdrop-blur-sm bg-white/50 border-white/20 animate-fade-in-up">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{reportName}</CardTitle>
                    <CardDescription>
                      {reportType === 'summary' && 'Document Summary Report'}
                      {reportType === 'analytics' && 'Analytics Report'}
                      {reportType === 'comparison' && 'Document Comparison Report'}
                      {reportType === 'insights' && 'Key Insights Report'}
                    </CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center animate-bounce-subtle">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg border border-gray-200 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium text-gray-500">Report Type:</span>
                      <span className="font-medium">
                        {reportType === 'summary' && 'Document Summary'}
                        {reportType === 'analytics' && 'Analytics Report'}
                        {reportType === 'comparison' && 'Document Comparison'}
                        {reportType === 'insights' && 'Key Insights'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium text-gray-500">Time Period:</span>
                      <span className="font-medium">
                        {dateRange.from ? new Date(dateRange.from).toLocaleDateString() : 'All time'} - {dateRange.to ? new Date(dateRange.to).toLocaleDateString() : 'Present'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium text-gray-500">Generated On:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium text-gray-500">Includes Charts:</span>
                      <span className="font-medium">{includeCharts ? 'Yes' : 'No'}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2">
                      <span className="text-sm font-medium text-gray-500">Includes Raw Data:</span>
                      <span className="font-medium">{includeRawData ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-white/50 backdrop-blur-sm border-2 border-green-500/50 text-green-700 hover:bg-green-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Preview Report
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setGeneratedReport(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Create Another Report
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GenerateReportPage;
