import LoginForm from "@/forms/login-form";
 
export default function LoginPage() {
  return (
    <div className="flex py-20 my-8 items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md">
        <div className="bg-background border rounded-xl shadow-sm p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
 
          <LoginForm />
        </div>
      </div>
    </div>
  );
}