import React from 'react';
import { Check } from 'lucide-react';

// Import images so Vite bundles them correctly in production (Vercel).
import headerLogo from '../assets/header-logo.png';
import footerLogo from '../assets/footer-logo.png';

// Single row: label on the left column, value on the right column
function Row({ label, value, className = '' }) {
  return (
    <div
      className={`grid grid-cols-[136px_1fr] max-[340px]:grid-cols-[122px_1fr] items-start text-[10.4px] leading-[16px] text-black ${className}`}
    >
      <span className="font-normal">{label}</span>
      <span className="font-bold break-words">{value || '-'}</span>
    </div>
  );
}

export default function ViewDocument({ data }) {
  // Safe check: Agar data na ho toh app crash hone ke bajaye loading/error dikhaye
  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-black font-sans">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">Loading document details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reset default page styles (margins, padding, background) */}
      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          max-width: none !important;
          width: 100% !important;
          display: block !important;
          text-align: left !important;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
      `}</style>

      {/* Page wrapper: pure white, no borders, no shadow */}
      <div
        className="min-h-screen w-full bg-white flex justify-center"
        style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      >
        <div className="w-full max-w-[385px] min-h-screen bg-white flex flex-col">
          {/* Blue header */}
          <div className="bg-[#00188c] h-[76px] shrink-0 flex items-center gap-[20px] pl-[22px] pr-[12px]">
            <img
              src={headerLogo}
              alt="Fingerprint Logo"
              className="w-[40px] h-[54px] object-contain shrink-0"
            />
            <div className="text-white min-w-0">
              <h2 className="text-[15.2px] font-normal leading-[18px] m-0">
                Authenticate your document
              </h2>
              <p className="text-[7.2px] leading-[11px] mt-[3px] mb-0">
                Thank you for submitting your document for verification.
                <br />
                Please find below the answer to your request.
              </p>
            </div>
          </div>

          {/* Gray band with green check badge */}
          <div className="h-[54px] shrink-0 bg-gradient-to-b from-[#8f949b] to-[#c3c6cb] flex items-center justify-center">
            <div className="w-[30px] h-[30px] rounded-full bg-[#6dbe3a] border-2 border-white flex items-center justify-center">
              <Check className="w-[18px] h-[18px] text-white" strokeWidth={3.5} />
            </div>
          </div>

          {/* Details list */}
          <div className="flex-1 bg-white px-[19px] pt-[21px]">
            <div className="flex flex-col gap-[7.5px]">
              <Row label="Deliverable Id :" value={data.deliverableId} />
              <Row label="Published on :" value={data.publishedOn} />
              <Row label="QR Code Status :" value={data.qrCodeStatus} />
              <Row label="NAME :" value={data.name} className="mt-[5px]" />
              <Row label="ID :" value={data.documentId} className="mt-[4px]" />
              <Row label="ISSUED ON :" value={data.issuedOn} />
              <Row label="VALID UNTIL :" value={data.validUntil} />
              <Row label="TYPE :" value={data.type} />
              <Row label="MODEL :" value={data.model} />
              <Row label="COMPANY :" value={data.company} />
              <Row label="TRAINING LOCATION :" value={data.trainingLocation} />
              <Row label="TRAINER :" value={data.trainer} />
            </div>

            {/* Contact note */}
            <p className="mt-[57px] mb-0 pb-[15px] pr-[24px] text-[9.6px] font-bold leading-[16px] text-black">
              For any further information on this document, please contact the issuer of the document.
            </p>
          </div>

          {/* Footer photo with folded corner and website link */}
          <div className="relative h-[89px] shrink-0 overflow-hidden">
            <img
              src={footerLogo}
              alt="Footer Banner"
              className="block w-full h-full object-cover"
            />

            {/* Folded corner (top-right) */}
            <div
              className="absolute top-0 right-0 w-[34px] h-[30px] bg-white"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
            />

            {/* Website link (bottom-left, centered text) */}
            <a
              href="https://group.bureauveritas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[8px] left-[14px] text-[9.6px] font-bold leading-[11px] text-black text-center no-underline"
            >
              Visit
              <br />
              Bureau Veritas Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}