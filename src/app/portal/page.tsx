import { getSession } from "@/modules/auth/services/auth-service";
import Link from "next/link";

export default async function PortalPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground">
          Wellcome!
        </h1>
        <p className="text-muted-foreground text-lg">
          We are happy to have you here.
          <pre className="text-left">{JSON.stringify(session, null, 2)}</pre>
        </p>
        <Link
          href="/api/logout"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Log out
        </Link>
      </div>
    </div>
  );
}
