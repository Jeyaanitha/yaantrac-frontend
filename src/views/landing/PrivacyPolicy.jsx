import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e6e2e3',
    overflowY: 'scroll',
    height: 'calc(100vh - 64px)'
  },
  content: {
    margin: '20px 30px 10px 30px'
  },
  heading: {
    fontWeight: 'bold !important'
  },
  subHeading: {
    textAlign: 'justify'
  }
});

function PrivacyPolicy() {
  const styles = useStyles();
  const customTheme = useTheme();
  const isSmall = useMediaQuery(customTheme.breakpoints.down('sm'));

  return (
    <Box
      className={styles.root}
      sx={{ padding: { lg: '40px', md: '40px', sm: '40px', xs: 'none' } }}
    >
      <Box className={styles.content}>
        <Typography
          component={isSmall ? 'h2' : 'h1'}
          className='dark-blue'
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 'bold'
          }}
        >
          Privacy Policy
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          PRIVACY POLICY
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          This web site is operated and owned by the DataYaan Solutions Pvt Ltd (DataYaan)
          and will be referred to as "We", "our" and "us" in this Privacy Policy. By using
          this site, you agree to the Privacy Policy of this website, which is set out on
          this website page. The Privacy Policy relates to the collection and use of
          personal and other information you may supply to us through your conduct on this
          web site.
          <br />
          <br /> We respect the privacy of our customer and the privacy of their data. so
          We store personal information for only as long as we have a reason to keep it
          and We only collect information about you if we have a reason to do so–for
          example, to provide our Services , to communicate with you, or to make our
          Services better.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          WHAT DO WE DO WITH YOUR INFORMATION?
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          When you purchase something from our company, as part of the buying and selling
          process, we collect the personal information you give us such as your name,
          address, email address, no of fleets and route. <br />
          <br />
          When you browse our website, we also automatically receive your computer’s
          internet protocol (IP) address in order to provide us with information that
          helps us learn about your browser and operating system. <br />
          <br />
          Email marketing (if applicable): With your permission, we may send you emails
          about our new products and other updates.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          CONSENT
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          How do you get my consent?
          <br />
          <br /> When you provide us with personal information to complete a transaction,
          verify your credit card, place an order, arrange for a delivery or return a
          purchase, we imply that you consent to our collecting it and using it for that
          specific reason only.
          <br />
          <br /> If we ask for your personal information for a secondary reason, like
          marketing, we will either ask you directly for your expressed consent, or
          provide you with an opportunity to say no. <br />
          <br />
          How do I withdraw my consent? <br />
          <br />
          If after you opt-in, you change your mind, you may withdraw your consent for us
          to contact you, for the continued collection, use or disclosure of your
          information, at anytime, by contacting us at contact@datayaan.com
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          DISCLOSURE
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          We may disclose your personal information if we are required by law to do so or
          if you violate our Terms of Service.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          THIRD-PARTY SERVICES
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          In general, the third-party providers used by us will only collect, use and
          disclose your information to the extent necessary to allow them to perform the
          services they provide to us.
          <br />
          <br /> However, certain third-party service providers, such as payment gateways
          and other payment transaction processors, have their own privacy policies in
          respect to the information we are required to provide to them for your
          purchase-related transactions.
          <br />
          <br /> For these providers, we recommend that you read their privacy policies so
          you can understand the manner in which your personal information will be handled
          by these providers.
          <br />
          <br /> In particular, remember that certain providers may be located in or have
          facilities that are located in a different jurisdiction than either you or us.
          So if you elect to proceed with a transaction that involves the services of a
          third-party service provider, then your information may become subject to the
          laws of the jurisdiction(s) in which that service provider or its facilities are
          located.
          <br />
          <br /> As an example, if you are located in Canada and your transaction is
          processed by a payment gateway located in the United States, then your personal
          information used in completing that transaction may be subject to disclosure
          under United States legislation, including the Patriot Act. <br />
          <br />
          Once you leave our website or are redirected to a third-party website or
          application, you are no longer governed by this Privacy Policy or our website’s
          Terms of Service.
          <br />
          <br /> Links When you click on links on our website, they may direct you away
          from our site. We are not responsible for the privacy practices of other sites
          and encourage you to read their privacy statements.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          SECURITY
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          To protect your personal information, we take reasonable precautions and follow
          industry best practices to make sure it is not inappropriately lost, misused,
          accessed, disclosed, altered or destroyed. <br />
          <br />
          If you provide us with your credit card information, the information is
          encrypted using secure socket layer technology (SSL) and stored with a AES-256
          encryption. Although no method of transmission over the Internet or electronic
          storage is 100% secure, we follow all PCI-DSS requirements and implement
          additional generally accepted industry standards.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          AGE OF CONSENT
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          By using this site, you represent that you are at least the age of majority in
          your state or province of residence, or that you are the age of majority in your
          state or province of residence and you have given us your consent to allow any
          of your minor dependents to use this site.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          CHANGES TO THIS PRIVACY POLICY
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          We reserve the right to modify this privacy policy at any time, so please review
          it frequently. Changes and clarifications will take effect immediately upon
          their posting on the website. If we make material changes to this policy, we
          will notify you here that it has been updated, so that you are aware of what
          information we collect, how we use it, and under what circumstances, if any, we
          use and/or disclose it.
          <br />
          <br /> If our company is acquired or merged with a company, your information may
          be transferred to the new owners so that we may continue to sell products to
          you.
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          QUESTIONS AND CONTACT INFORMATION
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          If you would like to: access, correct, amend or delete any personal information
          we have about you, register a complaint, or simply want more information contact
          our Privacy Compliance Officer at <b>contact@datayaan.com</b>
          <br />
          <br />
        </Typography>
        <Typography component='h4' className={`${styles.heading} dark-blue`}>
          Credit & Contact Information
        </Typography>
        <Typography component='h5' className={`${styles.subHeading} dark-blue`}>
          <br />
          This privacy policy was created at termsandconditionstemplate.com. If you have
          any questions about this Privacy Policy, please contact us via{' '}
          <a href='mailto: contact@datayaan.com'>email</a> or{' '}
          <a href='tel:+914422271400'>phone</a>.
          <br />
          <br />
        </Typography>
      </Box>
    </Box>
  );
}

export default PrivacyPolicy;
