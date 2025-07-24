import {Link} from "react-router";
import {
  ItalicText,
  LinkText,
  PageWrapper,
  SubHeading,
  Text,
  Title,
} from "./Typography";

export default function TermsAndServices() {
  return (
    <PageWrapper className="mb-14 mt-8 text-black">
      <Title>Terms & Conditions</Title>
      <div className="mt-[6px] text-[#454E58]">
        <SubHeading>Acceptance of Terms</SubHeading>
        <Text>
          By accessing or using our website and services, you agree to these
          Terms & Conditions. If you do not agree, please refrain from using our
          platform.
        </Text>
        <br />

        <SubHeading>Eligibility</SubHeading>
        <Text>
          - You must be at least 18 years old to use our services. <br />- All
          registration information provided must be accurate and up-to-date.
        </Text>
        <br />

        <SubHeading>Payment Terms</SubHeading>
        <Text>
          - All payments are processed securely via Razorpay. <br />
          - Subscription plans (Basic, Pro, Elite) auto-renew unless canceled
          before the end of the billing cycle. <br />- Refunds are governed by
          our{" "}
          <Link to="/refund-policy">
            <LinkText>Refund Policy</LinkText>
          </Link>
          .
        </Text>
        <br />

        <SubHeading>Subscription and Content Usage</SubHeading>
        <Text>
          - Active subscriptions allow users to upload, manage, and display
          content on OOROOREE’s LED displays. <br />- Content must comply with
          our content guidelines and be approved before streaming.
        </Text>
        <br />

        <SubHeading>Content Ownership and Responsibility</SubHeading>
        <Text>
          - Users retain ownership of uploaded content but grant us a license to
          use it for service delivery. <br />- Users are responsible for
          ensuring their content complies with legal requirements.
        </Text>
        <br />

        <SubHeading>Platform Modifications</SubHeading>
        <Text>
          OOROOREE reserves the right to modify, suspend, or discontinue any
          service without prior notice.
        </Text>
        <br />

        <SubHeading>Service Availability</SubHeading>
        <Text>
          While we strive to maintain uptime, interruptions may occur due to
          maintenance or unforeseen events.
        </Text>
        <br />

        <SubHeading>Limitation of Liability</SubHeading>
        <Text>
          OOROOREE Digital is not liable for: <br />
          - Losses due to service interruptions. <br />
          - Unauthorized account access. <br />- Non-compliance with our
          guidelines.
        </Text>
        <br />

        <SubHeading>Termination of Services</SubHeading>
        <Text>
          - Accounts violating these terms may be terminated. <br />- Users may
          terminate their accounts by contacting us.
        </Text>
        <br />

        <SubHeading>Governing Law</SubHeading>
        <Text>
          These terms are governed by the laws of India. Disputes will be
          resolved in courts located in Gwalior, Madhya Pradesh.
        </Text>
        <br />

        <ItalicText>
          By using our website, you acknowledge that you have read, understood,
          and agreed to these Terms & Conditions.
        </ItalicText>
      </div>
    </PageWrapper>
  );
}
