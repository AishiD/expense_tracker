import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registration, loading } = useAuthStore();

  const onSubmit = async (data) => {
    await registration(data);
  };

  return (
    <section className="min-h-screen flex flex-col gap-6 items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-xl">
          <span className="text-background bg-primary rounded-full p-1">
            Ex
          </span>
          pence
        </h1>
        <p className="text-sm text-primary/60">An Expense Tracker</p>
      </div>
      <Card className={"w-full max-w-sm"}>
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={!!errors.fullName}
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link to={"/auth/login"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default RegisterPage;
