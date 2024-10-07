"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    <div className='mb-40'>
     <div 
        className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
        data-aos="fade-up"
      >
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    Introduction
  </h2>
  <p className="text-[14px] xl:text-[16px] mb-4">
    Welcome to Growstack's refund & return policy.
  </p>
  <p className="text-[14px] xl:text-[16px] mb-4">
    At GrowStack.ai, we strive to deliver exceptional products and services designed to drive business growth. Our return and refund policy is structured to ensure a seamless experience for our customers. However, as we deal primarily with digital products and subscription-based services, there are specific conditions and limitations that apply.
  </p>
  <p className="text-[14px] xl:text-[16px]">
    This policy outlines the terms and conditions under which returns, refunds, and cancellations are processed for our digital tools, services, and subscription plans. Please read it carefully before making a purchase.
  </p>
</div>

<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    1. General Eligibility for Returns & Refunds
  </h2>
  <p className="text-[14px] xl:text-[16px] mb-4">
    GrowStack.ai offers a range of digital products, SaaS services, and subscription plans, each of which may be subject to different refund and cancellation terms. The eligibility for refunds depends on the nature of the product or service purchased and how much of the service has been used.
  </p>

  <h3 className="text-[14px] xl:text-[20px] font-bold mb-2">
    (a) Digital Products & Software
  </h3>
  <ul className="list-disc ml-6 text-[12px] xl:text-[14px] mb-4">
    <li className="mb-2">
      All digital products, including software, toolkits, and other downloadable resources, are non-refundable once the product has been accessed, downloaded, or activated.
    </li>
    <li className="mb-2">
      We highly recommend customers carefully review the product description, features, and system requirements before making a purchase.
    </li>
    <li className="mb-2">
      In case of technical issues or faulty downloads, we will work with you to resolve the issue, including providing additional assistance to ensure proper access to the product.
    </li>
  </ul>

  <h3 className="text-[14px] xl:text-[20px] font-bold mb-2">
    (b) Subscription-Based SaaS Services
  </h3>
  <p className="text-[12px] xl:text-[14px] mb-2">
    For customers subscribing to our SaaS (Software as a Service) products, refund eligibility varies based on the subscription plan purchased (monthly or annual):
  </p>

  <h4 className="text-[12px] xl:text-[16px] font-bold mb-2">
    Monthly Subscriptions:
  </h4>
  <ul className="list-disc ml-6 text-[12px] xl:text-[14px] mb-4">
    <li className="mb-2">
      Refund requests must be submitted within 7 days of the initial subscription activation.
    </li>
    <li className="mb-2">
      To qualify for a refund, the customer must not have used more than 10% of the available service features during that time (e.g., user logins, API calls, or data usage).
    </li>
    <li className="mb-2">
      After the 7-day period, refunds will not be issued, but customers can cancel their subscription to avoid future billing.
    </li>
  </ul>

  <h4 className="text-[12px] xl:text-[16px] font-bold mb-2">
    Annual Subscriptions:
  </h4>
  <ul className="list-disc ml-6 text-[12px] xl:text-[14px] mb-4">
    <li className="mb-2">
      Refund requests for annual plans must be made within 14 days of purchase.
    </li>
    <li className="mb-2">
      To be eligible for a refund, customers must not have used more than 20% of the available service features.
    </li>
    <li className="mb-2">
      Refunds will not be issued after 14 days or if more than 20% of the services have been utilized.
    </li>
  </ul>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    2. Non-Refundable Conditions
  </h2>
  <p className="text-[14px] xl:text-[16px] mb-4">
    Please note that the following purchases and situations do not qualify for refunds:
  </p>

  <ul className="list-disc ml-6 text-[12px] xl:text-[14px] mb-4">
    <li className="mb-2">
      Change of mind after the product or service has been purchased.
    </li>
    <li className="mb-2">
      Failure to use the product or service within the designated period (for example, failing to log in or engage with the service during the subscription period).
    </li>
    <li className="mb-2">
      Third-party issues, such as incompatibility with external software or hardware not specified in the system requirements.
    </li>
    <li className="mb-2">
      Custom development services that have been initiated or delivered.
    </li>
    <li className="mb-2">
      Promotional offers or discounted purchases, unless explicitly stated otherwise.
    </li>
  </ul>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    3. Refund Request Process
  </h2>
  <p className="text-[14px] xl:text-[16px] mb-4">
    To initiate a refund, please contact our team by emailing 
    <a href="mailto:sales@growstack.ai" className="text-blue-500 ml-2 underline">
      sales@growstack.ai
    </a>. In your request, include the following details:
  </p>

  <ul className="list-disc ml-6 text-[12px] xl:text-[14px] mb-4">
    <li className="mb-2">Full name and email address associated with your GrowStack.ai account.</li>
    <li className="mb-2">Order or invoice number.</li>
    <li className="mb-2">The date of purchase.</li>
    <li className="mb-2">A clear explanation of the reason for requesting the refund.</li>
  </ul>

  <p className="text-[14px] xl:text-[16px]">
    We aim to respond to all refund requests within 3-5 business days. After reviewing your case, we will notify you of the approval or rejection of your refund request.
  </p>
 <p className='mt-6'> Please note: In the event of a refund, the processing fee charged by Stripe will be deducted from the total refund amount. This is because Stripe does not refund their processing fees when a transaction is reversed
 </p></div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    4. Refund Processing Timeline
  </h2>
  <p className="text-[14px] xl:text-[16px] mb-4">
    If your refund request is approved, the refund will be processed within 5-10 business days, depending on your original payment method. The refund will be issued back to the payment method used for the initial transaction.
  </p>

  <p className="text-[14px] xl:text-[16px]">
    Please note that processing times for refunds may vary depending on your financial institution.
  </p>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    5. Service Downgrades, Modifications, and Cancellations
  </h2>

  <p className="font-bold mb-2">A. Downgrades and Account Modifications</p>
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px] mb-4">
    <li className="mb-4">
      If you wish to downgrade your subscription plan, the downgrade will take effect at the end of the current billing cycle.
    </li>
    <li className="mb-4">
      Refunds will not be provided for any unused portions of the service during the current billing period.
    </li>
    <li>
      Modifications to service features, account settings, or user limits will also take effect at the start of the next billing cycle.
    </li>
  </ul>

  <p className="font-bold mb-2">B. Cancellation Policy</p>
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px]">
    <li className="mb-4">
      Customers can cancel their subscription at any time by accessing their account settings within GrowStack.ai.
    </li>
    <li className="mb-4">
      Cancellations will take effect at the end of the current billing cycle, and you will continue to have access to the service until the end of that period.
    </li>
    <li>
      No refunds will be issued for the remaining days of the active subscription, except for specific refund-eligible situations mentioned above (e.g., within the first 7 days of a monthly plan or within 14 days for an annual plan).
    </li>
  </ul>
</div>

<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    6. Exceptional Circumstances
  </h2>
  
  <p className="text-[8px] xl:text-[14px] mb-4">
    In rare cases, we may consider providing refunds or credits for exceptional circumstances, such as:
  </p>
  
  <ul className="list-disc ml-6 text-[8px] xl:text-[14px]">
    <li className="mb-4">
      System-wide technical issues that prevent access to our services for an extended period.
    </li>
    <li className="mb-4">
      Errors on our part, such as duplicate charges or incorrect account setup.
    </li>
    <li>
      Unintentional auto-renewals, where a customer did not intend to continue their subscription and contacts us within a reasonable time frame (typically within 3-5 business days after renewal).
    </li>
  </ul>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    7. Policy Updates
  </h2>
  
  <p className="text-[8px] xl:text-[14px] mb-4">
    GrowStack.ai reserves the right to update, modify, or change this Return & Refund Policy at any time without prior notice. Any changes made to the policy will be effective immediately and reflected on this page. It is the customer’s responsibility to review the policy periodically for any updates or changes. Continued use of our products or services following any modifications to the policy constitutes your acceptance of the revised terms.
  </p>
</div>
<div
  className="bg-white p-8 m-4 border border-gray-300 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
  data-aos="fade-up"
>
  <h2 className="text-[16px] xl:text-[28px] font-bold mb-4">
    8. Contact Information
  </h2>
  
  <p className="text-[8px] xl:text-[14px] mb-2">
    If you have any questions or require further assistance regarding our Return & Refund Policy, feel free to get in touch with us:
  </p>
  
  <ul className="list-none text-[8px] xl:text-[14px]">
    <li><strong>Email:</strong> <a href="mailto:sales@growstack.ai" className="text-blue-600 hover:underline">sales@growstack.ai</a></li>
    <li><strong>Mailing Address:</strong> 1638 Macalpine Circle, Morrisville, North Carolina 27560, USA</li>
  </ul>
</div>

    </div>
  );
};

export default ContentBox;
