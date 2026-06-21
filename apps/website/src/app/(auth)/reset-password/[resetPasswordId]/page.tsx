import { validatePasswordResetId } from "@/app/actions/validatePasswordResetId";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";

export default async function ResetPasswordWithIdPage({
  params,
}: {
  params: Promise<{ resetPasswordId: string }>;
}) {
  const { resetPasswordId } = await params;

  const { error } = await validatePasswordResetId(resetPasswordId);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <ResetPasswordForm error={error} passwordResetId={resetPasswordId} />
      </div>
    </div>
  );
}
