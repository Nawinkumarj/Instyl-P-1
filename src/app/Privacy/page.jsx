'use client'


import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | INSTYL HAIR N BRIDAL STUDIO</title>
        <meta name="description" content="Privacy Policy for INSTYL HAIR N BRIDAL STUDIO" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: September 11, 2025</p>
        <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information...</p>
        {/* Continue converting each <p>, <ul>, <li>, <h2>, etc. similarly */}
        
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul>
          <li>
            <p>By email: <a href="mailto:bindu@instylhairnbridalstudio.com">bindu@instylhairnbridalstudio.com</a></p>
          </li>
          <li>
            <p>By visiting this page on our website: <a href="https://instylhairnbridalstudio.com/Contact" target="_blank" rel="noopener noreferrer">Contact Us</a></p>
          </li>
          <li>
            <p>By phone number: <a href="tel:+918056168713">+91 8056168713</a></p>
          </li>
        </ul>
      </main>
    </>
  );
}