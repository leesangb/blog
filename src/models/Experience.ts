export interface Experience {
    company: string;
    logo: string;
    title: string;
    beginDate: Date;
    endDate?: Date;
    location: string;
    employmentType: string;
    description: string;
    fullDescription?: string;
    skills: string[];
    website?: string;
}
