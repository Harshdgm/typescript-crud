"use client";

export default function CompanyMap() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        title="company-location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.0462954935084!2d72.8685079!3d21.2351106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f035606410b%3A0xfc5d05395aeb3f56!2sThe%20Moon%20Cafe!5e0!3m2!1sen!2sin!4v1709123456789"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
