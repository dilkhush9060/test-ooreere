import {PageWrapper, SubHeading, Text, Title} from "./Typography";

export default function PrivacyPolicy() {
  return (
    <PageWrapper className="mb-14 mt-8 text-black">
      <Title>Privacy Policy</Title>
      <div className="mt-[6px] text-[#454E58]">
        <SubHeading>Information We Collect</SubHeading>
        <Text>
          - <b>Personal Information</b>: Name, email, phone number, payment
          details. <br />- <b>Non-Personal Information</b>: Browser type, IP
          address, usage data. <br />- <b>Content Information</b>: Videos and
          media uploaded for advertisements.
        </Text>
        <br />
        <SubHeading>Use of Information</SubHeading>
        <Text>
          - To provide and improve our services. <br />
          - To communicate updates and notifications. <br />- For compliance
          with legal requirements.
        </Text>
        <br />
        <SubHeading>Data Sharing</SubHeading>
        <Text>
          - Data may be shared with Razorpay for payment processing. <br />
          - Legal authorities if required by law. <br />- Third-party service
          providers assisting in website functionality.
        </Text>
        <br />
        <SubHeading>Data Security</SubHeading>
        <Text>
          - We use encryption and secure servers to protect user data. <br />-
          Regular audits ensure data safety.
        </Text>
        <br />
        <SubHeading>Cookies and Tracking</SubHeading>
        <Text>
          - Cookies are used for enhancing user experience and performance
          analysis. <br />- Users can manage cookies via browser settings.
        </Text>
        <br />
        <SubHeading>User Rights</SubHeading>
        <Text>
          - Access, correct, or delete personal data. <br />- Opt-out of
          promotional communications.
        </Text>
        <br />
        <SubHeading>Data Retention</SubHeading>
        <Text>
          Personal data is retained as long as necessary for service delivery or
          legal obligations.
        </Text>
        <br />
        <SubHeading>Changes to Privacy Policy</SubHeading>
        <Text>
          Updates will be communicated via email or prominently posted on the
          website.
        </Text>
      </div>
    </PageWrapper>
  );
}
