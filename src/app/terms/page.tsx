import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" className="gap-2 text-muted-foreground" asChild>
            <Link href="/" data-testid="link-terms-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: March 2026</p>

          <p>These Terms of Service ("Terms") govern the use of the Retaind.ai platform and services provided by Retaind.ai Ltd ("Retaind.ai", "we", "our", or "us").</p>
          <p>By accessing or using the platform, you agree to these Terms.</p>
          <p>If you do not agree, you must not use the platform.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Company Information</h2>
          <p>Retaind.ai Ltd is a company registered in England and Wales.</p>
          <p>Registered Office: 9 St. Georges Place Brighton East Sussex England BN1 4GB</p>
          <p>Company Number: 17057531</p>
          <p>Contact: support@retaind.ai</p>
          <p>Website: https://retaind.ai</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Definitions</h2>
          <ul className="space-y-2">
            <li><strong>"Platform"</strong> — The Retaind.ai cloud-based recruitment intelligence platform and associated services.</li>
            <li><strong>"Services"</strong> — All software, tools, reports, analytics, AI outputs, and recruitment campaign functionality provided through the Platform.</li>
            <li><strong>"Campaign"</strong> — A recruitment project created within the platform for the purpose of benchmarking, attracting, assessing, and evaluating candidates.</li>
            <li><strong>"User"</strong> — Any authorised person accessing the Platform.</li>
            <li><strong>"Client Organisation"</strong> — The employer or hiring organisation conducting recruitment campaigns.</li>
            <li><strong>"Recruiter"</strong> — A recruitment agency or recruiter using the platform to run retained recruitment campaigns.</li>
            <li><strong>"Candidate"</strong> — An individual who participates in questionnaires, video interviews, or assessments within a campaign.</li>
            <li><strong>"Content"</strong> — All data, documents, candidate information, responses, reports, and materials submitted or generated within the platform.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Description of the Service</h2>
          <p>Retaind.ai provides a technology platform designed to support evidence-led recruitment campaigns.</p>
          <p>The Platform enables:</p>
          <ul>
            <li>Role benchmarking and requirement capture</li>
            <li>Candidate attraction campaigns</li>
            <li>Behavioural and motivational questionnaires</li>
            <li>Video interview analysis</li>
            <li>AI-generated candidate insight reports</li>
            <li>Benchmark alignment analysis</li>
            <li>Hiring decision support tools</li>
          </ul>
          <p>The Platform provides structured insights and analytical outputs, but does not make hiring decisions or recommendations.</p>
          <p>All recruitment decisions remain the responsibility of the Client Organisation or Recruiter.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">4. User Roles and Permissions</h2>
          <p>Access to the Platform is provided through defined user roles. These may include:</p>
          <ul>
            <li><strong>Recruiter Admin</strong> — Full access to campaigns, reports, and platform functionality.</li>
            <li><strong>Client Representatives / Stakeholders</strong> — Users authorised by a client organisation to contribute to benchmarking or view reports.</li>
            <li><strong>Candidates</strong> — Individuals invited to participate in assessments and interviews. Candidates may only access their own data and tasks.</li>
          </ul>
          <p>Users must not share accounts or allow unauthorised access.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Account Registration</h2>
          <p>To use the Platform, users must create an account and provide accurate information.</p>
          <p>You agree to:</p>
          <ul>
            <li>Maintain accurate account information</li>
            <li>Keep login credentials secure</li>
            <li>Notify Retaind.ai immediately of unauthorised access</li>
          </ul>
          <p>You are responsible for all activity under your account.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Fees and Payment</h2>
          <p>Retaind.ai operates a pay-per-campaign and subscription pricing model.</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Pay-Per-Campaign</h3>
          <p>Recruiters and organisations may create campaigns on a per-campaign basis. The current indicative fee is £285 + VAT per campaign.</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Subscription Plans</h3>
          <p>Optional annual subscription plans may include:</p>
          <ul>
            <li>£295 per month – up to 12 campaigns p/a</li>
            <li>£995 per month – up to 60 campaigns p/a</li>
            <li>£1995 per month – unlimited campaigns</li>
          </ul>
          <p>Fees may change with notice. All payments must be made in accordance with the payment terms specified during purchase. Failure to pay may result in suspension of access.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Acceptable Use</h2>
          <p>Users must not use the Platform to:</p>
          <ul>
            <li>Violate employment or discrimination laws</li>
            <li>Upload unlawful or misleading content</li>
            <li>Interfere with the platform infrastructure</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use the platform to build competing products</li>
          </ul>
          <p>Retaind.ai may suspend accounts that breach these rules.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Candidate Data and Recruitment Compliance</h2>
          <p>Users must ensure that their use of the Platform complies with:</p>
          <ul>
            <li>UK employment law</li>
            <li>Data protection legislation</li>
            <li>Equal opportunity and anti-discrimination regulations</li>
          </ul>
          <p>Retaind.ai provides analytical tools but does not control how hiring decisions are made. Responsibility for compliance remains with the employer or recruiter.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">9. Artificial Intelligence Outputs</h2>
          <p>The Platform may generate AI-assisted outputs including:</p>
          <ul>
            <li>Candidate analysis</li>
            <li>Behavioural insights</li>
            <li>Benchmark alignment reports</li>
            <li>Interview summaries</li>
          </ul>
          <p>These outputs are informational only, are based on available data inputs, and may contain limitations inherent in AI analysis.</p>
          <p>Retaind.ai does not guarantee accuracy or predictive outcomes. Users must apply independent judgment. The platform is designed to support structured evaluation, not replace human decision-making.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">10. Intellectual Property</h2>
          <p>All intellectual property in the Platform belongs to Retaind.ai Ltd. This includes:</p>
          <ul>
            <li>Software</li>
            <li>Algorithms</li>
            <li>Assessment frameworks</li>
            <li>Visualisation tools</li>
            <li>Reports and templates</li>
          </ul>
          <p>Users receive a limited, non-exclusive licence to use the Platform for recruitment activities.</p>
          <p>Users may not copy or resell the software, extract algorithms, or replicate the system architecture.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">11. User Content</h2>
          <p>Users retain ownership of the content they upload to the platform.</p>
          <p>By submitting content, you grant Retaind.ai a licence to process the content, analyse the content, and generate reports and insights. This licence exists solely for delivering the service.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">12. Data Protection</h2>
          <p>Retaind.ai processes personal data in accordance with applicable data protection laws including UK GDPR and the Data Protection Act 2018.</p>
          <p>Our data practices are described in our Privacy Policy.</p>
          <p>Users must ensure that they have the legal right to submit candidate data.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">13. Confidentiality</h2>
          <p>Both parties agree to maintain the confidentiality of any non-public information obtained through use of the Platform.</p>
          <p>Confidential information must not be disclosed without consent except where required by law.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">14. Availability of Service</h2>
          <p>Retaind.ai aims to provide reliable access but does not guarantee uninterrupted service.</p>
          <p>We may perform maintenance, update features, and modify the platform. Where possible, we will provide advance notice of significant downtime.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">15. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Retaind.ai shall not be liable for:</p>
          <ul>
            <li>Hiring decisions made using the platform</li>
            <li>Recruitment outcomes</li>
            <li>Loss of profits</li>
            <li>Loss of business opportunities</li>
            <li>Indirect or consequential damages</li>
          </ul>
          <p>Total liability shall not exceed the fees paid in the previous 12 months.</p>
          <p>Nothing excludes liability for fraud, death or personal injury caused by negligence, or liability that cannot be excluded under law.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">16. Indemnity</h2>
          <p>You agree to indemnify Retaind.ai against claims arising from your misuse of the platform, breach of these Terms, or unlawful use of candidate data.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">17. Termination</h2>
          <p>Retaind.ai may suspend or terminate access if fees are unpaid, these Terms are breached, or the platform is used unlawfully.</p>
          <p>Users may terminate their account at any time. Campaign data may be retained for a limited period for compliance purposes.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">18. Changes to the Service or Terms</h2>
          <p>Retaind.ai may update the Platform or these Terms periodically. Material changes will be communicated via the platform or email. Continued use constitutes acceptance of updated Terms.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">19. Governing Law</h2>
          <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">20. Contact</h2>
          <p>For questions regarding these Terms: <a href="mailto:support@retaind.ai" className="text-foreground hover:underline">support@retaind.ai</a></p>
        </div>
      </div>
    </div>
  );
}
