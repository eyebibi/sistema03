"use client";

import {
  sendContactEmail,
  SendContactEmailResponse,
} from "@/app/actions/sendContactEmail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
      toast.success("Sucesso", {
        description:
          "O e-mail foi enviado! Você deve receber uma resposta em seu e-mail em breve.",
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

          <h1 className="text-center font-bold text-3xl my-4">Contato</h1>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Assunto</Label>
          <Select name="subject" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um assunto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feature_request">
                Solicitação de novo recurso
              </SelectItem>
              <SelectItem value="question">Pergunta geral</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="refund">Reembolso</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          name="message"
          id="message"
          placeholder="Sua mensagem aqui..."
          required
          className="min-h-[150px] resize-none"
        />
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <LoadingSpinner /> : <Send className="ml-2 h-4 w-4" />}
        Enviar mensagem
      </Button>
    </form>
  );
}
