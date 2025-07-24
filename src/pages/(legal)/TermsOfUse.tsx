import {PageWrapper, SubHeading, Text, Title} from "./Typography";

export default function TermsOfUse() {
  return (
    <PageWrapper className="mb-14 mt-8 text-black">
      <Title>Content Guidelines for Advertisements</Title>
      <div className="mt-[6px] text-[#454E58]">
        <Text>
          At OOROOREE Digital, we are committed to maintaining a safe,
          respectful, and effective advertising platform. All users uploading
          content for advertisement must adhere to the following guidelines:
        </Text>
        <br />
        <SubHeading>Prohibited Content</SubHeading>
        <Text>
          - No Pornographic Content: Advertisements must not contain explicit,
          sexual, or obscene material. <br />
          - No Illegal Content: Videos must comply with all applicable laws and
          must not promote illegal activities. <br />
          - No Hate Speech: Content that promotes hatred, discrimination, or
          violence based on race, religion, gender, or other factors is strictly
          prohibited. <br />- No Misleading Information: Advertisements must not
          contain false or deceptive claims.
        </Text>
        <br />
        <SubHeading>Video Specifications</SubHeading>
        <Text>
          - <strong>Duration:</strong> Each video should not exceed 15 seconds.{" "}
          <br />- <strong>File Size:</strong> Maximum file size allowed is 50MB.{" "}
          <br />- <strong>Resolution:</strong> Videos must be of high quality
          with clear visuals. <br />- <strong>Text Visibility:</strong> Any text
          in the video must be easily readable on LED displays.
        </Text>
        <br />
        <SubHeading>Approval Process</SubHeading>
        <Text>
          - All content will be reviewed by our team before being approved for
          streaming. <br />- Any content that violates these guidelines will be
          rejected, and the user will be notified with a reason.
        </Text>
        <br />
        <SubHeading>Rejection and Re-Upload</SubHeading>
        <Text>
          - Users may re-upload a revised video if the initial submission is
          rejected. <br />- Ensure the revised video complies with these
          guidelines before resubmitting.
        </Text>
        <br />
        <SubHeading>Consequences of Violation</SubHeading>
        <Text>
          - Violation of these guidelines may result in suspension of your
          account or removal of content. <br />- Repeated violations may lead to
          permanent account termination.
        </Text>
        <br />
        <Text>
          By uploading content, you confirm that you have read, understood, and
          agreed to these Content Guidelines. Let’s work together to maintain a
          safe and engaging advertising platform.
        </Text>
      </div>
    </PageWrapper>
  );
}
