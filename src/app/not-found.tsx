import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Sorry, we couldn&apos;t find the page you were looking for.
          </p>

          <a
            href="/"
            data-testid="link-back-home"
            className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4"
          >
            Back home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
