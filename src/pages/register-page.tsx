import RegisterForm from "@/forms/register-form";
 
export default function RegisterPage() {
  return (
    <div className="flex py-20 my-8 items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md">
        <div className="bg-background border rounded-xl shadow-sm p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>
 
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}