import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface VercelInviteUserEmailProps {
  email?: string;
  code?: number;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export const emailText = ({
  email,
  code,
}: VercelInviteUserEmailProps) => {
  return `
  Verify your email address

  Hello ${email},

  Thanks for starting the new E-commerce account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.

  Verification Code\n

  ${code}.
  `;
};

export const emailHtml = ({
  email,
  code,
}: VercelInviteUserEmailProps) => {
  const previewText = `Verify your email address`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section> */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {/* Join <strong>{teamName}</strong> on <strong>Vercel</strong> */}
              <strong>Verify your email address</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {email},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <p>Thanks for starting the new E-commerce account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.</p>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-base mb-4">Verification Code</Text>
              <Text className="text-black text-3xl mb-8">
              <strong>{code}</strong>
              </Text>
              {/* <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Join the team
              </Button> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

emailHtml.PreviewProps = {
  email: "alanturing",
  code: 12345678,
} as VercelInviteUserEmailProps;

export default emailHtml;
