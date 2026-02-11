export default function PrivacyPage() {
  return (
    <div className="container px-4 py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: February 11, 2026
      </p>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 mb-8">
        <p className="text-sm text-muted-foreground">
          <strong>Important Notice:</strong> This privacy policy is provided as general information and is not legal advice. 
          For specific legal guidance regarding your privacy rights or obligations, please consult with a qualified attorney.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to Online Free Tools. We are committed to protecting your privacy and ensuring transparency about how we handle information. 
            This Privacy Policy explains our practices regarding data collection, use, and protection when you use our website and tools.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Information You Provide</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When you use our contact form or interact with certain features, you may provide:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Name and email address (when contacting us)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Any information you choose to include in messages or feedback</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When you visit our website, we may automatically collect:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Browser type and version</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Device information and operating system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>IP address and general location data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Pages visited and time spent on our site</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Files and Data You Process</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Important:</strong> All files you upload or process using our tools are handled entirely within your browser. 
            We do not upload, store, access, or transmit your files to our servers or any third party. Your data remains on your device at all times.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">How We Use Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We use collected information to:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Provide, maintain, and improve our services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Respond to your inquiries and support requests</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Analyze usage patterns to enhance user experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Detect and prevent technical issues or abuse</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Comply with legal obligations</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We may use cookies and similar technologies to:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Remember your preferences and settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Analyze site traffic and usage patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Improve site functionality and performance</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            You can control cookies through your browser settings. Note that disabling cookies may affect some site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. 
            We encourage you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period 
            is required by law. Since our tools process files locally in your browser, we do not retain any of your processed files or their contents.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement reasonable security measures to protect information from unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, 
            we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. 
            If you believe we have inadvertently collected such information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">International Users</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are hosted on decentralized infrastructure. By using our services, you consent to the transfer and processing of your 
            information as described in this policy, regardless of your location.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Your Rights and Choices</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-6">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Access to the personal information we hold about you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Correction of inaccurate or incomplete information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Deletion of your personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Objection to or restriction of certain processing activities</span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            To exercise these rights, please contact us using the information provided below.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page 
            and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="bg-muted/30 p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us through our{' '}
            <a href="/contact" className="text-primary hover:underline font-medium">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
