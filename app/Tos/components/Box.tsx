"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ContentBoxProps {
  title: string;
  introduction: string;
  content: string;
  linksSections?: {
    heading: string;
    content: string;
  }[];
  linksSections2?: {
    heading: string;
    content: string;
  }[];
  collectionOfInformation?: {
    heading: string;
    content: string;
    points: string[];
  };
  howYourInformationMayBeUsed?: {
    heading: string;
    content: string;
    points: string[];
    single_text: string;
  };
}

const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  introduction,
  content,
  linksSections,
  linksSections2,
  howYourInformationMayBeUsed,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="mb-40">
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          1. Introduction{" "}
        </h1>
        <h3 className="text-[10px] xl:text-[16px] font-semibold mb-2">
          Welcome to Growstack privacy policy.
        </h3>
        <p className="mb-4 text-[8px] xl:text-[14px]">
          At GrowStack.ai, we prioritize your privacy and are committed to
          protecting the personal information you share with us. This privacy
          policy outlines how we collect, use, and safeguard your information,
          as well as your rights regarding your data.
        </p>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">
          2. Links to other websites, apps and services
        </h3>
        <p className="text-[8px] flex flex-col xl:text-[14px]">
          <span>
            Our platform, GrowStack.ai, may contain links to third-party
            websites, applications, or services that are not operated or
            controlled by us. These links are provided for your convenience and
            do not imply any endorsement or affiliation with the third-party
            services.
          </span>
          <br className="" />
          <span>
            {" "}
            Please be aware that once you leave our platform and access
            third-party websites, apps, or services, this privacy policy no
            longer applies. We do not have control over the content, privacy
            practices, or policies of these third-party services. As such, we
            encourage you to review the privacy policies and terms of service of
            any external websites, apps, or services before providing any
            personal information or using their services.{" "}
          </span>
          <br />
          <span>
            GrowStack.ai is not responsible for the data collection, use,
            disclosure, or security practices of third-party websites, apps, or
            services, including any third-party social media platforms or other
            services that may be linked to or integrated with our platform. If
            you have any concerns about these external sites or their practices,
            we recommend contacting the administrators of those websites
            directly.
          </span>{" "}
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          3. Collection of your information
        </h3>

        <h3 className="text-lg font-bold mt-6 text-[#2D3748]">
          (a). Personal Data
        </h3>
        <p className="text-gray-600 mt-2">
          When using our Service, we may collect personally identifiable
          information, including but not limited to:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address (including State, Province, ZIP/Postal code, City)</li>
          <li>Usage Data</li>
        </ul>

        <h3 className="text-lg font-bold mt-6 text-[#2D3748]">
          (b). Usage Data
        </h3>
        <p className="text-gray-600 mt-2">
          Usage Data is collected automatically and may include:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent</li>
          <li>
            Device information (e.g., unique device identifiers, operating
            system)
          </li>
        </ul>
        <p className="text-gray-600 mt-4">
          For mobile devices, we may collect:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>Mobile device type and ID</li>
          <li>Mobile OS and browser type</li>
        </ul>

        <h3 className="text-lg font-bold mt-6 text-[#2D3748]">
          (c). Information from Third-Party Social Media Services
        </h3>
        <p className="text-gray-600 mt-2">
          You may choose to register or log in using third-party social media
          services like:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>Google</li>
          <li>Facebook</li>
          <li>X (Twitter)</li>
        </ul>
        <p className="text-gray-600 mt-4">
          If you do, we may collect information from these accounts such as your
          name, email address, and other details associated with your social
          media profile. You consent to our use of this information in
          accordance with this Privacy Policy.
        </p>
        <h3 className="text-lg font-bold mt-6 text-[#2D3748]">
          (d)Tracking Technologies and Cookies
        </h3>

        <p className="text-gray-600 mt-2">
          We use cookies and similar technologies to enhance your experience.
          These include:
        </p>

        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>
            <b>Cookies:</b> Small files placed on your device. You can manage
            cookie preferences through your browser settings.
          </li>
          <li>
            <b>Flash Cookies:</b> Stored objects used for specific features;
            these are managed separately from browser cookies.
          </li>
          <li>
            <b>Web Beacons:</b> Tiny files to track page visits and email opens.
          </li>
        </ul>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          4. How Your Information May Be Used
        </h3>

        <h3 className="text-lg font-semibold mt-4 text-[#2D3748]">
          (a). Use of Your Personal Data
        </h3>
        <p className="text-gray-600 mt-2">We may use your personal data to:</p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>Provide and maintain our Service</li>
          <li>Manage your account and provide access to features</li>
          <li>Fulfill contracts and process transactions</li>
          <li>Communicate updates, offers, and information</li>
          <li>Respond to your requests</li>
          <li>Deliver targeted advertising</li>
          <li>Evaluate business transactions or transfers</li>
          <li>Improve our Service and user experience</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 text-[#2D3748]">
          (b). Retention of Your Personal Data
        </h3>
        <p className="text-gray-600 mt-2">
          We retain your personal data only as long as necessary for the
          purposes outlined in this Privacy Policy and to comply with legal
          obligations. Usage Data is typically retained for shorter periods.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-[#2D3748]">
          (c). Transfer of Your Personal Data
        </h3>
        <p className="text-gray-600 mt-2">
          Your data may be transferred to and maintained on servers located
          outside your jurisdiction. By using our Service, you consent to this
          transfer and acknowledge that we will take steps to protect your data.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-[#2D3748]">
          (d). Disclosure of Your Personal Data
        </h3>
        <p className="text-gray-600 mt-2">
          We may disclose your personal data:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-700">
          <li>
            <b>In Business Transactions:</b> During mergers or asset sales
          </li>
          <li>
            <b>For Legal Compliance:</b> If required by law or legal requests
          </li>
          <li>
            <b>For Other Legal Reasons:</b> To protect rights, prevent
            wrongdoing, or ensure safety
          </li>
        </ul>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          5. Data Security
        </h3>

        <p className="text-gray-600 mt-2">
          We are committed to ensuring the security of your Personal Data and
          have implemented appropriate physical, technical, and organizational
          measures to protect it from loss, misuse, unauthorized access,
          disclosure, alteration, or destruction. Our security practices are
          designed to meet industry standards and safeguard your information.
        </p>

        <p className="text-gray-600 mt-4">
          Despite our efforts to maintain robust security, no system is
          completely immune to cyber-attacks, malicious activities, or errors.
          We cannot guarantee absolute security of our Services or website. To
          the fullest extent permitted by applicable law, we disclaim liability
          for any unauthorized disclosure of Personal Data.
        </p>

        <p className="text-gray-600 mt-4">
          We continue to take data security seriously and apply reasonable
          measures to protect your personal information. However, please be
          aware that no method of transmission over the Internet or electronic
          storage is 100% secure.
        </p>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          6. Your Rights and Choices
        </h3>

        <p className="text-gray-600 mt-2">
          Depending on your location and applicable privacy laws, you may have
          certain rights regarding your personal information, including:
        </p>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>
            <strong>Access:</strong> Request a copy of the personal information
            we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Request corrections to any inaccurate
            or incomplete personal information.
          </li>
          <li>
            <strong>Deletion:</strong> Request the deletion of your personal
            information, subject to certain legal obligations.
          </li>
          <li>
            <strong>Data Portability:</strong> Request a copy of your data in a
            structured, machine-readable format.
          </li>
          <li>
            <strong>Opt-Out of Marketing Communications:</strong> You can opt
            out of marketing communications at any time by clicking the
            unsubscribe link in our emails. Note that you will still receive
            transaction-related emails and certain non-promotional
            communications about our Services, such as updates to our Terms of
            Service or this Privacy Policy.
          </li>
        </ul>
        <h3 className="text-[24px] font-semibold mt-4 text-[#2D3748]">
          Cookies and Interest-Based Advertising
        </h3>

        <p className="text-gray-600 mt-2">
          We use cookies to personalize content and ads, provide social media
          features, and analyze traffic. Cookies may be placed by us or
          third-party services on our site. We also share information about your
          use of our site with social media, advertising, and analytics
          partners, who may combine it with other information they have about
          you.
        </p>

        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>
            <strong>Cookie Consent:</strong> We can store cookies on your device
            if they are strictly necessary for our site’s operation. For other
            types of cookies, we need your permission. You can change or
            withdraw your consent via the Cookie Declaration on our website.
            Your consent applies to www.growstack.ai.
          </li>
          <li>
            <strong>Managing Cookies:</strong> You can stop or restrict cookies
            by adjusting your browser or device settings. Note that cookie-based
            opt-outs may not be effective on mobile apps, but you can opt out of
            personalized ads on some mobile platforms by following instructions
            for Android, iOS, etc.
          </li>
          <li>
            <strong>Advertising Opt-Outs:</strong> You can opt out of targeted
            advertising through the Network Advertising Initiative, Digital
            Advertising Alliance, European Digital Advertising Alliance, and
            Digital Advertising Alliance of Canada. Note that you need to opt
            out separately on each browser and device.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-4">“Do Not Track” Signals</h3>
        <p className="text-gray-600 mt-2">
          Our Services do not respond to "Do Not Track" (DNT) signals or similar
          mechanisms transmitted by web browsers.
        </p>

        <p className="text-gray-600 mt-4">
          To exercise your rights or for further assistance, please contact us
          at{" "}
          <a
            href="mailto:xxxxxxxxxxxxxxx@growstack.ai"
            className="text-blue-500"
          >
            xxxxxxxxxxxxxx@growstack.ai
          </a>
          .
        </p>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          7. International Data Transfers
        </h3>

        <p className="text-gray-600 mt-2">
          If you access GrowStack.ai from outside the United States, please be
          aware that your information may be transferred to, stored, and
          processed in the United States or other jurisdictions. By using our
          platform, you consent to the transfer of your data to these locations,
          which may have different data protection laws from those in your
          country.
        </p>

        <p className="text-gray-600 mt-4">
          GrowStack.ai operates globally, with headquarters in the U.S., and
          transfers Personal Data to countries such as the USA, Brazil, Costa
          Rica, the Philippines, and Canada. Information processed by us may be
          transferred, processed, and stored worldwide, including in
          jurisdictions with varying levels of data protection.
        </p>

        <p className="text-gray-600 mt-4">
          To ensure the security and confidentiality of your Personal Data, we
          implement appropriate safeguards consistent with applicable laws. When
          transferring data from the European Economic Area (EEA), the United
          Kingdom (UK), and Switzerland, we use the EU-U.S. Data Privacy
          Framework and standard contractual clauses approved by the European
          Commission.
        </p>

        <p className="text-gray-600 mt-4">
          These measures help protect your data in compliance with data transfer
          regulations and maintain adequate safeguards for your information.
        </p>

        <p className="text-gray-600 mt-4">
          For more details on data protection and transfers, refer to the{" "}
          <a href="#" className="text-blue-500 underline">
            “EU-U.S. Data Privacy Framework Notice”
          </a>
          .
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          8. Data Retention and Deletion
        </h3>

        <p className="text-gray-600 mt-2">
          We retain Personal Data for varying periods depending on processing
          purposes, legitimate business needs, and legal requirements.
        </p>

        <p className="text-gray-600 mt-4">
          <strong>Contact Details:</strong> We keep your contact details to
          maintain communication. You can request the deletion of your contact
          details at any time by contacting our privacy team at{" "}
          <a
            href="mailto:legal@growstack.ai"
            className="text-blue-500 underline"
          >
            legal@growstack.ai
          </a>
          . We may retain certain details for legal purposes or proceedings, but
          will not hold onto Personal Data longer than necessary.
        </p>

        <p className="text-gray-600 mt-4">
          <strong>Retention of Data:</strong> We retain Personal Data as long as
          you use our Services, or as required by law. Once the data is no
          longer needed for the purposes outlined in this Privacy Policy, we
          will securely delete or anonymize it.
        </p>

        <p className="text-gray-600 mt-4">
          <strong>Aggregated Information:</strong> We may retain aggregated,
          non-identifiable information indefinitely. When feasible, we will
          delete or de-identify Personal Data that is no longer needed.
        </p>

        <p className="text-gray-600 mt-4">
          For any concerns regarding the retention or deletion of your data,
          please reach out to us at{" "}
          <a
            href="mailto:legal@growstack.ai"
            className="text-blue-500 underline"
          >
            legal@growstack.ai
          </a>
          .
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          9. Data Privacy Framework Compliance
        </h3>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          GDPR Privacy
        </h4>
        <p className="text-gray-600 mt-2">
          GrowStack.ai complies with the General Data Protection Regulation
          (GDPR) for users in the European Economic Area (EEA). Under GDPR, you
          have rights including access to, correction of, and deletion of your
          personal data, as well as the right to restrict processing and data
          portability. For more information about your rights under GDPR, or to
          exercise them, please contact us using the details provided in the{" "}
          <a href="#contact" className="text-blue-500 underline">
            Contact Us
          </a>{" "}
          section.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          CCPA Privacy
        </h4>
        <p className="text-gray-600 mt-2">
          For users in California, GrowStack.ai adheres to the California
          Consumer Privacy Act (CCPA). Under CCPA, you have the right to access,
          delete, and opt out of the sale of your personal information. For more
          information or to exercise your CCPA rights, please refer to the{" "}
          <a href="#rights-choices" className="text-blue-500 underline">
            Your Rights and Choices
          </a>{" "}
          section of this Privacy Policy or contact us.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">Compliance</h4>
        <p className="text-gray-600 mt-2">
          GrowStack.ai complies with the principles of the EU-U.S. Data Privacy
          Framework (EU-U.S. DPF), the UK Extension to the EU-U.S. DPF, and the
          Swiss-U.S. Data Privacy Framework (Swiss-U.S. DPF), as set forth by
          the U.S. Department of Commerce. We rely on the European Commission’s
          adequacy decision for the EU-U.S. DPF to receive personal data
          transfers from the EEA. GrowStack.ai adheres to the EU-U.S. DPF
          Principles and the UK Extension, as well as the Swiss-U.S. DPF
          Principles for data received from Switzerland.
        </p>

        <p className="text-gray-600 mt-2">
          In the event of a conflict between this Policy and the DPF Principles,
          the DPF Principles will govern. For more information and to view our
          certification, please visit{" "}
          <a
            href="https://www.dataprivacyframework.gov/"
            target="_blank"
            className="text-blue-500 underline"
          >
            Data Privacy Framework
          </a>
          .
        </p>

        <p className="text-gray-600 mt-2">
          Under the DPF Principles, we are responsible for the processing of
          personal data we receive and for data transferred to third-party
          service providers if processed inconsistently with the Data Privacy
          Framework.
        </p>

        <p className="text-gray-600 mt-2">
          If you have questions, concerns, or complaints about our compliance
          with the DPF Principles, please contact us using the details in the{" "}
          <a href="#contact" className="text-blue-500 underline">
            Contact Us
          </a>{" "}
          section. There, you can also find information regarding our EU
          representative.
        </p>

        <p className="text-gray-600 mt-2">
          For unresolved complaints related to personal data handled under the
          Data Privacy Framework, you may contact our U.S.-based third-party
          dispute resolution provider, JAMS, at{" "}
          <a
            href="https://www.jamsadr.com/eu-us-data-privacy"
            target="_blank"
            className="text-blue-500 underline"
          >
            JAMS DPF Dispute Resolution
          </a>
          , free of charge. You may also invoke binding arbitration as outlined
          on the{" "}
          <a
            href="https://www.dataprivacyframework.gov/"
            target="_blank"
            className="text-blue-500 underline"
          >
            Data Privacy Framework
          </a>{" "}
          website. GrowStack.ai is subject to the investigatory and enforcement
          powers of the U.S. Federal Trade Commission (FTC).
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          10. Children's Privacy
        </h3>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          General Policy
        </h4>
        <p className="text-gray-600 mt-2">
          GrowStack.ai is not intended for children under the age of 13 (or
          other age as required by local law), and we do not knowingly collect
          personal information from such children. If you are a parent or
          guardian and believe that your child has provided us with personal
          information, please{" "}
          <a href="#contact" className="text-blue-500 underline">
            contact us
          </a>{" "}
          immediately so that we can take appropriate action. If we discover
          that we have collected personal information from a child in violation
          of applicable law, we will promptly delete such information.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Sale of Personal Information of Minors Under 16 Years of Age
        </h4>
        <p className="text-gray-600 mt-2">
          We do not sell the personal information of consumers we actually know
          to be under 16 years of age, unless we receive affirmative
          authorization (the "right to opt-in") from either the consumer who is
          between 13 and 16 years of age or the parent or guardian of a consumer
          under 13 years of age. Consumers who have opted in to the sale of
          their personal information can opt out at any time. To exercise this
          right, you (or your authorized representative) may submit a request by{" "}
          <a href="#contact" className="text-blue-500 underline">
            contacting us
          </a>
          .
        </p>

        <p className="text-gray-600 mt-2">
          If you believe that a child under the age of 13 (or 16) has provided
          us with personal information, please{" "}
          <a href="#contact" className="text-blue-500 underline">
            contact us
          </a>{" "}
          with sufficient details so that we can delete that information.
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          11. Specific Provisions for EEA, UK, and Swiss Residents
        </h3>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Data Controller Status
        </h4>
        <p className="text-gray-600 mt-2">
          Under Regulation (EU) 2016/679 of the European Parliament and of the
          Council of 27 April 2016 (“GDPR”), we are considered a data controller
          with respect to the Services we provide to you or the information you
          provide as a job candidate.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Lawful Grounds for Processing
        </h4>
        <p className="text-gray-600 mt-2">
          For residents of the European Economic Area (EEA), the United Kingdom,
          and Switzerland, our processing of Personal Data is based on the
          following lawful grounds:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>
            <strong>Performance of a Contract:</strong> Processing of account
            information, content, and technical data is necessary to provide and
            maintain our Services. If you do not provide this information, we
            may not be able to deliver our Services.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> We process Personal Data to
            protect our Services from abuse, fraud, and security risks, and to
            develop, improve, and promote our Services. This includes processing
            accounts, content, and technical information.
          </li>
          <li>
            <strong>Consent:</strong> We may process Personal Data based on your
            consent for specific purposes communicated to you. You have the
            right to withdraw your consent at any time.
          </li>
          <li>
            <strong>Legal Obligations:</strong> We process Personal Data to
            comply with legal obligations and to protect the rights, safety, and
            property of ourselves, our affiliates, users, or third parties.
          </li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Your Rights
        </h4>
        <p className="text-gray-600 mt-2">
          You have several rights under the GDPR:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>
            <strong>Access and Rectification:</strong> Request access to and
            correction of your Personal Data. If your data is inaccurate or
            incomplete, provide the necessary information to update it.
          </li>
          <li>
            <strong>Withdrawal of Consent:</strong> Withdraw your consent to
            processing at any time. This will not affect the legality of
            processing based on consent before its withdrawal.
          </li>
          <li>
            <strong>Deletion and Restriction:</strong> Request deletion or
            restriction of your Personal Data under certain conditions. Note
            that deletion may take time and may not apply to residual copies.
          </li>
          <li>
            <strong>Data Portability:</strong> Request the transfer of your
            Personal Data to another organization or directly to you.
          </li>
          <li>
            <strong>Objection:</strong> Object to the processing of your
            Personal Data, especially in relation to direct marketing.
          </li>
          <li>
            <strong>Automated Decisions:</strong> Not be subject to decisions
            based solely on automated processing, including profiling, which
            significantly affects you.
          </li>
          <li>
            <strong>Safeguards for Transfers:</strong> Request information about
            safeguards for Personal Data transferred outside the EEA.
          </li>
          <li>
            <strong>Complaint:</strong> Lodge a complaint with a data protection
            supervisory authority.
          </li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Request Process
        </h4>
        <p className="text-gray-600 mt-2">
          When you send a request to exercise your rights, we will authenticate
          your identity and location. You may need to provide credentials and
          additional information to clarify your request. We will make
          reasonable efforts to respond promptly.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Assistance for Data Controllers
        </h4>
        <p className="text-gray-600 mt-2">
          As a data processor, we assist our data controllers in fulfilling the
          rights of individuals under the GDPR.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Contact Information
        </h4>
        <p className="text-gray-600 mt-2">
          For any concerns about our processing of Personal Data or to exercise
          your rights, please{" "}
          <a href="#contact" className="text-blue-500 underline">
            contact us
          </a>
          .
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay=""
      >
        <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">
          12. U.S. State Law Disclosures
        </h3>

        <p className="text-gray-600 mt-2">
          Several U.S. states have enacted privacy laws that grant residents
          specific privacy rights concerning their Personal Data. To the extent
          provided by local laws and subject to applicable exceptions, you may
          have the following rights:
        </p>

        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>
            <strong>Access:</strong> Request access to the Personal Data we hold
            about you.
          </li>
          <li>
            <strong>Correction:</strong> Correct any inaccurate or incomplete
            Personal Data.
          </li>
          <li>
            <strong>Opt-Out:</strong> Opt out of the “sale” of your Personal
            Data or its use for targeted advertising and profiling that may lead
            to decisions with legal or similarly significant effects.
          </li>
          <li>
            <strong>Notification:</strong> Be notified about our data practices,
            including how we collect, use, and disclose your Personal Data.
          </li>
          <li>
            <strong>Nondiscrimination:</strong> Be protected from discrimination
            for exercising your privacy rights.
          </li>
          <li>
            <strong>Deletion:</strong> Request the deletion of your Personal
            Data, subject to certain legal exceptions.
          </li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Categories of Personal Data
        </h4>
        <p className="text-gray-600 mt-2">
          We collect various categories of Personal Data as detailed in the
          “Personal Data We Collect” section. For information on how we use and
          disclose this data, please refer to the “The Purposes of Use of the
          Personal Data” and “Data Retention and Deletion” sections.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          No Sale or Sharing
        </h4>
        <p className="text-gray-600 mt-2">
          We do not “sell” Personal Data or “share” Personal Data for
          cross-contextual behavioral advertising as defined under applicable
          local laws. Additionally, we do not process sensitive Personal Data to
          infer characteristics about consumers.
        </p>

        <h4 className="text-lg font-semibold text-gray-800 mt-4">
          Exercising Your Rights
        </h4>
        <p className="text-gray-600 mt-2">
          To exercise your privacy rights as described in this section, please
          submit a request to:
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:legal@growstack.ai"
            className="text-blue-500 underline"
          >
            legal@growstack.ai
          </a>
        </p>
      </div><div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
  data-aos-delay=""
>
  <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">13. Changes to This Privacy Policy</h3>

  <p className="text-gray-600 mt-2">
    We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or other factors.
  </p>

  <ul className="list-disc pl-5 text-gray-600 mt-2">
    <li><strong>Minor Updates:</strong> For updates that have minor or minimal impact, the changes will take effect 7 days after we post a notice on our Services platform and/or website, or send you a notice via email or through the Services.</li>
    <li><strong>Substantial Changes:</strong> For significant changes that affect your rights or our practices, the new Privacy Policy will become effective 30 days after we initially post our notice.</li>
    <li><strong>Immediate Effect:</strong> If changes are required to comply with legal requirements, the updated Privacy Policy will become effective immediately or as required by law.</li>
  </ul>

  <p className="text-gray-600 mt-2">
    The effective date of the latest update will be indicated at the top of this Privacy Policy. Your continued use of the Services or our website after any update signifies your acceptance of the revised Privacy Policy.
  </p>

  <p className="text-gray-600 mt-2">
    If you do not agree to the updated Privacy Policy, you may choose to stop using our Services or website.
  </p>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
  data-aos-delay=""
>
  <h3 className="text-[12px] xl:text-[32px] font-bold text-[#1A202C] mb-4">14. Contact Us</h3>

  <p className="text-gray-600 mt-2">
    If you have any questions or concerns about this privacy policy or your personal information, please contact us:
  </p>

  <p className="text-gray-600 mt-2">
    <strong>Email:</strong> <a href="mailto:legal@growstack.ai" className="text-blue-500 hover:underline">legal@growstack.ai</a>
  </p>

  <p className="text-gray-600 mt-2">
    <strong>Mailing Address:</strong> [Your Mailing Address Here]
  </p>

  <p className="text-gray-600 mt-2">
    We will respond to your inquiry as promptly as possible.
  </p>
</div>

    </div>
  );
};

export default ContentBox;
