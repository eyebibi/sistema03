"use client";

import {
  sendContactEmail,
  SendContactEmailResponse,
} from "@/app/actions/sendContactEmail";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const session = useSession();
  const [customerEmail, setCustomerEmail] = useState(
    session.status === "authenticated" && session.data.user.email,
  );

  const [sendEmailResponse, sendEmailAction, isPending] = useActionState(
    sendContactEmail.bind(null, customerEmail),
    {} as SendContactEmailResponse,
  );

  useEffect(() => {
    if (session.status == "authenticated") {
      setCustomerEmail(session.data.user.email);
    }
  }, [session]);

  useEffect(() => {
    // there was an error
    if (sendEmailResponse.message) {
      toast.error(sendEmailResponse.message, {
        description: sendEmailResponse.action,
      });

      return;
    }

    // if everything went well
    if (sendEmailResponse.success) {
      toast.success("Success", {
        description:
          "Your message was sent! You should receive a reply shortly.",
      });
    }
  }, [sendEmailResponse]);

  return (
    <form className="space-y-6" action={sendEmailAction}>
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="w-[50px] h-[50px] relative">
            <Image
              src="/logo.png"
              alt="Discly logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h1 className="text-center font-bold text-3xl my-4">Contact</h1>
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="subject">Subject</label>
          <select className="select select-lg w-full" name="subject" required defaultValue="">
            <option value="" disabled>Select a subject</option>
            <option value="feature_request">Feature request</option>
            <option value="question">General question</option>
            <option value="feedback">Feedback</option>
            <option value="refund">Refund</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="label" htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          className="textarea textarea-lg w-full min-h-[200px] resize-none"
          placeholder="Your message here..."
          required
        />
      </div>

      <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
        {isPending ? <span className="loading loading-spinner"></span> : <Send className="ml-2 h-4 w-4" />}
        Send message
      </button>
    </form>
  );
}
