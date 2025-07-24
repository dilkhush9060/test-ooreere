import {PageWrapper, SubHeading, Text, Title} from "./Typography";

export default function Policies() {
  return (
    <PageWrapper className="mb-14 mt-8 min-h-[calc(100vh-500px)] text-black">
      <Title>Refund Policy</Title>
      <div className="mt-[6px] text-[#454E58]">
        <SubHeading>General Policy</SubHeading>
        <Text>
          All payments for subscription plans are final and non-refundable.
          Refunds are not provided for unused subscription periods or
          cancellations.
        </Text>
        <br />
        <SubHeading>Exceptions</SubHeading>
        <Text>
          Refunds may be issued in the following cases: <br />- Double payment
          for the same subscription due to a system error. <br />- Non-delivery
          of services verified by OOROOREE Digital and Razorpay.
        </Text>
        <br />
        <SubHeading>Refund Processing</SubHeading>
        <Text>
          - Normal refunds take 5-7 business days. <br />- Instant refunds are
          processed immediately, subject to Razorpay’s terms.
        </Text>
        <br />
        <SubHeading>Disputes and Chargebacks</SubHeading>
        <Text>
          - Users initiating chargebacks for valid transactions will face
          account suspension. <br />- OOROOREE reserves the right to take legal
          action to recover dues.
        </Text>
        <br />
        <SubHeading>Policy Changes</SubHeading>
        <Text>
          OOROOREE Digital reserves the right to modify this policy at any time.
        </Text>
        <br />
      </div>

      <br />
    </PageWrapper>
  );
}
