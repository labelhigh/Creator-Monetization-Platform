import { Blob } from "buffer";

export enum BlockType {
  Hero = 'hero',
  About = 'about',
  Gallery = 'gallery',
  Products = 'products',
  Links = 'links',
  Testimonials = 'testimonials',
  Poll = 'poll',
}

export interface Block {
  id: string;
  type: BlockType;
  content: { [key: string]: any };
  publishDate?: string | null;
  accessLevel?: 'public' | 'members_only';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  creatorType: string;
  monetizationModel: string;
  thumbnailUrl: string;
  blocks: Block[];
}

export interface GuidanceAnswers {
  monetizationGoal: string;
  coreContent: string;
  targetAudience: string;
}

export interface GuidanceReportData {
  productSuggestions: {
    name: string;
    description: string;
    rationale: string;
  }[];
  pricingStrategies: {
    name: string;
    description: string;
    suitability: string;
  }[];
  marketingCopyTemplates: {
    platform: string;
    template: string;
  }[];
  successStories: {
    creatorType: string;
    story: string;
  }[];
}

export interface AIDraft {
  title: string;
  body: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  fileName: string;
  sales: number;
  revenue: number;
}

export interface MembershipTier {
  id:string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  memberCount: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  bookingCount: number;
  revenue: number;
}

export interface CollaborationPreferences {
  openToCollaboration: boolean;
  minRate: number;
  preferredTypes: string[];
}

export interface CollaborationInvite {
  id: string;
  brandName: string;
  brandLogoUrl: string;
  message: string;
  offer: number;
  status: 'pending' | 'accepted' | 'declined';
  dateReceived: string;
}


export type View = 'dashboard' | 'editor' | 'explore' | 'guidance' | 'assistant' | 'products' | 'memberships' | 'services' | 'collaborations';