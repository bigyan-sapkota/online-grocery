import LoginForm from "@/forms/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted/40 mt-8 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-background space-y-6 rounded-xl border p-8 shadow-sm">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to sign in to your account
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
