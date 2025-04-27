// User types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

// Session types
export interface SessionUser {
  id: number;
  email: string;
  name?: string;
  image?: string;
}

// Home types
export interface Home {
  id: number;
  user_id: number;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  bedrooms?: number;
  bathrooms?: number;
  year_built?: number;
  last_remodel?: number;
  sqft?: number;
  roof_area?: number;
  heating?: string;
  ac?: string;
  [key: string]: any; // For any other properties
}

export interface HomeListItem {
  id: number;
  address: string;
}

// Form types
export interface HomeFormData {
  homeName?: string;
  [key: string]: string | undefined;
}

// Chat types
export interface ChatProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  questionInput: string;
  setQuestionInput: (input: string) => void;
  lastQuestion?: string;
  result?: string;
  isLoading: boolean;
}

export interface HomeFactsProps {
  homeFacts: Home;
}

export interface NavbarProps {
  address: string;
  onSelectAddress: (homeId: number) => Promise<void>;
  homeList: HomeListItem[];
}

export interface HomeSelectorProps {
  address: string;
  onSelectAddress: (homeId: number) => Promise<void>;
  homeList: HomeListItem[];
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface NewHomeButtonProps {
  handleClick: () => void;
}

export interface NewHomeProps {
  onSubmit?: (data: HomeFormData) => void;
}

export interface AuthPageProps {}