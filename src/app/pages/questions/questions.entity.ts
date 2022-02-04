import {Section} from '../section/section.entity';

export interface Question {
  id: string;
  question: string;
  section: Partial<Section>;
  sectionId: string;
  weight: string;
  created: string;
}
