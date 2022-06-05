import Paragraph from 'components/base/Paragraph';
import TextLink from 'components/base/TextLink';

import { ReportReason } from 'types/Report';

export const formFieldsData = [
  {
    type: ReportReason.ViolentContent,
    title: 'Violent or Graphic Content',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of Violent or Graphic Content.{' '}
        <TextLink
          target="_blank"
          css={{ display: 'inline' }}
          href="https://help.foundation.app/hc/en-us/articles/5658535137563-Violent-and-Graphic-Content-Policy"
        >
          Learn more
        </TextLink>
      </Paragraph>
    ),
  },
  {
    type: ReportReason.HatefulContent,
    title: 'Hateful or Abusive Content',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of Hateful or Abusive Content.{' '}
        <TextLink
          target="_blank"
          css={{ display: 'inline' }}
          href="https://help.foundation.app/hc/en-us/articles/5658554731931-Hateful-and-Abusive-Content-Policy"
        >
          Learn more
        </TextLink>
      </Paragraph>
    ),
  },
  {
    type: ReportReason.SexualContent,
    title: 'Graphic Sexual Content',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of Graphic Sexual Content.{' '}
        <TextLink
          target="_blank"
          css={{ display: 'inline' }}
          href="https://help.foundation.app/hc/en-us/articles/5658333349403-Adult-Content-Policy"
        >
          Learn more
        </TextLink>
      </Paragraph>
    ),
  },
  {
    type: ReportReason.SuspiciousActivity,
    title: 'Other Suspicious Activity',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of suspicious activity.
      </Paragraph>
    ),
  },
  {
    type: ReportReason.StolenArtwork,
    title: 'Counterfeit Artwork',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of plagiarism or counterfeit
        artwork.{' '}
        <TextLink
          target="_blank"
          css={{ display: 'inline' }}
          href="https://help.foundation.app/hc/en-us/articles/5658247759771-Counterfeit-Remixes-Policy"
        >
          Learn more
        </TextLink>
      </Paragraph>
    ),

    originalArtworkField: true,
    originalFieldLabel: 'URL of original artwork',
  },
  {
    type: ReportReason.UserMisrepresentation,
    title: 'User Misrepresentation',
    description: () => (
      <Paragraph>
        Foundation does not tolerate any form of User Misrepresentation.{' '}
        <TextLink
          target="_blank"
          css={{ display: 'inline' }}
          href="https://help.foundation.app/hc/en-us/articles/5658681073819-Misleading-and-Deceptive-Identities-Policy"
        >
          Learn more
        </TextLink>
      </Paragraph>
    ),

    originalArtworkField: true,
    originalFieldLabel: 'URL of the Impersonated Artist/ Person',
  },
  {
    type: ReportReason.IP,
    title: 'Intellectual Property',
    description: () => (
      <Paragraph>
        Foundation takes claims of intellectual property infringement seriously.
        For more information and instructions on how to report infringement,
        please visit our{' '}
        <TextLink
          css={{ display: 'inline' }}
          target="_blank"
          href="https://help.foundation.app/hc/en-us/sections/5659130240411-Intellectual-Property"
        >
          Intellectual Property Policy
        </TextLink>
        .
      </Paragraph>
    ),
    noForm: true,
  },
];
