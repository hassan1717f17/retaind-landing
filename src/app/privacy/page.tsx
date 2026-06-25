import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" className="gap-2 text-muted-foreground" asChild>
            <Link href="/" data-testid="link-privacy-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-privacy-title">Global Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-1">(UK GDPR / EU GDPR / US Privacy Laws)</p>
          <p className="text-sm text-muted-foreground mb-8">Retaind.ai Ltd — Last updated: March 2026</p>

          <p>This Privacy Policy explains how Retaind.ai Ltd ("Retaind.ai", "we", "our", or "us") collects, uses, processes, and protects personal data when individuals interact with the Retaind.ai recruitment intelligence platform.</p>
          <p>This policy applies globally and is designed to comply with:</p>
          <ul>
            <li>UK GDPR &amp; Data Protection Act 2018</li>
            <li>EU General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA) / CPRA</li>
            <li>Applicable US employment and privacy laws</li>
            <li>EU Artificial Intelligence Act transparency obligations</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Who We Are</h2>
          <p>Retaind.ai Ltd operates the Retaind.ai recruitment intelligence platform, which enables organisations and recruiters to conduct structured recruitment campaigns.</p>
          <p>Contact: <a href="mailto:privacy@retaind.ai" className="text-foreground hover:underline">privacy@retaind.ai</a></p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Categories of Personal Data Collected</h2>
          <p>We collect personal data in the following categories.</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Account Data</h3>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Job title</li>
            <li>Organisation name</li>
            <li>Login credentials</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Candidate Data</h3>
          <p>Where individuals participate in recruitment campaigns:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Curriculum vitae or employment history</li>
            <li>Education and qualifications</li>
            <li>Skills and experience</li>
            <li>Questionnaire responses</li>
            <li>Behavioural assessment responses</li>
            <li>Video interview recordings</li>
            <li>Interview transcripts</li>
            <li>Candidate evaluation reports</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Technical Data</h3>
          <ul>
            <li>IP address</li>
            <li>Device identifiers</li>
            <li>Browser type</li>
            <li>Platform usage logs</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Sources of Personal Data</h2>
          <p>Personal data may be obtained from:</p>
          <ul>
            <li>the individual directly</li>
            <li>recruiting organisations</li>
            <li>recruiters using the platform</li>
            <li>integrations with applicant tracking systems</li>
            <li>publicly available professional information (where permitted)</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Purpose of Processing</h2>
          <p>Personal data is processed to:</p>
          <ul>
            <li>provide recruitment assessment tools</li>
            <li>conduct benchmarking and role alignment analysis</li>
            <li>generate candidate evaluation reports</li>
            <li>administer recruitment campaigns</li>
            <li>maintain system security</li>
            <li>comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Legal Basis for Processing</h2>
          <p>Under GDPR frameworks we rely on the following legal bases:</p>
          <ul>
            <li><strong>Contractual Necessity</strong> — Processing required to provide platform services.</li>
            <li><strong>Legitimate Interests</strong> — Employers and recruiters have a legitimate interest in evaluating candidates for employment.</li>
            <li><strong>Consent</strong> — Certain processing activities such as video recording and AI-assisted analysis rely on explicit candidate consent.</li>
            <li><strong>Legal Obligations</strong> — Where processing is required by law.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Automated Processing and AI Transparency</h2>
          <p>Retaind.ai uses AI-assisted technologies to analyse recruitment information. These technologies may:</p>
          <ul>
            <li>summarise interview responses</li>
            <li>analyse behavioural questionnaire results</li>
            <li>identify alignment with role benchmarks</li>
          </ul>
          <p>However:</p>
          <ul>
            <li>the system does not make automated hiring decisions</li>
            <li>the system does not automatically reject candidates</li>
            <li>final hiring decisions are made by human recruiters or employers</li>
          </ul>
          <p>This approach complies with GDPR Article 22 (Automated Decision-Making), EU AI Act transparency requirements, and US EEOC guidance on AI hiring tools.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Data Sharing</h2>
          <p>We do not sell personal data.</p>
          <p>Personal data may be shared with:</p>
          <ul>
            <li>authorised client organisations</li>
            <li>recruitment agencies</li>
            <li>cloud hosting providers</li>
            <li>service providers supporting platform functionality</li>
            <li>regulators where legally required</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">8. International Data Transfers</h2>
          <p>Data may be transferred internationally where required for service delivery. Where data is transferred outside the UK or EEA, we implement safeguards including:</p>
          <ul>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>secure hosting infrastructure</li>
            <li>contractual privacy protections</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">9. Data Retention</h2>
          <p>Personal data is retained only as long as necessary. Typical retention periods:</p>
          <ul>
            <li><strong>Candidate assessment data</strong> — 12–24 months</li>
            <li><strong>Account data</strong> — Until account deletion</li>
          </ul>
          <p>Retention periods may vary based on local employment laws.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">10. Individual Rights</h2>
          <p>Depending on jurisdiction, individuals may have the right to:</p>
          <ul>
            <li>access personal data</li>
            <li>correct inaccurate information</li>
            <li>request deletion</li>
            <li>restrict processing</li>
            <li>object to processing</li>
            <li>request data portability</li>
          </ul>
          <p>California residents may additionally request disclosure of categories of personal data collected, deletion of personal data, and opt-out of data sale (Retaind.ai does not sell data).</p>
          <p>Requests may be submitted to: <a href="mailto:support@retaind.ai" className="text-foreground hover:underline">support@retaind.ai</a></p>

          <h2 className="text-xl font-bold mt-8 mb-3">11. Security</h2>
          <p>We implement technical and organisational security measures including:</p>
          <ul>
            <li>encryption</li>
            <li>access controls</li>
            <li>audit logging</li>
            <li>secure cloud infrastructure</li>
            <li>role-based access permissions</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">12. Complaints</h2>
          <p>Individuals in the UK may contact the ICO. EU residents may contact their local supervisory authority. US residents may contact relevant state regulators.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">13. Changes to This Policy</h2>
          <p>This policy may be updated periodically. Updates will be published on the website.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Data Processing Agreement (Global DPA)</h1>
          <p>This Data Processing Agreement ("DPA") forms part of the Retaind.ai Terms of Service. It governs the processing of personal data under GDPR, UK GDPR, US privacy laws, and EU AI Act obligations for high-risk AI systems.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Roles</h2>
          <ul>
            <li><strong>Controller</strong> — The organisation using the platform to evaluate candidates.</li>
            <li><strong>Processor</strong> — Retaind.ai Ltd.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Scope of Processing</h2>
          <p>The processor will process personal data solely to deliver the platform services. Processing activities include:</p>
          <ul>
            <li>storage of recruitment data</li>
            <li>behavioural assessment analysis</li>
            <li>video interview transcription</li>
            <li>AI-assisted insight generation</li>
            <li>candidate reporting</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Categories of Data Subjects</h2>
          <ul>
            <li>job applicants</li>
            <li>recruiters</li>
            <li>client organisation staff</li>
            <li>platform users</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Categories of Personal Data</h2>
          <p>May include:</p>
          <ul>
            <li>identification data</li>
            <li>employment history</li>
            <li>questionnaire responses</li>
            <li>behavioural assessment data</li>
            <li>video interview recordings</li>
            <li>interview transcripts</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Processor Obligations</h2>
          <p>The processor agrees to:</p>
          <ul>
            <li>process data only on documented instructions</li>
            <li>ensure staff confidentiality</li>
            <li>maintain appropriate security</li>
            <li>support data subject rights</li>
            <li>notify breaches promptly</li>
            <li>delete or return data upon request</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Subprocessors</h2>
          <p>Retaind.ai may use subprocessors for cloud infrastructure, AI processing services, transcription services, and analytics platforms. All sub-processors must comply with equivalent data protection obligations.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Data Breach Notification</h2>
          <p>Retaind.ai will notify the controller without undue delay after becoming aware of a data breach.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Assistance to Controller</h2>
          <p>The processor will assist controllers with data subject rights requests, regulatory investigations, impact assessments, and compliance with AI transparency obligations.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">9. Data Protection Impact Assessments</h2>
          <p>Where required under GDPR or AI regulations, the processor will support controllers in performing Data Protection Impact Assessments (DPIAs).</p>

          <h2 className="text-xl font-bold mt-8 mb-3">10. Data Deletion</h2>
          <p>Upon termination of services, data will be deleted or returned unless required by law to retain.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Candidate Consent and AI Transparency Statement</h1>
          <p>(EU AI Act + GDPR + US AI Hiring Laws)</p>
          <p>Before participating in a recruitment campaign using Retaind.ai, candidates must acknowledge this notice.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Purpose</h2>
          <p>The platform assists employers in evaluating candidates through structured recruitment assessments.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Data Collected</h2>
          <p>Candidates may be asked to provide:</p>
          <ul>
            <li>CV information</li>
            <li>questionnaire responses</li>
            <li>behavioural assessment responses</li>
            <li>video interview responses</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. AI-Assisted Analysis</h2>
          <p>The platform uses artificial intelligence tools to analyse recruitment information. These tools may generate interview summaries, behavioural insights, and alignment analysis with role benchmarks.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Human Decision-Making</h2>
          <p>AI tools provide decision support only. They do not automatically accept candidates, automatically reject candidates, or determine employment outcomes. All hiring decisions are made by human recruiters or employers.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Video Interview Recording</h2>
          <p>Video interviews may be recorded and transcribed. Recordings may be analysed to identify behavioural evidence relevant to the role.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Transparency Requirements</h2>
          <p>This notice is provided to comply with GDPR automated processing transparency rules, EU AI Act transparency requirements, and US automated employment decision tool regulations.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Candidate Rights</h2>
          <p>Candidates may request access to their data, request correction, request deletion, and withdraw consent where applicable. Withdrawal of consent may prevent continuation in the recruitment process.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Consent Confirmation</h2>
          <p>By proceeding with the recruitment assessment you confirm that:</p>
          <ul>
            <li>you understand that AI-assisted tools are used</li>
            <li>you consent to the processing of your data for recruitment evaluation</li>
            <li>you understand hiring decisions are made by humans</li>
          </ul>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Acceptable AI Use Policy</h1>
          <p>(EU AI Act + US AI Hiring Laws + EEOC)</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Purpose</h2>
          <p>This policy governs the responsible use of artificial intelligence within the Retaind.ai platform. The platform is designed to support evidence-based recruitment evaluation while maintaining fairness and human oversight.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Permitted Uses</h2>
          <p>Users may use AI features for candidate behavioural analysis, interview summarisation, benchmarking comparisons, and candidate evaluation reporting.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Prohibited Uses</h2>
          <p>Users must not use the platform to:</p>
          <ul>
            <li>make fully automated hiring decisions</li>
            <li>discriminate against candidates unlawfully</li>
            <li>infer protected characteristics</li>
            <li>profile candidates using demographic attributes</li>
            <li>attempt psychological diagnosis</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Fair Hiring Compliance</h2>
          <p>Users must ensure hiring practices comply with Equal Employment Opportunity laws, anti-discrimination legislation, and fair hiring standards.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Human Oversight</h2>
          <p>All AI outputs must be reviewed by human decision-makers. The platform is designed to support human judgment rather than replace it.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Bias Mitigation</h2>
          <p>Retaind.ai aims to minimise bias through structured benchmarking frameworks, consistent evaluation criteria, and transparent reporting structures. Users remain responsible for ensuring fair hiring practices.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Transparency to Candidates</h2>
          <p>Users must inform candidates when AI-assisted analysis is used and when interviews may be analysed by automated tools.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Compliance Monitoring</h2>
          <p>Retaind.ai may monitor platform usage to ensure compliance with this policy. Misuse may result in account suspension.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">AI Risk Management Framework</h1>
          <p>(EU AI Act Article 9 compliant)</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Purpose</h2>
          <p>This framework establishes the procedures used by Retaind.ai to identify, assess, mitigate, and monitor risks associated with the use of artificial intelligence within the Retaind.ai recruitment platform.</p>
          <p>The framework is designed to comply with EU AI Act (High-Risk AI Systems), UK AI Regulatory Principles, US employment AI guidelines (EEOC, FTC), and ISO 23894 AI Risk Management concepts.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Scope</h2>
          <p>This framework applies to all AI components within the Retaind.ai platform including behavioural assessment analysis, candidate benchmarking comparisons, interview transcript analysis, candidate evaluation reporting, and alignment and conflict detection models. These systems are used to support recruitment decisions but do not autonomously make hiring decisions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Risk Categories</h2>
          <p>Retaind.ai evaluates risks across five primary domains:</p>
          <ul>
            <li><strong>Fundamental Rights Risk</strong> — Potential risk of unfair or discriminatory treatment of candidates (biased scoring outcomes, unequal impact across demographic groups, opaque algorithmic decision logic).</li>
            <li><strong>Data Risk</strong> — Risk arising from poor data quality or misuse of personal data (incomplete candidate data, inaccurate transcripts, training data bias).</li>
            <li><strong>Model Risk</strong> — Risk associated with AI model behaviour (model drift, inaccurate inference, over-generalisation).</li>
            <li><strong>Operational Risk</strong> — Risk associated with system implementation (incorrect benchmarking configuration, misinterpretation of AI insights, misuse of outputs).</li>
            <li><strong>Governance Risk</strong> — Risk arising from lack of transparency or oversight (automated decisions without human review, inadequate documentation, failure to audit system outputs).</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Risk Mitigation Measures</h2>
          <p>Retaind.ai implements mitigation measures including:</p>
          <ul>
            <li><strong>Structured Benchmarking</strong> — Candidate evaluation is based on pre-defined role benchmarks, reducing subjective bias.</li>
            <li><strong>Multi-source Evaluation</strong> — The system integrates multiple inputs including CV data, behavioural questionnaires, and structured interview responses, reducing reliance on single signals.</li>
            <li><strong>Neutral Reporting</strong> — AI outputs highlight alignment areas and areas for further exploration. The system never recommends hiring decisions.</li>
            <li><strong>Human Decision Authority</strong> — Human recruiters and hiring managers retain final decision-making responsibility.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Continuous Monitoring</h2>
          <p>Risk monitoring processes include model performance monitoring, fairness testing, anomaly detection, and audit logging. Risk reviews occur at least annually or after significant system updates.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Incident Reporting</h2>
          <p>Any identified AI-related risk or incident will trigger a risk assessment, internal investigation, mitigation plan, and documentation update. Serious incidents will be reported to regulators where required.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Algorithmic Fairness and Bias Mitigation Policy</h1>
          <p>(EU AI Act Article 10 + EEOC guidance)</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Fairness Principles</h2>
          <p>The Retaind.ai platform is designed to minimise bias in candidate evaluation, ensure transparent evaluation criteria, and support fair hiring practices.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Prohibited AI Behaviours</h2>
          <p>The system must not infer protected characteristics, use demographic information in scoring, perform facial recognition or emotion detection, or generate psychological diagnoses.</p>
          <p>Protected characteristics include race, gender, religion, disability, sexual orientation, and age.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Bias Testing Procedures</h2>
          <p>Bias testing is performed periodically to detect adverse impact. Tests may include:</p>
          <ul>
            <li><strong>Statistical Parity Analysis</strong> — Evaluate whether candidate outcomes disproportionately impact protected groups.</li>
            <li><strong>Disparate Impact Analysis</strong> — Assess whether model outputs violate the four-fifths rule used by US employment law.</li>
            <li><strong>Benchmark Sensitivity Testing</strong> — Test whether slight variations in benchmark definitions disproportionately affect candidate scoring.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Data Integrity</h2>
          <p>Bias mitigation also includes validating data quality, monitoring transcript accuracy, and removing irrelevant signals.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Model Updates</h2>
          <p>When bias risks are detected, models may be retrained, scoring thresholds adjusted, and system logic updated.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Transparency</h2>
          <p>Users must understand that AI provides analytical insights and final decisions remain human-led.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">AI System Technical Documentation</h1>
          <p>(EU AI Act Article 11)</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. System Overview</h2>
          <p>The Retaind.ai system provides AI-assisted recruitment analysis designed to support structured hiring processes. The system integrates candidate CV analysis, behavioural questionnaires, video interview transcripts, and role benchmarking models.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Intended Purpose</h2>
          <p>The system is intended to assist recruiters in evaluating candidate alignment with defined role benchmarks, highlight areas of alignment and potential tension, and provide structured interview insights. The system is not designed to automatically determine employment outcomes.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">3. System Architecture</h2>
          <ul>
            <li><strong>Data Processing Layer</strong> — Handles candidate inputs including CV data, questionnaire responses, and interview transcripts.</li>
            <li><strong>Benchmarking Engine</strong> — Creates role benchmark profiles based on job characteristics, personal characteristics, and motivational drivers.</li>
            <li><strong>Alignment Analysis Engine</strong> — Compares candidate responses with benchmark characteristics. Outputs include alignment scores, correlation indicators, and conflict areas.</li>
            <li><strong>Reporting Engine</strong> — Generates structured reports highlighting skills alignment, behavioural alignment, and areas for further exploration.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Training Data</h2>
          <p>The system uses structured behavioural frameworks, validated psychometric concepts, and rule-based scoring mechanisms. The platform does not rely on demographic data.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Limitations</h2>
          <p>AI outputs may be influenced by quality of input data, incomplete candidate responses, and interpretation of behavioural evidence. Outputs are therefore advisory only.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Security Controls</h2>
          <p>The platform implements encrypted storage, role-based access control, and system monitoring.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Compliance</h2>
          <p>The system is designed to align with EU AI Act transparency principles, GDPR data protection obligations, and US AI hiring regulatory guidance.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Human Oversight Policy</h1>
          <p>(EU AI Act Article 14)</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Purpose</h2>
          <p>This policy ensures that AI outputs generated by the platform remain subject to meaningful human oversight.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Principle of Human Control</h2>
          <p>AI-generated insights are decision-support tools. They must not replace human judgment.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Human Oversight Responsibilities</h2>
          <p>Recruiters and hiring managers must review AI-generated reports, interpret insights within organisational context, and conduct interviews before making hiring decisions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Decision-Making Authority</h2>
          <p>Only authorised human decision-makers may shortlist candidates, reject candidates, or extend job offers.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Review of AI Outputs</h2>
          <p>Users must treat AI outputs as evidence indicators, areas for further exploration, and structured insights. They must not be interpreted as deterministic conclusions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">6. Escalation of Concerns</h2>
          <p>Where AI outputs appear inconsistent or misleading, users should review source data, conduct additional interviews, and consult internal hiring teams.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">7. Training and Awareness</h2>
          <p>Users should receive guidance on interpreting AI-generated reports, avoiding over-reliance on AI insights, and ensuring fair hiring practices.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">8. Continuous Oversight</h2>
          <p>Retaind.ai monitors system outputs to ensure transparency, fairness, and compliance with applicable regulations.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">AI Governance Charter</h1>
          <p>Retaind.ai Ltd</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Purpose</h2>
          <p>This AI Governance Charter defines the principles, responsibilities, and governance structure governing the design, deployment, and oversight of artificial intelligence within the Retaind.ai platform.</p>
          <p>The charter ensures that AI technologies used in recruitment operate in a manner that is lawful, fair, transparent, accountable, and human-controlled.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Scope</h2>
          <p>This charter applies to all AI technologies deployed within the Retaind.ai platform, including systems used for candidate behavioural analysis, benchmarking alignment analysis, interview transcript interpretation, and structured candidate reporting. These systems assist recruitment processes but do not autonomously make hiring decisions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Core AI Governance Principles</h2>
          <ul>
            <li><strong>Human Authority</strong> — AI systems must support human decision-making rather than replace it. Final hiring decisions are always made by human recruiters or employers.</li>
            <li><strong>Fairness and Non-Discrimination</strong> — The system must not intentionally or unintentionally discriminate, infer protected characteristics, or use demographic profiling for hiring outcomes.</li>
            <li><strong>Transparency</strong> — Users and candidates must understand when AI tools are used in recruitment processes. The purpose and limitations of AI outputs must be communicated clearly.</li>
            <li><strong>Accountability</strong> — Retaind.ai retains responsibility for system design, risk mitigation, and governance procedures. Organisations using the platform retain responsibility for hiring decisions.</li>
            <li><strong>Privacy and Data Protection</strong> — All AI systems must comply with applicable data protection laws. Personal data must be processed only where lawful and necessary.</li>
            <li><strong>Safety and Reliability</strong> — AI systems must be designed to minimise error, provide explainable outputs, and avoid deterministic conclusions.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Governance Structure</h2>
          <p>AI governance responsibilities are shared across:</p>
          <ul>
            <li><strong>Executive Oversight</strong> — Responsible for strategic AI governance and compliance.</li>
            <li><strong>Product &amp; Engineering</strong> — Responsible for model design, technical safeguards, and system testing.</li>
            <li><strong>Compliance &amp; Legal</strong> — Responsible for regulatory compliance, privacy oversight, and documentation and audits.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Review and Oversight</h2>
          <p>AI governance practices are reviewed periodically. Major platform updates trigger governance review and risk reassessment.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Continuous Improvement</h2>
          <p>Retaind.ai commits to continuously improving AI systems through monitoring, stakeholder feedback, and regulatory guidance updates.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">AI Model Risk Audit Framework</h1>

          <h2 className="text-xl font-bold mt-8 mb-3">Purpose</h2>
          <p>This framework establishes procedures for auditing AI systems used within the Retaind.ai platform. The objective is to ensure models remain accurate, fair, reliable, and compliant with regulations.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Audit Frequency</h2>
          <p>AI systems are reviewed annually, following major system updates, and after incidents or anomalies.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Audit Categories</h2>
          <ul>
            <li><strong>Data Quality Audit</strong> — Evaluate data quality, completeness, bias risk, and representativeness.</li>
            <li><strong>Model Performance Audit</strong> — Evaluate prediction consistency, stability across candidate populations, and model drift.</li>
            <li><strong>Fairness Audit</strong> — Evaluate disparate impact, bias indicators, and fairness metrics.</li>
            <li><strong>Explainability Audit</strong> — Evaluate whether system outputs remain understandable to users.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Audit Process</h2>
          <ol>
            <li>Review training data sources</li>
            <li>Test model outputs across varied scenarios</li>
            <li>Evaluate fairness indicators</li>
            <li>Document findings and remediation</li>
          </ol>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Remediation Procedures</h2>
          <p>Where audit findings reveal risks, models may be retrained, scoring logic adjusted, and governance controls updated.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Documentation</h2>
          <p>All audits are documented for regulatory review.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">AI Incident Response Plan</h1>

          <h2 className="text-xl font-bold mt-8 mb-3">1. Definition of AI Incident</h2>
          <p>An AI incident may include biased or discriminatory outcomes, incorrect system outputs, data integrity failures, misuse of AI functionality, or security breaches affecting AI systems.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">2. Incident Severity Levels</h2>
          <ul>
            <li><strong>Level 1 – Minor Issue</strong> — Non-critical issue affecting limited functionality.</li>
            <li><strong>Level 2 – Moderate Issue</strong> — Issue affecting accuracy or reliability of outputs.</li>
            <li><strong>Level 3 – Critical Incident</strong> — Issue that may affect candidate rights or regulatory compliance.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3">3. Incident Response Process</h2>
          <ol>
            <li><strong>Detection</strong> — Incident identified via user reports, internal monitoring, or audit processes.</li>
            <li><strong>Initial Assessment</strong> — Evaluate severity, impact, and affected users.</li>
            <li><strong>Containment</strong> — Actions may include disabling affected features or isolating system components.</li>
            <li><strong>Investigation</strong> — Investigate root cause including data errors, model behaviour, or operational misuse.</li>
            <li><strong>Remediation</strong> — Implement corrective actions such as model updates, system fixes, or governance updates.</li>
            <li><strong>Notification</strong> — Where legally required, regulators may be notified and affected organisations informed.</li>
          </ol>

          <h2 className="text-xl font-bold mt-8 mb-3">4. Post-Incident Review</h2>
          <p>After incident resolution: root cause analysis performed, governance documentation updated, and additional safeguards implemented.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">5. Continuous Monitoring</h2>
          <p>AI systems are regularly monitored to detect anomalies, unexpected outcomes, and model drift.</p>

          <hr className="my-12 border-border" />

          <h1 className="text-2xl font-bold text-foreground mb-4">Responsible AI Statement for Hiring Technology</h1>

          <h2 className="text-xl font-bold mt-8 mb-3">Our Commitment</h2>
          <p>At Retaind.ai, we believe artificial intelligence should enhance human decision-making, not replace it.</p>
          <p>Our platform is designed to support fairer, more structured, and evidence-based recruitment processes, helping organisations make better hiring decisions while protecting candidate rights and promoting transparency.</p>
          <p>We recognise that recruitment technologies can significantly impact individuals' careers and opportunities. For this reason, we are committed to developing and deploying AI systems responsibly, ethically, and in compliance with applicable laws and standards.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Human-Centred Decision Making</h2>
          <p>Retaind.ai systems are designed to assist recruiters and hiring managers by providing structured insights into candidate information. Our platform does not automatically accept or reject candidates, and it does not make employment decisions. All hiring decisions remain under the control of human decision-makers.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Fairness and Non-Discrimination</h2>
          <p>We are committed to ensuring our technology supports fair hiring practices. Our systems are designed to:</p>
          <ul>
            <li>avoid using protected characteristics in candidate evaluation</li>
            <li>minimise bias through structured benchmarking processes</li>
            <li>ensure consistent evaluation criteria across candidates</li>
            <li>support transparency in how candidate insights are generated</li>
          </ul>
          <p>We do not use AI to infer sensitive attributes such as race, gender, religion, or other protected characteristics.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Transparency</h2>
          <p>We believe candidates and employers should understand when AI tools are used in recruitment processes. Retaind.ai supports transparency by informing candidates when AI-assisted analysis may be used, explaining the purpose of AI-generated insights, and ensuring outputs are presented as structured analysis rather than deterministic judgments.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Privacy and Data Protection</h2>
          <p>We prioritise the responsible handling of personal data. Our systems are designed to comply with the EU General Data Protection Regulation (GDPR), UK GDPR and the Data Protection Act, and applicable US privacy regulations. We minimise data collection and ensure personal information is used only for legitimate recruitment purposes.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Accountability and Governance</h2>
          <p>Responsible AI requires strong governance. Retaind.ai maintains internal frameworks to oversee the design and operation of our AI systems, including AI risk management procedures, bias testing and fairness monitoring, model documentation and audit processes, and human oversight controls. These governance measures help ensure our technology operates safely, fairly, and transparently.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Continuous Monitoring and Improvement</h2>
          <p>AI systems require ongoing evaluation. We monitor our systems to ensure they continue to operate as intended and to identify opportunities for improvement. Where potential risks or limitations are identified, we take appropriate action to mitigate them and strengthen our safeguards.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Our Role in the Hiring Process</h2>
          <p>Retaind.ai provides structured insights that support recruitment decisions. Our platform helps organisations define clearer role benchmarks, assess candidate alignment with role requirements, structure interview evaluation, and reduce reliance on subjective hiring decisions. However, our technology does not replace professional judgment. Employers and recruiters remain responsible for final hiring decisions.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Responsible Use by Organisations</h2>
          <p>Organisations using the Retaind.ai platform are expected to maintain fair and lawful hiring practices, ensure human oversight of AI outputs, and communicate transparently with candidates about recruitment processes. Responsible AI requires collaboration between technology providers and employers.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Our Ongoing Commitment</h2>
          <p>As AI technologies continue to evolve, we remain committed to improving our systems and governance practices. We will continue to monitor regulatory developments and industry standards to ensure our technology remains aligned with best practices for responsible AI in recruitment.</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
          <p>Questions about our responsible AI practices can be directed to:</p>
          <p>Retaind.ai Ltd — <a href="mailto:support@retaind.ai" className="text-foreground hover:underline">support@retaind.ai</a></p>
        </div>
      </div>
    </div>
  );
}
