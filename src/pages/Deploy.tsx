import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DeployConfig() {
  const { projectName: urlProjectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const projectName = urlProjectName || "Project";

  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([]);
  const [buildCommand, setBuildCommand] = useState("");
  const [runCommand, setRunCommand] = useState("");
  const [installCommand, setInstallCommand] = useState("");
  const [notifyOnDeploy, setNotifyOnDeploy] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    const newEnvVars = [...envVars];
    newEnvVars.splice(index, 1);
    setEnvVars(newEnvVars);
  };

  const updateEnvVar = (index: number, key: string, value: string) => {
    const newEnvVars = [...envVars];
    newEnvVars[index] = { key, value };
    setEnvVars(newEnvVars);
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    // TODO: Implement deployment logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="rounded-xl shadow-sm border p-6 sm:p-8">
            <CardHeader>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Deploy {projectName}
              </h1>
              <p className="text-muted-foreground">
                Configure your deployment settings below.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeploy} className="space-y-8">
                <div className="space-y-4">
                  <Label>Environment Variables</Label>
                  <div className="space-y-2">
                    {envVars.map((envVar, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Key"
                          value={envVar.key}
                          onChange={(e) =>
                            updateEnvVar(index, e.target.value, envVar.value)
                          }
                        />
                        <Input
                          placeholder="Value"
                          value={envVar.value}
                          type="password"
                          onChange={(e) =>
                            updateEnvVar(index, envVar.key, e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeEnvVar(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addEnvVar}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Environment Variable
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Build Command</Label>
                  <Input
                    placeholder="npm run build"
                    value={buildCommand}
                    onChange={(e) => setBuildCommand(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Run Command</Label>
                  <Input
                    placeholder="npm run dev"
                    value={runCommand}
                    onChange={(e) => setRunCommand(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Install Command</Label>
                  <Input
                    placeholder="npm install"
                    value={installCommand}
                    onChange={(e) => setInstallCommand(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Notification Settings</Label>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={notifyOnDeploy}
                      onCheckedChange={(checked) => setNotifyOnDeploy(checked)}
                    />
                    <span>Notify me on deployment completion</span>
                  </div>
                  {notifyOnDeploy && (
                    <Input
                      placeholder="Enter your email"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                    />
                  )}
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h2 className="font-semibold mb-2">Deployment Summary</h2>
                  <p className="text-sm text-muted-foreground">
                    <strong>Build:</strong> {buildCommand || "npm run build"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Run:</strong> {runCommand || "npm run dev"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Install:</strong> {installCommand || "npm install"}
                  </p>
                  {envVars.length > 0 && (
                    <div className="mt-2">
                      <strong>Env Variables:</strong>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {envVars.map((env, index) => (
                          <li key={index}>
                            {env.key}: {"*".repeat(env.value.length)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {notifyOnDeploy && notificationEmail && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Notify Email:</strong> {notificationEmail}
                    </p>
                  )}
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-4 sm:justify-end pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    disabled={isDeploying}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isDeploying}
                  >
                    {isDeploying ? "Deploying..." : "Deploy"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
