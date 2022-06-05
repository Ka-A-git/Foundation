import * as Yup from 'yup';

export const NewsletterSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .email('This doesn’t look like a valid email')
    .required('Email is required'),
  weeklyNewsletter: Yup.boolean(),
  collectorNewsletter: Yup.boolean(),
  newsletters: Yup.boolean().when(['weeklyNewsletter', 'collectorNewsletter'], {
    is: (weeklyNewsletter, collectorNewsletter) =>
      !weeklyNewsletter && !collectorNewsletter,
    then: Yup.boolean().required('At least one checkbox is to be selected'),
  }),
});
