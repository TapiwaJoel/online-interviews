import {Section} from '../section/section.entity';

export interface Interview {
  id: string;
  name: string;
  section: Partial<Section>;
  sectionId: string;
  status: string;
  created: string;
  updated: string;
}
