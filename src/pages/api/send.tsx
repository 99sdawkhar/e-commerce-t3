import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import emailHtml, { emailText } from "./trpc/email";

const resend = new Resend(process.env.RESEND_API_KEY);

const SendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, code } = req.body;
  const { data, error } = await resend.emails.send({
    from: "E-commerce <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your account",
    text: emailText({ email, code }),
    react: emailHtml({ email, code }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};

export default SendEmail;
