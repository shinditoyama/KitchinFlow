"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";

import { cn } from "@repo/ui/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Spinner } from "@repo/ui/components/spinner";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>
            Insira seu e-mail/senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            {state?.error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded text-sm text-red-700 animate-pulse">
                {state.error}
              </div>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isPending}
                  placeholder="m@example.com"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  {/*<a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>*/}
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isPending}
                />
              </Field>
              <Field>
                <Button type="submit">
                  {isPending ? <Spinner /> : "Login"}
                </Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  <span>Não tem uma conta? </span>
                  <Link href="/signup" className="underline underline-offset-4">
                    Cadastre-se
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
