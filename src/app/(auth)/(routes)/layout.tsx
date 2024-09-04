import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full sm:w-[350px] rounded-none sm:rounded-lg px-6 sm:px-4">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignInLayout;
