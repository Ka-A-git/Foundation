import React, { useCallback, useEffect } from 'react';
import { Form } from 'formik';
import qs from 'qs';
import jsonp from 'jsonp';

import Page from 'components/Page';
import Body from 'components/base/Body';
import Heading from 'components/base/Heading';
import Box from 'components/base/Box';
import TextField from 'components/forms/fields/TextField';
import Grid from 'components/base/Grid';
import Label from 'components/forms/Label';
import Image from 'components/base/Image';
import FormikSubmitButton from 'components/forms/FormikSubmitButton';
import FormikForm from 'components/forms/FormikForm';

import { PageColorMode } from 'types/page';
import { PageType } from 'types/page';

import { NewsletterSchema } from 'schemas/newsletter';

import { WEEKLY_FORM_URL } from 'lib/constants';

interface FormValues {
  email: string;
  weeklyNewsletter: boolean;
  collectorNewsletter: boolean;
}

export default function Newsletters(): JSX.Element {
  const handleSubmit = useCallback(
    async (values: FormValues, { setErrors }) => {
      const formData = qs.stringify({
        EMAIL: values.email,
      });

      const formParams = {
        param: 'c',
      };

      const weeklyUrl = `${WEEKLY_FORM_URL}&${formData}`;

      await new Promise((resolve, reject) => {
        jsonp(weeklyUrl, formParams, (error, data) => {
          const isError = error || !data;
          if (isError) {
            setErrors({
              email: 'There was an error, please try again.',
            });
            reject('error');
          } else {
            resolve('success');
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    document.body.classList.add('blue-background');
    return () => {
      document.body.classList.remove('blue-background');
    };
  }, []);

  return (
    <Page
      title="Newsletters"
      type={PageType.maximal}
      headerMode={PageColorMode.dark}
      image="https://foundation.app/newsletters-opengraph.jpg"
    >
      <Body css={{ fontFamily: '$body', paddingX: '$3' }}>
        <Heading
          css={{ textAlign: 'center', marginY: '$11', position: 'relative' }}
        >
          <Image
            src="/images/svg-text/newsletters.svg"
            alt="newsletters"
            css={{ maxWidth: '90%' }}
          />
          <Image
            src="/images/at.webp"
            alt="@"
            css={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
            }}
          />
        </Heading>
        <Box
          css={{
            marginY: '$8',
            marginX: 'auto',
            backgroundColor: '$white100',
            borderRadius: '$3',
            boxShadow: '$0',
            maxWidth: 720,

            '@bp1': {
              marginY: '$11',
            },
          }}
        >
          <FormikForm<FormValues>
            initialValues={{
              email: '',
              weeklyNewsletter: false,
              collectorNewsletter: false,
            }}
            validationSchema={NewsletterSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid
                css={{
                  alignItems: 'center',
                  paddingX: '$5',
                  paddingY: '$7',
                  gridRowGap: '$5',
                  '@bp1': {
                    gridTemplateColumns: '1fr 1fr',
                    padding: '$8',
                  },
                }}
              >
                <Label>Your email address</Label>
                <TextField name="email" placeholder="Email" type="email" />
              </Grid>

              <Box
                css={{
                  paddingX: '$5',
                  paddingBottom: '$4',
                  '@bp1': {
                    paddingX: '$8',
                    paddingBottom: '$8',
                  },
                }}
              >
                <FormikSubmitButton
                  label="Subscribe"
                  submittingLabel="Saving…"
                  submittedLabel="Subscribed!"
                />
              </Box>
            </Form>
          </FormikForm>
        </Box>
      </Body>
    </Page>
  );
}
