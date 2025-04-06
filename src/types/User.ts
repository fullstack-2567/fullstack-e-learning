export type User = {
    userId: string;
    email: string;
    createdAT: Date;
    updatedAT: Date;
    role: UserRole;
    sex: Gender;
    firstName: string;
    lastName: string;
    birthDate: Date;
    prefix: Prefix;
    education: Education;
    tel: string;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    PROJECT_APPROVER = 'project-approver'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum Prefix {
    MASTER = 'master',
    MISS = 'miss',
    MR = 'mr',
    MRS = 'mrs',
    MS = 'ms'
}

export enum Education {
    ELEMENTARY = 'elementary',
    SECONDARY = 'secondary',
    BACHELOR = 'bachelor',
    MASTER = 'master',
    DOCTORAL = 'doctoral',
    VOCATIONAL_CERTIFICATE = 'vocational_certificate',
    HIGH_VOCATIONAL_CERTIFICATE = 'high_vocational_certificate'
}