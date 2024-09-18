"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ContentBoxProps {
  title: string;
  introduction: string;
  content: string;
  linksSection?: {
    heading: string;
    content: string;
  };
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
  linksSection,
  collectionOfInformation,
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
          Introduction
        </h1>
        <h3 className="text-[10px] xl:text-[16px] font-semibold mb-2">
          Welcome to Growstack Terms of Service.
        </h3>
        <p className="mb-4 text-[8px] xl:text-[14px]">
          Welcome to Growstack.ai! These Terms of Service (this “Agreement”)
          constitute a binding contract between you (“Customer,” “you,” or
          “your”) and Growstack.ai, Inc. (“Growstack,” “we,” or “us”). This
          Agreement governs your access to and use of the Growstack.ai platform
          and services (collectively, the “Services”).
        </p>
        <p className="text-[8px] xl:text-[14px] font-semibold">
          PLEASE READ THIS AGREEMENT CAREFULLY. IT INCLUDES AN ARBITRATION
          AGREEMENT AND A CLASS ACTION/JURY TRIAL WAIVER. UNLESS YOU OPT OUT PER
          SECTION 9(B), YOU AGREE TO RESOLVE DISPUTES THROUGH BINDING
          ARBITRATION AND WAIVE YOUR RIGHT TO A COURT TRIAL OR PARTICIPATION IN
          CLASS ACTIONS.
        </p>
        <p className="text-[8px] xl:text-[14px] font-semibold">
          THIS AGREEMENT IS EFFECTIVE WHEN YOU CLICK “I ACCEPT” OR START USING
          THE SERVICES. BY DOING SO, YOU (A) CONFIRM YOU HAVE READ AND
          UNDERSTOOD THESE TERMS; (B) WARRANT THAT YOU HAVE THE AUTHORITY TO
          ENTER INTO THIS AGREEMENT; AND (C) AGREE TO BE LEGALLY BOUND BY THESE
          TERMS.
        </p>
        <p className="text-[8px] xl:text-[14px] font-semibold">
          IF YOU DO NOT AGREE, PLEASE SELECT “I DECLINE” OR DO NOT USE THE
          SERVICES.
        </p>
        <p className="mb-4 text-[8px] xl:text-[14px]">
          For details, read our Privacy Policy and Terms. The Site and Services
          include Growstack.ai’s website at www.growstack.ai and the AI-powered
          content generation services provided.
        </p>
        <p className="text-[8px] xl:text-[14px] font-semibold">
          IMPORTANT FOR U.S. CUSTOMERS: AGREEMENT TO THESE TERMS MEANS YOU AGREE
          TO RESOLVE DISPUTES THROUGH BINDING ARBITRATION. SEE SECTION 11 FOR
          DETAILS.
        </p>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          1. Definations
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-2">
            <strong>Aggregated Statistics:</strong> Anonymized data related to
            your use of the Services, used by Growstack.ai to analyze
            performance.
          </li>
          <li className="mb-2">
            <strong>Authorized User:</strong> Employees, consultants,
            contractors, and agents authorized by you to use the Services, for
            whom access has been purchased.
          </li>
          <li className="mb-2">
            <strong>Confidential Information:</strong> Proprietary or sensitive
            business information, not publicly known, disclosed by either party.
          </li>
          <li className="mb-2">
            <strong>Customer:</strong> Refers to you and your Authorized Users.
          </li>
          <li className="mb-2">
            <strong>Customer Account:</strong> Your account on the Services.
          </li>
          <li className="mb-2">
            <strong>Customer Property:</strong> Data or content you provide to
            Growstack.ai, including inputs, outputs, and data from Third-Party
            Products.
          </li>
          <li className="mb-2">
            <strong>Documentation:</strong> User manuals and instructional
            materials for the Services, available on Growstack.ai’s website.
          </li>
          <li className="mb-2">
            <strong>Feedback:</strong> Suggestions or recommendations for
            improving the Services.
          </li>
          <li className="mb-2">
            <strong>Input:</strong> Information you provide to the Services via
            prompts, which you own or have rights to.
          </li>
          <li className="mb-2">
            <strong>Intellectual Property Rights:</strong> Legal protections for
            patents, copyrights, trademarks, and trade secrets.
          </li>
          <li className="mb-2">
            <strong>Growstack.ai Property:</strong> Services, Documentation, and
            related content, excluding Customer Property, but includes
            Aggregated Statistics.
          </li>
          <li className="mb-2">
            <strong>Output:</strong> Content generated by the Services based on
            your Input, excluding Growstack.ai Property.
          </li>
          <li className="mb-2">
            <strong>Privacy Policy:</strong> Our privacy policy available on
            Growstack.ai's website.
          </li>
          <li className="mb-2">
            <strong>Services:</strong> The online/mobile services, website, and
            software provided by Growstack.ai.
          </li>
          <li className="mb-2">
            <strong>Term:</strong> The duration of your active subscription to
            the Services.
          </li>
          <li className="mb-2">
            <strong>Third-Party Products:</strong> External products or services
            accessible through the Services.
          </li>
          <li className="mb-2">
            <strong>User(s):</strong> Individuals who access or use the
            Services.
          </li>
          <li>
            <strong>User Accounts:</strong> Different types of accounts for
            various User roles.
          </li>
        </ul>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          2. Access and Use
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-2">
            <strong>Eligibility:</strong> By using our Services, you agree to
            these Terms. You must be able to form a binding contract and comply
            with all laws. Services are not available to individuals under 13
            (or under 16 in Europe) or those previously removed by Growstack.ai.
          </li>
          <li className="mb-2">
            <strong>Provision of Access:</strong> Upon payment and compliance
            with this Agreement, Growstack.ai grants you a revocable,
            non-exclusive, non-transferable right to use the Services for
            internal purposes during the Term. We will provide access
            credentials.
          </li>
          <li className="mb-2">
            <strong>Documentation License:</strong> You are granted a
            non-exclusive, non-sublicensable license to use the Documentation
            for internal purposes in connection with the Services.
          </li>
          <li className="mb-2">
            <strong>Accounts:</strong> Your Customer Account provides access to
            our Services. If for a company, “you” includes both you and the
            entity. You must not use others' accounts and must secure your
            account and password. Notify us of any unauthorized use. You can
            manage your account settings and email preferences via your settings
            page.
          </li>
          <li className="mb-2">
            <strong>Use Restrictions:</strong> You and your Authorized Users
            must not:
            <ul className="list-decimal ml-6 mt-2">
              <li>Copy or distribute parts of the Services;</li>
              <li>Use automated systems to excessively access the Services;</li>
              <li>Transmit spam or interfere with system security;</li>
              <li>Violate our Fair Use Policy;</li>
              <li>Upload harmful software;</li>
              <li>Collect personal information from the Services;</li>
              <li>
                Use the Services for illegal purposes or impersonate others.
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Aggregated Statistics:</strong> We may collect and use
            Aggregated Statistics from your use of the Services, retaining all
            rights to such data. We may publish or use this data in compliance
            with the law, ensuring it does not identify you or your Confidential
            Information.
          </li>
          <li className="mb-2">
            <strong>Reservation of Rights:</strong> All rights not expressly
            granted are reserved by Growstack.ai. Nothing in this Agreement
            gives you rights to Growstack.ai Property beyond those expressly
            granted.
          </li>
          <li className="mb-2">
            <strong>Suspension:</strong> We may suspend or terminate your access
            at our discretion, including for security reasons, illegal
            activities, or legal restrictions, without prior notice.
          </li>
          <li className="mb-2">
            <strong>Changes to Services:</strong> We may change, limit, or
            discontinue Services or features without notice, and suspend or
            terminate access if you violate these Terms.
          </li>
          <li className="mb-2">
            <strong>Processing of Personal Data:</strong> Providing Personal
            Data is not required to use the Services. If you submit Personal
            Data, you must sign a Data Processing Addendum (DPA), which will be
            part of this Agreement. Processing will follow our Privacy Policy.
          </li>
          <li className="mb-2">
            <strong>In-Product Cookies:</strong> We use First Party Cookies to
            collect information for Service functionality. For details, see our
            Cookie Policy.
          </li>
        </ul>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          3. Intellectual Property Rights
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong> Customer Property:</strong> You retain full ownership of
            your content (“Customer Property”) when using Growstack’s services.
            By submitting any Customer Property, you grant Growstack a
            perpetual, royalty-free, sublicensable, transferable, worldwide
            license to use, modify, and distribute your content, including your
            name, voice, and likeness, for purposes such as improving AI models,
            promoting the services, and creating derivative works. Additionally,
            you grant a non-exclusive, irrevocable license for Growstack to use
            your name, trademarks, and logos to identify you as a customer
            during your subscription period.
            <br />
            <br />
            You represent that you possess the necessary rights to grant
            Growstack these permissions and that your content will not violate
            any laws or third-party rights. Growstack bears no responsibility
            for Customer Property submitted by you or other users, and you
            remain fully accountable for it.
          </li>
          <li className="mb-4">
            <strong> Growstack Property:</strong> All rights to Growstack
            Property, including software, content, and aggregated statistics,
            are owned exclusively by Growstack and its licensors. You are not
            permitted to sell, license, modify, or create derivative works from
            Growstack Property unless explicitly permitted by the terms of this
            agreement. Any unauthorized use of Growstack Property is prohibited,
            and all rights to aggregated statistics are automatically assigned
            to Growstack.
          </li>
          <li className="mb-4">
            <strong>Feedback:</strong> Any feedback you provide to Growstack is
            considered non-confidential. By submitting feedback, you assign all
            intellectual property rights related to it to Growstack without the
            expectation of compensation.
          </li>
          <li className="mb-4">
            <strong>DMCA Notice:</strong> Growstack respects intellectual
            property laws and complies with the Digital Millennium Copyright Act
            (DMCA). If you believe your work has been infringed, you can submit
            a DMCA takedown notice to Growstack’s copyright agent with the
            required details as outlined by DMCA guidelines. Providing false or
            misleading claims may lead to legal consequences. Growstack reserves
            the right to terminate users who repeatedly violate intellectual
            property rights.
          </li>
        </ul>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        {" "}
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          4. Customer Responsibilities and Usage Requirements
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Acceptable Use:</strong> You must comply with all applicable
            laws and Growstack's Acceptable Use Policy. Any access or use of the
            services, whether by you or authorized users, is your
            responsibility. Acts or omissions by authorized users that breach
            this Agreement are considered your responsibility. You must ensure
            that all authorized users comply with these terms.
          </li>
          <li className="mb-4">
            <strong>Account Use and Credentials:</strong> You are responsible
            for safeguarding passwords and access credentials. Unauthorized
            access should be promptly reported, and passwords must not be sold
            or transferred.
          </li>
          <li className="mb-4">
            <strong>Third-Party Products:</strong> Access to third-party
            products via the services is subject to their own terms. Growstack
            is not responsible for these third-party products or any associated
            customer content. Your interactions with third-party advertisers or
            products are solely at your own risk.
          </li>
          <li className="mb-4">
            <strong>Usage Requirements:</strong> When using Growstack services,
            you agree to:
            <ul className="list-decimal ml-6 mt-2">
              <li>Follow all laws, regulations, and Growstack’s terms.</li>
              <li>Respect intellectual property rights.</li>
              <li>Align generated content usage with OpenAI's mission.</li>
              <li>Avoid violating third-party rights or agreements.</li>
              <li>Comply with any restrictions (e.g., call rate limits).</li>
              <li>
                Minimize societal harm, particularly with generated content.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Prohibited Activities:</strong> You must not:
            <ul className="list-decimal ml-6 mt-2">
              <li>Post infringing or illegal content.</li>
              <li>Resell or replicate the services.</li>
              <li>Tamper with or reverse-engineer the services.</li>
              <li>Distribute malware or unauthorized software.</li>
              <li>
                Attempt to access proprietary models, algorithms, or systems.
              </li>
              <li>Circumvent security protections.</li>
              <li>Send spam or engage in misleading practices.</li>
              <li>Impersonate others or misuse personal data.</li>
              <li>
                Engage in illegal activities (e.g., child pornography,
                gambling).
              </li>
            </ul>
          </li>
        </ul>
        <p className="text-[8px] xl:text-[14px]">
          Growstack reserves the right to monitor service usage, remove
          objectionable content, and cooperate with law enforcement for
          compliance.
        </p>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        {" "}
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          5. Subscription and Payment
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Billing Policies:</strong> Certain Growstack services may
            require a fee. By using these services, you agree to the current
            Pricing and Payment Terms, which may be updated periodically.
            Growstack reserves the right to introduce new services, amend
            existing service fees, or adjust charges at any time. Changes to the
            pricing will take effect in the billing cycle following notice.
          </li>
          <li className="mb-4">
            <strong>No Refunds:</strong> You may cancel your subscription at any
            time, but no refunds will be provided for cancellations, unused
            time, or terminated accounts. If your account is suspended or
            terminated, you will not be refunded for any unused portion of the
            subscription or associated data.
          </li>
          <li className="mb-4">
            <strong>Free Trials:</strong> Free trials may be offered for select
            services. If a free trial is followed by a paid subscription, your
            payment method will automatically be charged once the free trial
            ends. You must cancel the subscription before the trial expires to
            avoid charges. If you cancel during the free trial, the cancellation
            may take effect immediately.
          </li>
          <li className="mb-4">
            <strong>Risk of Loss:</strong> For any physical products purchased
            through Growstack services, the risk of loss transfers to you upon
            delivery to the carrier. Growstack is not liable for loss or damage
            during shipment.
          </li>
          <li className="mb-4">
            <strong>Payment Information and Taxes:</strong> Payments are
            processed through third-party services such as Stripe. By using
            Growstack services, you agree to the Stripe Services Agreement. All
            payment information must be accurate and current, and you agree to
            pay any associated fees or taxes at the time of purchase or
            subscription renewal. Payments are non-refundable and
            non-transferable unless specified in the terms.
          </li>
        </ul>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          6. Confidential Information and User Content
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Confidential Information</strong>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Disclosure and Use:</strong> Growstack and the customer
                may share confidential information. The receiving party must not
                disclose this information except to its employees or contractors
                who need to know it for the purposes of fulfilling their
                obligations. All individuals with access must protect this
                confidential information under terms no less strict than those
                outlined in this agreement.
              </li>
              <li>
                <strong>Legal Disclosure:</strong> Each party may disclose
                confidential information if required by law or court order, but
                must notify the other party beforehand and seek to protect the
                information as much as possible.
              </li>
              <li>
                <strong>Duration of Non-Disclosure:</strong> The obligations to
                keep confidential information secret last for five years after
                the initial disclosure, except for trade secrets, which will
                remain protected as long as applicable law allows.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Security of Personal Information:</strong> Growstack takes
            the security of your personal information seriously, but cannot
            guarantee that third parties will never breach security measures.
            You acknowledge that you provide personal information at your own
            risk.
          </li>
          <li className="mb-4">
            <strong>User Content:</strong>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Posting Content:</strong> The services may allow you to
                store or share content (referred to as "User Content").
                Growstack does not claim ownership of User Content, but by
                posting it, you grant Growstack and its partners a license to
                use it as necessary to operate and improve their services.
              </li>
              <li>
                <strong>Licenses and Permissions:</strong> By sharing User
                Content, you give Growstack a non-exclusive, worldwide,
                perpetual, royalty-free license to use, modify, copy,
                distribute, and display your content for service-related
                purposes.
              </li>
              <li>
                <strong>User Responsibility:</strong> You are responsible for
                ensuring that you have all necessary rights to share your
                content and that it does not infringe on others' rights. You
                guarantee that your content will not violate intellectual
                property, privacy, or other legal obligations.
              </li>
              <li>
                <strong>Content Removal:</strong> You can remove User Content at
                any time, but certain posts or comments may not be fully deleted
                from the system. Growstack is not liable for the inability to
                remove all instances of content.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Generated Content:</strong> Subject to compliance with the
            terms, Growstack grants you a non-exclusive, worldwide license to
            use, modify, sell, and distribute content generated through the
            platform for lawful business purposes.
          </li>
          <li className="mb-4">
            <strong>Intellectual Property:</strong> Any content provided by
            Growstack that is subject to intellectual property rights, including
            Generated Content, remains the property of Growstack or its
            licensors. You are licensed to use this content within the limits
            provided by the service.
          </li>
        </ul>
      </div>
      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          7. Warranty Disclaimer
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            The services provided by Growstack are available on an "As Is" and
            "As Available" basis. You use the services at your own risk.
          </li>
          <li className="mb-4">
            To the maximum extent permitted by law, Growstack disclaims all
            warranties, whether express or implied, including but not limited
            to:
            <ul className="list-disc ml-6 mt-2">
              <li>
                Implied warranties of merchantability, fitness for a particular
                purpose, and non-infringement.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            Growstack does not warrant that:
            <ul className="list-disc ml-6 mt-2">
              <li>
                The service content will be accurate, reliable, or correct;
              </li>
              <li>The services will meet your requirements;</li>
              <li>
                The services will be uninterrupted, secure, or available at any
                particular time or location;
              </li>
              <li>Any defects or errors will be corrected.</li>
            </ul>
          </li>
          <li className="mb-4">
            There is no warranty that the services are free of viruses or other
            harmful components.
          </li>
          <li className="mb-4">
            Any content or data you download or obtain through the use of the
            services is done at your own risk, and you will be solely
            responsible for any damages or liabilities, including damage to your
            device or data loss.
          </li>
          <li className="mb-4">
            Growstack does not warrant, endorse, or assume responsibility for
            any product or service offered by a third party through its platform
            or via a hyperlink, and Growstack will not be involved in any
            transactions between you and third-party providers.
          </li>
          <li>
            <strong>Legal Exemptions:</strong> Some jurisdictions do not allow
            certain warranty exclusions, so the above exclusions may not apply
            to you. In such cases, you may have additional legal rights.
          </li>
        </ul>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          8. Limitation of Liability
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Exclusion of Certain Damages:</strong> To the maximum extent
            permitted by law, Growstack, along with its service providers and
            licensors, will not be liable for:
            <ul className="list-disc ml-6 mt-2">
              <li>Incidental, special, exemplary, or consequential damages.</li>
              <li>
                Lost profits, lost revenues, lost savings, lost business
                opportunities, or loss of data or goodwill.
              </li>
              <li>
                Service interruptions, computer damage, system failure, or the
                cost of substitute services arising from the use or inability to
                use the services, regardless of the legal theory (warranty,
                contract, tort, etc.) or whether Growstack has been advised of
                such possibilities.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Total Liability Cap:</strong> In no event will Growstack’s
            total liability, in connection with these terms or from your use or
            inability to use the services, exceed:
            <ul className="list-disc ml-6 mt-2">
              <li>
                The amounts paid or payable by you to Growstack for the
                services, or
              </li>
              <li>
                One hundred dollars ($100) if you have no payment obligations to
                Growstack.
              </li>
            </ul>
          </li>
          <li>
            <strong>Fundamental Basis of the Agreement:</strong> The limitations
            of liability outlined here are a fundamental part of the agreement
            between you and Growstack. They reflect the agreed allocation of
            risk between the parties and are essential to the pricing and
            offering of the services.
          </li>
        </ul>
      </div>

      <div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    Governing Law, Arbitration, and Class Action/Jury Trial Waiver for Growstack
  </h2>

  <p className="font-bold">Governing Law</p>
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
    <li className="mb-4">
      You agree that:
      <ul className="list-disc ml-6 mt-2">
        <li>
          The services provided by Growstack shall be deemed solely based in North Carolina.
        </li>
        <li>
          The services are considered a passive platform, not giving rise to personal jurisdiction over Growstack in any jurisdiction outside of North Carolina.
        </li>
        <li>
          This agreement will be governed by the laws of the State of North Carolina, without consideration of its conflict of laws principles.
        </li>
        <li>
          This agreement evidences a transaction involving interstate commerce, and the Federal Arbitration Act (FAA) will govern the interpretation and enforcement of the Arbitration Agreement in Section 9(b), preempting state laws where applicable.
        </li>
        <li>
          If the FAA does not apply, the law of your state of residence will govern.
        </li>
        <li>
          The United Nations Convention on Contracts for the International Sale of Goods does not apply.
        </li>
        <li>
          You agree to submit to the exclusive jurisdiction of state and federal courts in North Carolina for disputes relating to the protection of Growstack’s intellectual property and for appeals of arbitration decisions.
        </li>
      </ul>
    </li>
  </ul>

  <p className="font-bold">Arbitration</p>
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
    <li className="mb-4">
      <strong>Agreement to Arbitrate:</strong>
      <p>
        You and Growstack agree to resolve any disputes through binding arbitration rather than in court, except as provided herein.
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>
          This Arbitration Agreement governs disputes arising out of or relating to: This agreement, including its interpretation or validity; Your use of the services, including transactions or marketing communications; Any other aspect of your relationship with Growstack.
        </li>
        <li>
          The Arbitration Agreement applies to all claims, including those asserted before you agreed to the terms.
        </li>
        <li>
          <strong>Opt-Out Option:</strong> If you are a new user, you may opt-out of this Arbitration Agreement within 30 days by emailing Growstack at support@growstack.ai
        </li>
        <li>
          <strong>Process:</strong> Before initiating arbitration, you agree to first attempt to resolve any dispute informally by contacting Growstack at support@growstack.ai. If the dispute remains unresolved after 60 days, it will be submitted to binding arbitration administered by the American Arbitration Association (AAA). The arbitration will be held in North Carolina or your county of residence, unless otherwise agreed. For commercial users, each party will bear the AAA fees. For non-commercial users, you may seek a fee waiver, and attorney fees may be awarded in certain cases.
        </li>
        <li>
          <strong>Arbitrator’s Authority:</strong> The arbitrator has the exclusive authority to decide any dispute about the enforceability or interpretation of this Arbitration Agreement, including claims that it is unconscionable or void.
        </li>
        <li>
          <strong>Exceptions to Arbitration:</strong>
          <ul className="list-disc ml-6 mt-2">
            <li>You may seek claims in small claims court for qualifying disputes.</li>
            <li>Growstack may seek injunctive relief from the courts to protect its intellectual property and data security.</li>
          </ul>
        </li>
        <li>
          <strong>Severability:</strong> If any part of the Arbitration Agreement is found to be unenforceable, it will be severed, and the remainder of the agreement will still apply. However, if the Class Action/Jury Trial Waiver is found unenforceable in cases involving public injunctive relief, those claims may be litigated in court, while all other claims remain subject to arbitration.
        </li>
      </ul>
    </li>
  </ul>

  <p className="font-bold">Class Action and Jury Trial Waiver</p>
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
    <li className="mb-4">
      <strong>Waiver of Class Action Rights:</strong> All disputes must be brought in an individual capacity. You and Growstack agree to waive the right to:
      <ul className="list-disc ml-6 mt-2">
        <li>Bring or participate in any class action, collective action, or private attorney general action.</li>
        <li>Seek relief on a representative basis.</li>
      </ul>
      The arbitrator may only provide relief on an individual basis, and any relief granted will not affect other Growstack users.
    </li>
    <li>
      <strong>Waiver of Jury Trial:</strong> By agreeing to these terms, you and Growstack waive the right to a trial by jury for any claims.
    </li>
  </ul>

  <p className="font-bold">Governing Law and Forum Choice</p>
  <p className="text-[8px] xl:text-[14px]">
    Any legal action related to these terms that is not subject to arbitration will be governed by the Federal Arbitration Act, federal arbitration law, and the laws of North Carolina, without respect to conflict of laws provisions.
    For disputes that are not arbitrated, the state and federal courts in North Carolina will have exclusive jurisdiction, and both parties waive objections to venue and jurisdiction in these courts.
  </p>
</div>


      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          10. Modifications to the Agreement and Service Changes
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Modifications to the Agreement:</strong> You acknowledge and
            agree that Growstack has the right, in its sole discretion, to
            modify this Agreement from time to time. Any modifications to the
            terms will become effective upon posting on the Growstack website or
            within the Services.
            <ul className="list-disc ml-6 mt-2">
              <li>
                We will notify you of material modifications through direct
                email or a visible banner within the Services.
              </li>
              <li>
                It is your responsibility to review and familiarize yourself
                with any such modifications.
              </li>
              <li>
                Your continued use of the Services after the effective date of
                the modifications will be considered acceptance of the updated
                terms.
              </li>
              <li>
                Growstack will provide at least 30 days’ advance notice of any
                changes to service levels that we reasonably anticipate may
                result in a material reduction in quality or services.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Updates to Terms:</strong> Growstack may update the Terms at
            any time and in its sole discretion. Updated Terms will be posted on
            the Growstack website and may be communicated to you through other
            means.
            <ul className="list-disc ml-6 mt-2">
              <li>
                It is important to review the Terms regularly, especially after
                we post updates or use the Services.
              </li>
              <li>
                If you continue to use the Services after updated Terms have
                been posted, it means you accept and agree to the changes. If
                you do not agree with the updated Terms, you must stop using the
                Services.
              </li>
            </ul>
          </li>
          <li>
            <strong>Changes or Discontinuation of Services:</strong> Growstack
            reserves the right to change or discontinue all or any part of the
            Services at any time, without prior notice, and at its sole
            discretion.
          </li>
        </ul>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          11. Indemnity
        </h1>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
          <li className="mb-4">
            <strong>Indemnification by You:</strong> You agree to indemnify,
            defend, and hold harmless Growstack, its affiliates, licensors, and
            each of their officers, directors, employees, representatives, and
            agents (collectively, the "Indemnified Parties"), from and against
            any and all claims, disputes, demands, liabilities, damages, losses,
            and costs and expenses (including, but not limited to, reasonable
            legal and accounting fees) arising out of or in any way connected
            with:
            <ul className="list-disc ml-6 mt-2">
              <li>
                Your Access to or Use of the Services: Any use or access to the
                Services by you or your Authorized Users.
              </li>
              <li>
                Your User Content: Any User Content you provide, upload, or
                otherwise make available through the Services.
              </li>
              <li>
                Violation of Terms: Any violation of these Terms by you or your
                Authorized Users.
              </li>
              <li>
                Intellectual Property Rights: Any actual or alleged
                infringement, misappropriation, or violation of Growstack's, its
                licensors’, or any third party's intellectual property or
                proprietary rights.
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <strong>Indemnification by Customer:</strong> In addition to your
            indemnity obligations above, you agree to defend, indemnify, and
            hold harmless Growstack, its subsidiaries, agents, licensors,
            managers, and other affiliated companies, and their employees,
            contractors, agents, officers, and directors (collectively, the
            "Growstack Indemnified Parties"), from and against any and all
            claims, damages, obligations, losses, liabilities, costs, or
            expenses (including, but not limited to, attorney’s fees) arising
            from:
            <ul className="list-disc ml-6 mt-2">
              <li>
                Use of Services: Your or your Authorized Users’ use of and
                access to the Services, including any data or content
                transmitted or received.
              </li>
              <li>
                Violation of Agreement: Any violation of these Terms by you or
                your Authorized Users, including any breach of the
                representations and warranties provided herein.
              </li>
              <li>
                Violation of Third-Party Rights: Any violation of any
                third-party right, including, without limitation, any right of
                privacy or intellectual property rights.
              </li>
              <li>
                Violation of Law: Any violation of applicable law, rule, or
                regulation by you or your Authorized Users.
              </li>
              <li>
                Customer Property: Any content submitted via your User Account,
                including misleading, false, or inaccurate information.
              </li>
              <li>
                Willful Misconduct: Any willful misconduct by you or your
                Authorized Users.
              </li>
              <li>
                Unauthorized Access: Any other party's access to and use of the
                Services with your or your Authorized Users’ unique username,
                password, or other security credentials.
              </li>
            </ul>
          </li>
          <li>
            You agree to promptly notify Growstack of any claim for which you
            are required to indemnify the Growstack Indemnified Parties and
            cooperate with Growstack in the defense of such claim.
          </li>
        </ul>
      </div>

      <div
        className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">
          12. Contact Us
        </h1>
        <p className="text-[8px] xl:text-[14px]">
          If you have any questions or concerns about this terms of service,
          please contact us at:
        </p>
        <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mt-2">
          <li>
            Email:{" "}
            <a
              href="mailto:support@growstack.ai"
              className="text-blue-500 hover:underline"
            >
              support@growstack.ai
            </a>
          </li>
          <li>
            Mailing Address: 1638 Macalpine Circle, Morrisville, North Carolina
            27560, USA
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentBox;
