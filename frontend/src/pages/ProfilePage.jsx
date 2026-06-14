import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <section className="min-h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4 gap-6">
      <Card className="w-full max-w-md">
        <CardHeader className={"flex flex-row gap-4 items-center"}>
          <Avatar className={"size-15"}>
            <AvatarFallback className={"text-lg"}>
              {String(user.fullName).split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user?.fullName}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{user?._id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className={"w-full cursor-pointer"} onClick={() => handleLogout()}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
