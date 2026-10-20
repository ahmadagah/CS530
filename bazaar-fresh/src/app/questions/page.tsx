import type { Metadata } from "next";
import { IntakeForm } from "@/components/intake/intake-form";
import { IntakeMessage } from "@/components/intake/intake-message";
import { intakeConfigured, loadIntake, roleForKey } from "@/lib/intake";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Questions for the owner",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ k?: string }> };

export default async function QuestionsPage({ searchParams }: Props) {
  const { k } = await searchParams;
  if (!roleForKey(k)) {
    return <IntakeMessage title="This link isn't valid" text="Please open the exact link your developer sent you." />;
  }
  if (!intakeConfigured()) {
    return <IntakeMessage title="Not ready yet" text="The questions aren't set up yet. Please try again later." />;
  }
  return <IntakeForm linkKey={k!} initial={await loadIntake()} />;
}
