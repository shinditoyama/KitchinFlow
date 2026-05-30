import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-black text-primary animate-bounce">404</h1>

        <h2 className="text-2xl font-bold mt-4 md:text-3xl">
          Página não encontrada
        </h2>

        <p className="text-muted-foreground mt-2">
          Desculpe, não conseguimos encontrar a página que você está procurando.
          Verifique o endereço digitado ou retorne ao painel principal.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
