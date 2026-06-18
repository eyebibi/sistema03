import { validatePasswordResetId } from "@/app/actions/validatePasswordResetId";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";
import { cn } from "@/lib/utils";

export default async function ResetPasswordWithIdPage({
  params,
}: {
  params: Promise<{ resetPasswordId: string }>;
}) {
  const { resetPasswordId } = await params;

  const { error } = await validatePasswordResetId(resetPasswordId);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          "bg-background",
        )}
      />

      <div className="w-full max-w-md space-y-8 p-8">
        <ResetPasswordForm error={error} passwordResetId={resetPasswordId} />
      </div>
    </div>
  );
}
