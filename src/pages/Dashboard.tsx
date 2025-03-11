import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Activity, Plus, Search, Settings, Rocket } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  url: string;
  status: "deployed" | "pending" | "failed";
  type: "static" | "serverless" | "hybrid";
  lastDeployed: Date;
  environment: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Portfolio Website",
    url: "https://portfolio.example.com",
    status: "deployed",
    type: "static",
    lastDeployed: new Date(),
    environment: "Production",
  },
  {
    id: "2",
    name: "E-commerce API",
    url: "https://api.shop.example.com",
    status: "pending",
    type: "serverless",
    lastDeployed: new Date(),
    environment: "Staging",
  },
  {
    id: "3",
    name: "Blog CMS",
    url: "https://cms.example.com",
    status: "failed",
    type: "hybrid",
    lastDeployed: new Date(),
    environment: "Development",
  },
];

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState<
    "all" | "static" | "serverless" | "hybrid"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState<Project[]>(mockProjects);
  const navigate = useNavigate();

  const filteredProjects = projects.filter((project) => {
    const matchesType = selectedType === "all" || project.type === selectedType;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <div className="border-b border-border/20 shadow-sm" />

      <main className="p-4 sm:p-6">
        <AIAssistant />

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Project Overview
            </h2>
            <p className="text-muted-foreground text-sm">
              {filteredProjects.length} active deployments
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:max-w-[300px]">
              <Input
                placeholder="Search projects..."
                className="w-full pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-transparent hover:text-inherit focus-visible:ring-0 cursor-pointer"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>

            <Tabs
              defaultValue="all"
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as any)}
            >
              <TabsList className="flex">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="static">Static</TabsTrigger>
                <TabsTrigger value="serverless">Serverless</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-primary/30 hover:scale-101 transition-all"
              onClick={() => navigate("/project/new")}
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-medium">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1 text-sm">
                    {project.url}
                  </CardDescription>
                </div>
                <div
                  className={`right-5 absolute px-4 mt-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "deployed"
                      ? "bg-green-500/20 text-green-600"
                      : project.status === "pending"
                      ? "bg-amber-500/20 text-amber-600"
                      : "bg-red-500/20 text-red-600"
                  }`}
                >
                  {project.status === "deployed"
                    ? "Deployed"
                    : project.status === "pending"
                    ? "Pending"
                    : "Failed"}
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Deployed</span>
                  <span className="font-medium">
                    {new Date(project.lastDeployed).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Environment</span>
                  <span className="font-mono text-xs font-medium px-2 py-1 bg-muted rounded">
                    {project.environment}
                  </span>
                </div>
              </CardContent>

              <div className="border-t ml-5 mr-5"></div>
              <CardFooter className="mt-auto">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Activity className="h-4 w-4" />
                    Logs
                  </Button>
                  <Button
                    size="sm"
                    className={`gap-2 text-white ${
                      project.status === "deployed"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                    }`}
                    onClick={() => {
                      if (project.status === "deployed") {
                        navigate(`/project/${project.id}`);
                      } else {
                        navigate(`/deploy/${project.id}`);
                      }
                    }}
                  >
                    {project.status === "deployed" ? (
                      <>
                        <Settings className="h-4 w-4" />
                        Manage
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4" />
                        Deploy
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
