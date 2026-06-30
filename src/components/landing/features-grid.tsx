"use client";
import { Share2, FileText, UploadCloud, Wand2, Target, Video, FileBarChart, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";
import { useReveal } from "@/components/landing/use-reveal";

const agencyFeatures = [
  {
    icon: <Share2 className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Multi-Channel Marketing",
    description: "Generate inbound inquiries with intelligent marketing campaigns across email and LinkedIn."
  },
  {
    icon: <FileText className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Sales Collateral Library",
    description: "Access ready-to-use templates, case studies, video and proposals to convert inquiries into retained campaigns."
  },
  {
    icon: <UploadCloud className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Job Board Distribution",
    description: "Post agency or client branded job adverts to Indeed, Totaljobs, Reed & CV Library with one click."
  },
  {
    icon: <Wand2 className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "AI Campaign Generation",
    description: "Automatically create compelling job adverts and campaign brochures from company info and job descriptions."
  },
  {
    icon: <Target className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Behavioral Benchmarking",
    description: "Establish cultural and behavioral benchmarks to assess candidate-client compatibility with precision."
  },
  {
    icon: <Video className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "AI Video Interviews",
    description: "Select In-Person or AI avatar to deliver competency-based interview questions. Let our AI Psychometric Agent analyse responses and generate detailed assessment reports."
  }
];

const inhouseFeatures = [
  {
    icon: <Wand2 className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "AI Job Advert Generation",
    description: "Transform job specs into compelling adverts that attract top talent. Triple your application rates with AI-optimized copy."
  },
  {
    icon: <UploadCloud className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Multi-Platform Job Posting",
    description: "Post to Indeed, Totaljobs, Reed & CV Library with one click. Save hours on manual postings."
  },
  {
    icon: <FileBarChart className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Campaign Brochure Tool",
    description: "Create beautiful employer brand brochures with company culture, testimonials, and employee stories."
  },
  {
    icon: <Target className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Behavioral Benchmarking",
    description: "Multi-stakeholder alignment ensures everyone agrees on the ideal candidate profile before you start."
  },
  {
    icon: <ClipboardCheck className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "Candidate Questionnaires",
    description: "Assess candidates against your benchmark. See fit scores, conflict areas, and development opportunities."
  },
  {
    icon: <Video className="w-5 h-5 text-foreground" />,
    iconBg: "bg-muted",
    title: "AI Video Interviews",
    description: "Select In-Person or AI avatar to deliver competency-based interview questions. Let our AI Psychometric Agent analyse responses and generate detailed assessment reports."
  }
];

export function FeaturesGrid({ selectedAudience }: { selectedAudience: Audience }) {
  const features = selectedAudience === "inhouse" ? inhouseFeatures : agencyFeatures;
  const scope = useReveal();

  return (
    <Section className="bg-background pt-0">
      <SectionHeader>
        <h2 className="text-4xl md:text-5xl mb-6">
          {selectedAudience === "inhouse" ? "Streamlined Hiring Workflow" : "Win and manage multiple Retaind campaigns - with ease"}
        </h2>
        <p className="text-lg text-muted-foreground">
          {selectedAudience === "inhouse"
            ? "From job posting to final hire, our AI-powered tools ensure you find the right cultural fit every time."
            : "Transition away from contingency recruitment. From lead generation to candidate assessment, the Retaind platform handles every step of your retained recruitment process."
          }
        </p>
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={scope}>
        {features.map((feature, idx) => (
          <Card key={idx} className="p-6 hover-elevate transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" data-testid={`card-feature-${idx}`}>
            <div data-reveal>
              <div className={`w-11 h-11 rounded-md ${feature.iconBg} flex items-center justify-center mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
