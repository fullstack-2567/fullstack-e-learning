import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface ChildProjectsDto {
            /**
             * Number of normal projects
             */
            normal: number;
            /**
             * Number of child projects
             */
            child: number;
        }
        export interface Content {
            /**
             * Unique identifier of the content
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            contentId: string; // uuid
            /**
             * Name of the content
             * example:
             * Funny Cat Video
             */
            contentName: string;
            /**
             * Description of the content
             * example:
             * A video showing funny moments of cats
             */
            contentDescription: string;
            /**
             * Category of the content
             * example:
             * Comedy
             */
            contentCategory: "cybersecurity" | "frontend_development" | "backend_development" | "fullstack_development" | "food" | "fashion" | "language";
            /**
             * Thumbnail image file name in storage
             * example:
             * 1232f565-a106-4160-b6d0-9c859877ce9a.jpg
             */
            contentThumbnail: string;
            /**
             * Video file name in storage
             * example:
             * 1232f565-a106-4160-b6d0-9c859877ce9a.mp4
             */
            contentVideo: string;
            /**
             * Video duration in seconds
             * example:
             * 60
             */
            videoDuration: number;
            /**
             * Is the content publicly available
             * example:
             * true
             */
            isPublic: boolean;
            /**
             * ID of the user who created the content
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            createdByUserId: string; // uuid
            /**
             * User who created the content
             */
            createdByUser: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * Creation date of the content
             * example:
             * 2024-01-01T10:00:00Z
             */
            createdDT: string; // date-time
            /**
             * Last update date of the content
             * example:
             * 2024-01-15T12:00:00Z
             */
            updatedDT: string; // date-time
        }
        export interface ContentCategoriesDataDto {
            categories: ContentCategoryDto[];
        }
        export interface ContentCategoriesResponseDto {
            /**
             * Status of the response
             */
            status: string;
            data: ContentCategoriesDataDto;
        }
        export interface ContentCategoryDto {
            /**
             * Name of the content category
             */
            category: string;
            /**
             * Number of contents in this category
             */
            contentCount: number;
        }
        export interface ContentsReportDto {
            /**
             * The unique identifier of the content/course
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            id: string;
            /**
             * The title of the content/course
             * example:
             * Introduction to Web Development
             */
            title: string;
            /**
             * Number of students enrolled in the course
             * example:
             * 50
             */
            studentsEnrolled: number;
            /**
             * Number of students who have completed the course
             * example:
             * 30
             */
            studentsCompleted: number;
        }
        export interface CreateContentDto {
            /**
             * Content name
             */
            contentName: string;
            /**
             * Content thumbnail (base64)
             */
            contentThumbnail: string;
            /**
             * Content video link (base64)
             */
            contentVideo: string;
            /**
             * Content category
             */
            contentCategory: "cybersecurity" | "frontend_development" | "backend_development" | "fullstack_development" | "food" | "fashion" | "language";
            /**
             * Content description
             */
            contentDescription: string;
            /**
             * Is content public
             */
            isPublic: boolean;
            /**
             * Video duration (in seconds)
             */
            video_duration?: number;
        }
        export interface DailyTrafficDto {
            /**
             * Day of the month
             */
            day: number;
            /**
             * Number of logins for this day
             */
            loginCount: number;
            /**
             * Number of enrollments for this day
             */
            enrollmentCount: number;
        }
        export interface DashboardSummaryDataDto {
            loginCount: LoginCountDto;
            enrollCount: EnrollCountDto;
        }
        export interface DashboardSummaryResponseDto {
            /**
             * Status of the response
             */
            status: string;
            data: DashboardSummaryDataDto;
        }
        export interface EnrollCountDto {
            /**
             * Number of enrollments in the last month
             */
            lastMonth: number;
            /**
             * Number of enrollments in the current month
             */
            thisMonth: number;
        }
        export interface Enrollment {
            /**
             * ID of the user who enrolled in the content
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            userId: string; // uuid
            /**
             * User who enrolled in the content
             */
            user: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * ID of the content in which the user enrolled
             * example:
             * 987e6543-a21c-43d3-a999-426614174999
             */
            contentId: string; // uuid
            /**
             * Content that the user enrolled in
             */
            content: {
                /**
                 * Unique identifier of the content
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                contentId: string; // uuid
                /**
                 * Name of the content
                 * example:
                 * Funny Cat Video
                 */
                contentName: string;
                /**
                 * Description of the content
                 * example:
                 * A video showing funny moments of cats
                 */
                contentDescription: string;
                /**
                 * Category of the content
                 * example:
                 * Comedy
                 */
                contentCategory: "cybersecurity" | "frontend_development" | "backend_development" | "fullstack_development" | "food" | "fashion" | "language";
                /**
                 * Thumbnail image file name in storage
                 * example:
                 * 1232f565-a106-4160-b6d0-9c859877ce9a.jpg
                 */
                contentThumbnail: string;
                /**
                 * Video file name in storage
                 * example:
                 * 1232f565-a106-4160-b6d0-9c859877ce9a.mp4
                 */
                contentVideo: string;
                /**
                 * Video duration in seconds
                 * example:
                 * 60
                 */
                videoDuration: number;
                /**
                 * Is the content publicly available
                 * example:
                 * true
                 */
                isPublic: boolean;
                /**
                 * ID of the user who created the content
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                createdByUserId: string; // uuid
                /**
                 * User who created the content
                 */
                createdByUser: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
                /**
                 * Creation date of the content
                 * example:
                 * 2024-01-01T10:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Last update date of the content
                 * example:
                 * 2024-01-15T12:00:00Z
                 */
                updatedDT: string; // date-time
            };
            /**
             * Timestamp when the user enrolled in the content
             * example:
             * 2025-04-01T10:00:00Z
             */
            enrolledDT: string; // date-time
            /**
             * Timestamp when the user completed the content
             * example:
             * 2025-04-03T15:30:00Z
             */
            completedDT: string; // date-time
        }
        export interface LoginCountDto {
            /**
             * Number of logins in the last month
             */
            lastMonth: number;
            /**
             * Number of logins in the current month
             */
            thisMonth: number;
        }
        export interface MonthlyTrafficDataDto {
            days: DailyTrafficDto[];
        }
        export interface MonthlyTrafficResponseDto {
            /**
             * Status of the response
             */
            status: string;
            data: MonthlyTrafficDataDto;
        }
        export interface PatchUserByIdDto {
            /**
             * Gender of the user
             * example:
             * male
             */
            sex?: "male" | "female" | "other";
            /**
             * First name of the user
             * example:
             * John
             */
            firstName?: string;
            /**
             * First name of the user
             * example:
             * Doe
             */
            lastName?: string;
            /**
             * Birthdate of the user
             * example:
             * John
             */
            birthDate?: string;
            /**
             * Title prefix of the user
             * example:
             * mr
             */
            prefix?: "master" | "miss" | "mr" | "mrs" | "ms";
            /**
             * Education level of the user
             * example:
             * bachelor
             */
            education?: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
            /**
             * Telephone number of the user
             * example:
             * 0812345678
             */
            tel?: string; // ^[0-9]{10}$
        }
        export interface PopularContentDto {
            /**
             * Unique identifier of the content
             */
            contentId: string;
            /**
             * Name of the content
             */
            contentName: string;
            /**
             * Number of enrollments for this content
             */
            enrollmentCount: number;
        }
        export interface PopularContentsDataDto {
            courses: PopularContentDto[];
        }
        export interface PopularContentsResponseDto {
            /**
             * Status of the response
             */
            status: string;
            data: PopularContentsDataDto;
        }
        export interface Project {
            /**
             * Unique identifier of the project
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            projectId: string; // uuid
            /**
             * ID of the user who submitted the project
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            submittedByUserId: string; // uuid
            /**
             * User who submitted the project
             */
            submittedByUser: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * Date and time when the project was submitted
             * example:
             * 2024-01-01T00:00:00Z
             */
            submittedDT: string; // date-time
            /**
             * Thai name of the project
             * example:
             * α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕₧α╕▒α╕Æα╕Öα╕▓α╕úα╕░α╕Üα╕Üα╕êα╕▒α╕öα╕üα╕▓α╕úα╕éα╣ëα╕¡α╕íα╕╣α╕Ñ
             */
            projectThaiName: string;
            /**
             * English name of the project
             * example:
             * Data Management System Development Project
             */
            projectEngName: string;
            /**
             * Summary of the project
             * example:
             * A comprehensive data management system development project
             */
            projectSummary: string;
            /**
             * Start date of the project
             * example:
             * 2024-01-01
             */
            startDate: string; // date
            /**
             * End date of the project
             * example:
             * 2024-12-31
             */
            endDate: string; // date
            /**
             * SDG type of the project
             * example:
             * SDG9
             */
            sdgType: "SDG1" | "SDG2" | "SDG3" | "SDG4" | "SDG5" | "SDG6" | "SDG7" | "SDG8" | "SDG9" | "SDG10" | "SDG11" | "SDG12" | "SDG13" | "SDG14" | "SDG15" | "SDG16" | "SDG17";
            /**
             * Project description file path
             */
            projectDescriptionFile: string;
            /**
             * Type of the project
             * example:
             * technology_and_innovation
             */
            projectType: "energy_and_environment" | "construction_and_infrastructure" | "agriculture_and_food" | "materials_and_minerals" | "finance_and_investment" | "technology_and_innovation" | "medicine_and_health" | "human_resource_development" | "manufacturing_and_automotive" | "electronics_and_retail" | "real_estate_and_urban_development" | "media_and_entertainment" | "tourism_and_services" | "society_and_community";
            /**
             * ID of the parent project
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            parentProjectID?: string; // uuid
            /**
             * Parent project details
             */
            parentProject?: {
                /**
                 * Unique identifier of the project
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                projectId: string; // uuid
                /**
                 * ID of the user who submitted the project
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                submittedByUserId: string; // uuid
                /**
                 * User who submitted the project
                 */
                submittedByUser: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
                /**
                 * Date and time when the project was submitted
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                submittedDT: string; // date-time
                /**
                 * Thai name of the project
                 * example:
                 * α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕₧α╕▒α╕Æα╕Öα╕▓α╕úα╕░α╕Üα╕Üα╕êα╕▒α╕öα╕üα╕▓α╕úα╕éα╣ëα╕¡α╕íα╕╣α╕Ñ
                 */
                projectThaiName: string;
                /**
                 * English name of the project
                 * example:
                 * Data Management System Development Project
                 */
                projectEngName: string;
                /**
                 * Summary of the project
                 * example:
                 * A comprehensive data management system development project
                 */
                projectSummary: string;
                /**
                 * Start date of the project
                 * example:
                 * 2024-01-01
                 */
                startDate: string; // date
                /**
                 * End date of the project
                 * example:
                 * 2024-12-31
                 */
                endDate: string; // date
                /**
                 * SDG type of the project
                 * example:
                 * SDG9
                 */
                sdgType: "SDG1" | "SDG2" | "SDG3" | "SDG4" | "SDG5" | "SDG6" | "SDG7" | "SDG8" | "SDG9" | "SDG10" | "SDG11" | "SDG12" | "SDG13" | "SDG14" | "SDG15" | "SDG16" | "SDG17";
                /**
                 * Project description file path
                 */
                projectDescriptionFile: string;
                /**
                 * Type of the project
                 * example:
                 * technology_and_innovation
                 */
                projectType: "energy_and_environment" | "construction_and_infrastructure" | "agriculture_and_food" | "materials_and_minerals" | "finance_and_investment" | "technology_and_innovation" | "medicine_and_health" | "human_resource_development" | "manufacturing_and_automotive" | "electronics_and_retail" | "real_estate_and_urban_development" | "media_and_entertainment" | "tourism_and_services" | "society_and_community";
                /**
                 * ID of the parent project
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                parentProjectID?: string; // uuid
                /**
                 * Parent project details
                 */
                parentProject?: any;
                /**
                 * Child projects
                 */
                childProjects?: Project[];
                /**
                 * First approval date
                 * example:
                 * 2024-01-15T10:30:00Z
                 */
                firstApprovedDT?: string; // date-time
                /**
                 * ID of the user who first approved
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                firstApprovedByUserId?: string; // uuid
                /**
                 * User who first approved the project
                 */
                firstApprovedByUser?: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
                /**
                 * Second approval date
                 * example:
                 * 2024-01-20T14:45:00Z
                 */
                secondApprovedDT?: string; // date-time
                /**
                 * ID of the user who second approved
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                secondApprovedByUserId?: string; // uuid
                /**
                 * User who second approved the project
                 */
                secondApprovedByUser?: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
                /**
                 * Third approval date
                 * example:
                 * 2024-01-25T09:15:00Z
                 */
                thirdApprovedDT?: string; // date-time
                /**
                 * ID of the user who third approved
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                thirdApprovedByUserId?: string; // uuid
                /**
                 * User who third approved the project
                 */
                thirdApprovedByUser?: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
                /**
                 * Third approval date
                 * example:
                 * 2024-01-25T09:15:00Z
                 */
                rejectedDT?: string; // date-time
                /**
                 * ID of the user who third approved
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                rejectedByUserId?: string; // uuid
                /**
                 * User who third approved the project
                 */
                rejectedByUser?: {
                    /**
                     * Unique identifier of the user
                     * example:
                     * 123e4567-e89b-12d3-a456-426614174000
                     */
                    userId: string; // uuid
                    /**
                     * Email address of the user
                     * example:
                     * user@example.com
                     */
                    email: string; // email
                    /**
                     * Date when the user was created
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    createdDT: string; // date-time
                    /**
                     * Date when the user was last updated
                     * example:
                     * 2024-01-01T00:00:00Z
                     */
                    updatedDT: string; // date-time
                    /**
                     * Role of the user
                     * example:
                     * user
                     */
                    role: "admin" | "user" | "project-approver";
                    /**
                     * Gender of the user
                     * example:
                     * male
                     */
                    sex: "male" | "female" | "other";
                    /**
                     * First name of the user
                     * example:
                     * John
                     */
                    firstName: string;
                    /**
                     * Last name of the user
                     * example:
                     * Doe
                     */
                    lastName: string;
                    /**
                     * Birth date of the user
                     * example:
                     * 1990-01-01
                     */
                    birthDate: string; // date
                    /**
                     * Title prefix of the user
                     * example:
                     * mr
                     */
                    prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                    /**
                     * Education level of the user
                     * example:
                     * bachelor
                     */
                    education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                    /**
                     * Telephone number of the user
                     * example:
                     * 0812345678
                     */
                    tel: string; // ^[0-9]{10}$
                    picture: string;
                    googleId: string;
                    refreshToken: string | null;
                    contentReports: Enrollment[];
                };
            };
            /**
             * Child projects
             */
            childProjects?: Project[];
            /**
             * First approval date
             * example:
             * 2024-01-15T10:30:00Z
             */
            firstApprovedDT?: string; // date-time
            /**
             * ID of the user who first approved
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            firstApprovedByUserId?: string; // uuid
            /**
             * User who first approved the project
             */
            firstApprovedByUser?: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * Second approval date
             * example:
             * 2024-01-20T14:45:00Z
             */
            secondApprovedDT?: string; // date-time
            /**
             * ID of the user who second approved
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            secondApprovedByUserId?: string; // uuid
            /**
             * User who second approved the project
             */
            secondApprovedByUser?: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * Third approval date
             * example:
             * 2024-01-25T09:15:00Z
             */
            thirdApprovedDT?: string; // date-time
            /**
             * ID of the user who third approved
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            thirdApprovedByUserId?: string; // uuid
            /**
             * User who third approved the project
             */
            thirdApprovedByUser?: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
            /**
             * Third approval date
             * example:
             * 2024-01-25T09:15:00Z
             */
            rejectedDT?: string; // date-time
            /**
             * ID of the user who third approved
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            rejectedByUserId?: string; // uuid
            /**
             * User who third approved the project
             */
            rejectedByUser?: {
                /**
                 * Unique identifier of the user
                 * example:
                 * 123e4567-e89b-12d3-a456-426614174000
                 */
                userId: string; // uuid
                /**
                 * Email address of the user
                 * example:
                 * user@example.com
                 */
                email: string; // email
                /**
                 * Date when the user was created
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                createdDT: string; // date-time
                /**
                 * Date when the user was last updated
                 * example:
                 * 2024-01-01T00:00:00Z
                 */
                updatedDT: string; // date-time
                /**
                 * Role of the user
                 * example:
                 * user
                 */
                role: "admin" | "user" | "project-approver";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex: "male" | "female" | "other";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate: string; // date
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel: string; // ^[0-9]{10}$
                picture: string;
                googleId: string;
                refreshToken: string | null;
                contentReports: Enrollment[];
            };
        }
        export interface ProjectCountDto {
            /**
             * Count from last month
             */
            lastMonth: number;
            /**
             * Count from current month
             */
            thisMonth: number;
        }
        export interface ProjectStatusDto {
            /**
             * Number of projects pending first approval
             */
            pending_first_approval: number;
            /**
             * Number of projects with first approval
             */
            first_approved: number;
            /**
             * Number of projects with second approval
             */
            second_approved: number;
            /**
             * Number of projects with third approval
             */
            third_approved: number;
            /**
             * Number of rejected projects
             */
            rejected: number;
        }
        export interface ProjectSummaryDto {
            pending_projects: ProjectCountDto;
            total_projects: ProjectCountDto;
            rejected_projects: ProjectCountDto;
        }
        export interface ProjectTypeDto {
            /**
             * Type of project
             */
            type: string;
            /**
             * Number of projects of this type
             */
            count: number;
        }
        export interface ProjectsDashboardDataDto {
            summary: ProjectSummaryDto;
            popular_project_types: ProjectTypeDto[];
            project_status: ProjectStatusDto;
            popular_sdg_types: SdgTypeDto[];
            child_projects: ChildProjectsDto;
        }
        export interface ProjectsDashboardResponseDto {
            /**
             * Status of the response
             */
            status: string;
            data: ProjectsDashboardDataDto;
        }
        export interface ProjectsReportDto {
            /**
             * The unique identifier of the project
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            id: string;
            /**
             * The name of the project in English
             * example:
             * Smart Home Automation System
             */
            projectName: string;
            /**
             * The full name of the person who submitted the project
             * example:
             * John Doe
             */
            submitter: string;
            /**
             * The current status of the project
             * example:
             * α╕üα╕│α╕Ñα╕▒α╕çα╕úα╕¡α╕üα╕▓α╕úα╕òα╕úα╕ºα╕êα╕¬α╕¡α╕Ü
             */
            status: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A" | "\u0E1C\u0E48\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E23\u0E2D\u0E1A\u0E17\u0E35\u0E48 1" | "\u0E1C\u0E48\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E23\u0E2D\u0E1A\u0E17\u0E35\u0E48 2" | "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08" | "\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18";
        }
        export interface SdgTypeDto {
            /**
             * SDG type
             */
            sdg: string;
            /**
             * Number of projects with this SDG type
             */
            count: number;
        }
        export interface SubmitProjectDto {
            /**
             * Thai name of the project
             * example:
             * α╣éα╕äα╕úα╕çα╕üα╕▓α╕úα╕₧α╕▒α╕Æα╕Öα╕▓α╕úα╕░α╕Üα╕Üα╕êα╕▒α╕öα╕üα╕▓α╕úα╕éα╣ëα╕¡α╕íα╕╣α╕Ñ
             */
            projectThaiName: string;
            /**
             * English name of the project
             * example:
             * Data Management System Development Project
             */
            projectEngName: string;
            /**
             * Summary of the project
             * example:
             * A comprehensive data management system development project
             */
            projectSummary: string;
            /**
             * Start date of the project
             * example:
             * 2024-01-01
             */
            startDate: string; // date
            /**
             * End date of the project
             * example:
             * 2024-12-31
             */
            endDate: string; // date
            /**
             * SDG type of the project
             * example:
             * SDG9
             */
            sdgType: "SDG1" | "SDG2" | "SDG3" | "SDG4" | "SDG5" | "SDG6" | "SDG7" | "SDG8" | "SDG9" | "SDG10" | "SDG11" | "SDG12" | "SDG13" | "SDG14" | "SDG15" | "SDG16" | "SDG17";
            /**
             * Project description file as base64 encoded binary data
             * example:
             * data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp...
             */
            projectDescriptionFile: string; // string
            /**
             * Type of the project
             * example:
             * technology_and_innovation
             */
            projectType: "energy_and_environment" | "construction_and_infrastructure" | "agriculture_and_food" | "materials_and_minerals" | "finance_and_investment" | "technology_and_innovation" | "medicine_and_health" | "human_resource_development" | "manufacturing_and_automotive" | "electronics_and_retail" | "real_estate_and_urban_development" | "media_and_entertainment" | "tourism_and_services" | "society_and_community";
            /**
             * ID of the parent project
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            parentProjectID?: string | null; // uuid
            userInfo?: {
                /**
                 * Title prefix of the user
                 * example:
                 * mr
                 */
                prefix?: "master" | "miss" | "mr" | "mrs" | "ms";
                /**
                 * Gender of the user
                 * example:
                 * male
                 */
                sex?: "male" | "female" | "other";
                /**
                 * Education level of the user
                 * example:
                 * bachelor
                 */
                education?: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
                /**
                 * First name of the user
                 * example:
                 * John
                 */
                firstName?: string;
                /**
                 * Last name of the user
                 * example:
                 * Doe
                 */
                lastName?: string;
                /**
                 * Birth date of the user
                 * example:
                 * 1990-01-01
                 */
                birthDate?: string; // date
                /**
                 * Telephone number of the user
                 * example:
                 * 0812345678
                 */
                tel?: string; // ^[0-9]{10}$
            };
        }
        export interface UpdateContentDto {
            /**
             * Content name
             */
            contentName?: string;
            /**
             * Content category
             */
            contentCategory?: string;
            /**
             * Content is public
             */
            isPublic?: boolean;
        }
        export interface UpdateProjectStatusDto {
            /**
             * Action to perform on the project
             * example:
             * approve
             */
            action: "approve" | "reject";
        }
        export interface UpdateUserRoleDto {
            /**
             * New role for the user
             * example:
             * admin
             */
            role: "admin" | "user" | "project-approver";
        }
        export interface User {
            /**
             * Unique identifier of the user
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            userId: string; // uuid
            /**
             * Email address of the user
             * example:
             * user@example.com
             */
            email: string; // email
            /**
             * Date when the user was created
             * example:
             * 2024-01-01T00:00:00Z
             */
            createdDT: string; // date-time
            /**
             * Date when the user was last updated
             * example:
             * 2024-01-01T00:00:00Z
             */
            updatedDT: string; // date-time
            /**
             * Role of the user
             * example:
             * user
             */
            role: "admin" | "user" | "project-approver";
            /**
             * Gender of the user
             * example:
             * male
             */
            sex: "male" | "female" | "other";
            /**
             * First name of the user
             * example:
             * John
             */
            firstName: string;
            /**
             * Last name of the user
             * example:
             * Doe
             */
            lastName: string;
            /**
             * Birth date of the user
             * example:
             * 1990-01-01
             */
            birthDate: string; // date
            /**
             * Title prefix of the user
             * example:
             * mr
             */
            prefix: "master" | "miss" | "mr" | "mrs" | "ms";
            /**
             * Education level of the user
             * example:
             * bachelor
             */
            education: "elementary" | "secondary" | "bachelor" | "master" | "doctoral" | "vocational_certificate" | "high_vocational_certificate";
            /**
             * Telephone number of the user
             * example:
             * 0812345678
             */
            tel: string; // ^[0-9]{10}$
            picture: string;
            googleId: string;
            refreshToken: string | null;
            contentReports: Enrollment[];
        }
        export interface UsersReportDto {
            /**
             * The unique identifier of the user
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            id: string;
            /**
             * The full name of the user
             * example:
             * John Doe
             */
            name: string;
            /**
             * Total number of courses the user has enrolled in
             * example:
             * 5
             */
            coursesTaken: number;
            /**
             * Number of courses the user has completed
             * example:
             * 3
             */
            coursesCompleted: number;
        }
        export interface VerifyTokenDto {
            access_token: string;
        }
    }
}
declare namespace Paths {
    namespace AppControllerGetHello {
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace AuthControllerGoogleAuth {
        namespace Responses {
            export interface $200 {
            }
            export interface $302 {
            }
        }
    }
    namespace AuthControllerGoogleAuthCallback {
        namespace Responses {
            export interface $200 {
            }
            export interface $302 {
            }
        }
    }
    namespace AuthControllerLogout {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerMe {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerRefreshTokens {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerTest {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerVerifyToken {
        export type RequestBody = Components.Schemas.VerifyTokenDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $201 {
            }
        }
    }
    namespace Complete {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ContentControllerCreateContent {
        export type RequestBody = Components.Schemas.CreateContentDto;
        namespace Responses {
            export type $201 = Components.Schemas.Content;
        }
    }
    namespace DeleteContent {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Content;
        }
    }
    namespace Enroll {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        namespace Responses {
            export type $201 = Components.Schemas.Enrollment;
        }
    }
    namespace FilterContentByCategory {
        namespace Parameters {
            export type Category = "cybersecurity" | "frontend_development" | "backend_development" | "fullstack_development" | "food" | "fashion" | "language";
        }
        export interface PathParameters {
            category: Parameters.Category;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Content[];
        }
    }
    namespace GetAllContents {
        namespace Parameters {
            export type Thumbnail = boolean;
        }
        export interface QueryParameters {
            thumbnail: Parameters.Thumbnail;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Content[];
        }
    }
    namespace GetAllProjects {
        namespace Responses {
            export type $200 = Components.Schemas.Project[];
        }
    }
    namespace GetAllUsers {
        namespace Parameters {
            /**
             * example:
             * 10
             */
            export type Limit = any;
            /**
             * example:
             * 1
             */
            export type Page = any;
            /**
             * example:
             * user
             */
            export type Role = string;
            /**
             * example:
             * kaew
             */
            export type Search = string;
        }
        export interface QueryParameters {
            search?: /**
             * example:
             * kaew
             */
            Parameters.Search;
            role?: /**
             * example:
             * user
             */
            Parameters.Role;
            limit?: /**
             * example:
             * 10
             */
            Parameters.Limit;
            page?: /**
             * example:
             * 1
             */
            Parameters.Page;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetContentById {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Content;
        }
    }
    namespace GetContentsReport {
        namespace Responses {
            export type $200 = Components.Schemas.ContentsReportDto[];
        }
    }
    namespace GetDashboardMonthlyTraffic {
        namespace Parameters {
            export type Month = string;
        }
        export interface QueryParameters {
            month?: Parameters.Month;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MonthlyTrafficResponseDto;
        }
    }
    namespace GetDashboardPopularContentCategories {
        namespace Parameters {
            export type Month = string;
        }
        export interface QueryParameters {
            month?: Parameters.Month;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ContentCategoriesResponseDto;
        }
    }
    namespace GetDashboardPopularContents {
        namespace Parameters {
            export type Limit = number;
            export type Month = string;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            month?: Parameters.Month;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PopularContentsResponseDto;
        }
    }
    namespace GetDashboardSummary {
        namespace Parameters {
            export type Month = string;
        }
        export interface QueryParameters {
            month?: Parameters.Month;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DashboardSummaryResponseDto;
        }
    }
    namespace GetProjectById {
        namespace Parameters {
            export type ProjectId = string; // uuid
        }
        export interface PathParameters {
            projectId: Parameters.ProjectId /* uuid */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Project;
            export interface $404 {
            }
        }
    }
    namespace GetProjectDashboard {
        namespace Parameters {
            export type Month = string;
        }
        export interface QueryParameters {
            month?: Parameters.Month;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ProjectsDashboardResponseDto;
        }
    }
    namespace GetProjectsReport {
        namespace Responses {
            export type $200 = Components.Schemas.ProjectsReportDto[];
        }
    }
    namespace GetUserById {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        namespace Responses {
            export interface $200 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetUserContents {
        namespace Responses {
            export type $200 = Components.Schemas.Enrollment[];
        }
    }
    namespace GetUserLatestProject {
        namespace Responses {
            export type $200 = Components.Schemas.Project;
            export interface $404 {
            }
        }
    }
    namespace GetUserProjects {
        namespace Responses {
            export type $200 = Components.Schemas.Project[];
            export interface $404 {
            }
        }
    }
    namespace GetUserRoles {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetUsersReport {
        namespace Responses {
            export type $200 = Components.Schemas.UsersReportDto[];
        }
    }
    namespace PatchUserRole {
        namespace Parameters {
            /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            export type UserId = string;
        }
        export interface PathParameters {
            userId: /**
             * example:
             * 123e4567-e89b-12d3-a456-426614174000
             */
            Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.UpdateUserRoleDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $400 {
            }
            export interface $403 {
            }
        }
    }
    namespace SubmitProject {
        export type RequestBody = Components.Schemas.SubmitProjectDto;
        namespace Responses {
            export type $200 = Components.Schemas.Project;
            export interface $201 {
            }
            export interface $400 {
            }
        }
    }
    namespace UpdateContent {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        export type RequestBody = Components.Schemas.UpdateContentDto;
        namespace Responses {
            export type $200 = Components.Schemas.Content;
        }
    }
    namespace UpdateProjectStatus {
        namespace Parameters {
            export type ProjectId = string; // uuid
        }
        export interface PathParameters {
            projectId: Parameters.ProjectId /* uuid */;
        }
        export type RequestBody = Components.Schemas.UpdateProjectStatusDto;
        namespace Responses {
            export type $200 = Components.Schemas.Project;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace UpdateUserById {
        namespace Parameters {
            export type UserId = string;
        }
        export interface PathParameters {
            userId: Parameters.UserId;
        }
        export type RequestBody = Components.Schemas.PatchUserByIdDto;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * AppController_getHello
   */
  'AppController_getHello'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AppControllerGetHello.Responses.$200>
  /**
   * getAllProjects - Get all projects
   */
  'getAllProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllProjects.Responses.$200>
  /**
   * getUserProjects - Get projects by user ID
   */
  'getUserProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserProjects.Responses.$200>
  /**
   * getProjectById - Get project by ID, returns projectDescriptionFile as accessible url.
   */
  'getProjectById'(
    parameters?: Parameters<Paths.GetProjectById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectById.Responses.$200>
  /**
   * updateProjectStatus - Update project status
   */
  'updateProjectStatus'(
    parameters?: Parameters<Paths.UpdateProjectStatus.PathParameters> | null,
    data?: Paths.UpdateProjectStatus.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProjectStatus.Responses.$200>
  /**
   * submitProject - Submit a project, returns projectDescriptionFile as accessible url.
   */
  'submitProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SubmitProject.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SubmitProject.Responses.$200 | Paths.SubmitProject.Responses.$201>
  /**
   * getUserLatestProject - Get the latest project submitted by the user with approval status
   */
  'getUserLatestProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserLatestProject.Responses.$200>
  /**
   * AuthController_test - Test endpoint
   */
  'AuthController_test'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerTest.Responses.$200>
  /**
   * AuthController_me - Get current user info
   */
  'AuthController_me'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerMe.Responses.$200>
  /**
   * AuthController_logout - Logout current user
   */
  'AuthController_logout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  /**
   * AuthController_refreshTokens - Refresh access token using refresh token
   */
  'AuthController_refreshTokens'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerRefreshTokens.Responses.$200>
  /**
   * AuthController_googleAuth - Initiate Google OAuth login
   */
  'AuthController_googleAuth'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerGoogleAuth.Responses.$200>
  /**
   * AuthController_googleAuthCallback - Handle Google OAuth callback
   */
  'AuthController_googleAuthCallback'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerGoogleAuthCallback.Responses.$200>
  /**
   * AuthController_verifyToken - Verify access token validity
   */
  'AuthController_verifyToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerVerifyToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerVerifyToken.Responses.$200 | Paths.AuthControllerVerifyToken.Responses.$201>
  /**
   * patchUserRole - Update user role (admin only)
   * 
   * Allows admin to update the role of any user.
   */
  'patchUserRole'(
    parameters?: Parameters<Paths.PatchUserRole.PathParameters> | null,
    data?: Paths.PatchUserRole.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchUserRole.Responses.$200>
  /**
   * getUserRoles - Get all available user roles
   */
  'getUserRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserRoles.Responses.$200>
  /**
   * getAllUsers - Get all users with pagination, search and role filter
   */
  'getAllUsers'(
    parameters?: Parameters<Paths.GetAllUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllUsers.Responses.$200>
  /**
   * getUserById - Get user by ID
   */
  'getUserById'(
    parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserById.Responses.$200>
  /**
   * updateUserById - Update your own user info
   */
  'updateUserById'(
    parameters?: Parameters<Paths.UpdateUserById.PathParameters> | null,
    data?: Paths.UpdateUserById.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserById.Responses.$200>
  /**
   * getAllContents - Get all contents
   */
  'getAllContents'(
    parameters?: Parameters<Paths.GetAllContents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllContents.Responses.$200>
  /**
   * getUserContents - Get user enrolled contents
   */
  'getUserContents'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserContents.Responses.$200>
  /**
   * ContentController_createContent - Create content
   */
  'ContentController_createContent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ContentControllerCreateContent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContentControllerCreateContent.Responses.$201>
  /**
   * updateContent - Update content
   */
  'updateContent'(
    parameters?: Parameters<Paths.UpdateContent.PathParameters> | null,
    data?: Paths.UpdateContent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateContent.Responses.$200>
  /**
   * filterContentByCategory - Filter content by category
   */
  'filterContentByCategory'(
    parameters?: Parameters<Paths.FilterContentByCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FilterContentByCategory.Responses.$200>
  /**
   * getContentById - Get content by Id
   */
  'getContentById'(
    parameters?: Parameters<Paths.GetContentById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContentById.Responses.$200>
  /**
   * deleteContent - Delete content
   */
  'deleteContent'(
    parameters?: Parameters<Paths.DeleteContent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteContent.Responses.$200>
  /**
   * enroll - Enroll to a content
   */
  'enroll'(
    parameters?: Parameters<Paths.Enroll.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Enroll.Responses.$201>
  /**
   * complete - Complete an enrolled content
   */
  'complete'(
    parameters?: Parameters<Paths.Complete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Complete.Responses.$200>
  /**
   * getUsersReport - Get users report
   */
  'getUsersReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUsersReport.Responses.$200>
  /**
   * getContentsReport - Get contents report
   */
  'getContentsReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetContentsReport.Responses.$200>
  /**
   * getProjectsReport - Get projects report
   */
  'getProjectsReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectsReport.Responses.$200>
  /**
   * getDashboardSummary - Get dashboard summary statistics
   */
  'getDashboardSummary'(
    parameters?: Parameters<Paths.GetDashboardSummary.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboardSummary.Responses.$200>
  /**
   * getDashboardMonthlyTraffic - Get monthly traffic statistics
   */
  'getDashboardMonthlyTraffic'(
    parameters?: Parameters<Paths.GetDashboardMonthlyTraffic.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboardMonthlyTraffic.Responses.$200>
  /**
   * getDashboardPopularContentCategories - Get popular content categories
   */
  'getDashboardPopularContentCategories'(
    parameters?: Parameters<Paths.GetDashboardPopularContentCategories.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboardPopularContentCategories.Responses.$200>
  /**
   * getDashboardPopularContents - Get popular contents
   */
  'getDashboardPopularContents'(
    parameters?: Parameters<Paths.GetDashboardPopularContents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboardPopularContents.Responses.$200>
  /**
   * getProjectDashboard - Get project dashboard statistics
   */
  'getProjectDashboard'(
    parameters?: Parameters<Paths.GetProjectDashboard.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
}

export interface PathsDictionary {
  ['/api']: {
    /**
     * AppController_getHello
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AppControllerGetHello.Responses.$200>
  }
  ['/api/projects']: {
    /**
     * getAllProjects - Get all projects
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllProjects.Responses.$200>
  }
  ['/api/projects/me']: {
    /**
     * getUserProjects - Get projects by user ID
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserProjects.Responses.$200>
  }
  ['/api/projects/{projectId}']: {
    /**
     * getProjectById - Get project by ID, returns projectDescriptionFile as accessible url.
     */
    'get'(
      parameters?: Parameters<Paths.GetProjectById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectById.Responses.$200>
  }
  ['/api/projects/{projectId}/status']: {
    /**
     * updateProjectStatus - Update project status
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateProjectStatus.PathParameters> | null,
      data?: Paths.UpdateProjectStatus.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProjectStatus.Responses.$200>
  }
  ['/api/projects/submit']: {
    /**
     * submitProject - Submit a project, returns projectDescriptionFile as accessible url.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SubmitProject.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SubmitProject.Responses.$200 | Paths.SubmitProject.Responses.$201>
  }
  ['/api/projects/me/latest']: {
    /**
     * getUserLatestProject - Get the latest project submitted by the user with approval status
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserLatestProject.Responses.$200>
  }
  ['/api/auth/test']: {
    /**
     * AuthController_test - Test endpoint
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerTest.Responses.$200>
  }
  ['/api/auth/me']: {
    /**
     * AuthController_me - Get current user info
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerMe.Responses.$200>
  }
  ['/api/auth/logout']: {
    /**
     * AuthController_logout - Logout current user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerLogout.Responses.$200>
  }
  ['/api/auth/refresh']: {
    /**
     * AuthController_refreshTokens - Refresh access token using refresh token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerRefreshTokens.Responses.$200>
  }
  ['/api/auth/google']: {
    /**
     * AuthController_googleAuth - Initiate Google OAuth login
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerGoogleAuth.Responses.$200>
  }
  ['/api/auth/google/callback']: {
    /**
     * AuthController_googleAuthCallback - Handle Google OAuth callback
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerGoogleAuthCallback.Responses.$200>
  }
  ['/api/auth/verify']: {
    /**
     * AuthController_verifyToken - Verify access token validity
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerVerifyToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerVerifyToken.Responses.$200 | Paths.AuthControllerVerifyToken.Responses.$201>
  }
  ['/api/users/{userId}/role']: {
    /**
     * patchUserRole - Update user role (admin only)
     * 
     * Allows admin to update the role of any user.
     */
    'patch'(
      parameters?: Parameters<Paths.PatchUserRole.PathParameters> | null,
      data?: Paths.PatchUserRole.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchUserRole.Responses.$200>
  }
  ['/api/users/roles']: {
    /**
     * getUserRoles - Get all available user roles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserRoles.Responses.$200>
  }
  ['/api/users']: {
    /**
     * getAllUsers - Get all users with pagination, search and role filter
     */
    'get'(
      parameters?: Parameters<Paths.GetAllUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllUsers.Responses.$200>
  }
  ['/api/users/{userId}']: {
    /**
     * getUserById - Get user by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserById.Responses.$200>
    /**
     * updateUserById - Update your own user info
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateUserById.PathParameters> | null,
      data?: Paths.UpdateUserById.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserById.Responses.$200>
  }
  ['/api/content']: {
    /**
     * getAllContents - Get all contents
     */
    'get'(
      parameters?: Parameters<Paths.GetAllContents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllContents.Responses.$200>
  }
  ['/api/content/me']: {
    /**
     * getUserContents - Get user enrolled contents
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserContents.Responses.$200>
  }
  ['/api/content/create']: {
    /**
     * ContentController_createContent - Create content
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ContentControllerCreateContent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContentControllerCreateContent.Responses.$201>
  }
  ['/api/content/{contentId}/update']: {
    /**
     * updateContent - Update content
     */
    'patch'(
      parameters?: Parameters<Paths.UpdateContent.PathParameters> | null,
      data?: Paths.UpdateContent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateContent.Responses.$200>
  }
  ['/api/content/filter/{category}']: {
    /**
     * filterContentByCategory - Filter content by category
     */
    'get'(
      parameters?: Parameters<Paths.FilterContentByCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FilterContentByCategory.Responses.$200>
  }
  ['/api/content/{contentId}']: {
    /**
     * deleteContent - Delete content
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteContent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteContent.Responses.$200>
    /**
     * getContentById - Get content by Id
     */
    'get'(
      parameters?: Parameters<Paths.GetContentById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContentById.Responses.$200>
  }
  ['/api/content/enroll/{contentId}']: {
    /**
     * enroll - Enroll to a content
     */
    'post'(
      parameters?: Parameters<Paths.Enroll.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Enroll.Responses.$201>
  }
  ['/api/content/complete/{contentId}']: {
    /**
     * complete - Complete an enrolled content
     */
    'patch'(
      parameters?: Parameters<Paths.Complete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Complete.Responses.$200>
  }
  ['/api/reports/users']: {
    /**
     * getUsersReport - Get users report
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUsersReport.Responses.$200>
  }
  ['/api/reports/contents']: {
    /**
     * getContentsReport - Get contents report
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetContentsReport.Responses.$200>
  }
  ['/api/reports/projects']: {
    /**
     * getProjectsReport - Get projects report
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectsReport.Responses.$200>
  }
  ['/api/dashboard/summary']: {
    /**
     * getDashboardSummary - Get dashboard summary statistics
     */
    'get'(
      parameters?: Parameters<Paths.GetDashboardSummary.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboardSummary.Responses.$200>
  }
  ['/api/dashboard/monthly-traffic']: {
    /**
     * getDashboardMonthlyTraffic - Get monthly traffic statistics
     */
    'get'(
      parameters?: Parameters<Paths.GetDashboardMonthlyTraffic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboardMonthlyTraffic.Responses.$200>
  }
  ['/api/dashboard/content-categories']: {
    /**
     * getDashboardPopularContentCategories - Get popular content categories
     */
    'get'(
      parameters?: Parameters<Paths.GetDashboardPopularContentCategories.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboardPopularContentCategories.Responses.$200>
  }
  ['/api/dashboard/popular-contents']: {
    /**
     * getDashboardPopularContents - Get popular contents
     */
    'get'(
      parameters?: Parameters<Paths.GetDashboardPopularContents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboardPopularContents.Responses.$200>
  }
  ['/api/dashboard/projects']: {
    /**
     * getProjectDashboard - Get project dashboard statistics
     */
    'get'(
      parameters?: Parameters<Paths.GetProjectDashboard.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectDashboard.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ChildProjectsDto = Components.Schemas.ChildProjectsDto;
export type Content = Components.Schemas.Content;
export type ContentCategoriesDataDto = Components.Schemas.ContentCategoriesDataDto;
export type ContentCategoriesResponseDto = Components.Schemas.ContentCategoriesResponseDto;
export type ContentCategoryDto = Components.Schemas.ContentCategoryDto;
export type ContentsReportDto = Components.Schemas.ContentsReportDto;
export type CreateContentDto = Components.Schemas.CreateContentDto;
export type DailyTrafficDto = Components.Schemas.DailyTrafficDto;
export type DashboardSummaryDataDto = Components.Schemas.DashboardSummaryDataDto;
export type DashboardSummaryResponseDto = Components.Schemas.DashboardSummaryResponseDto;
export type EnrollCountDto = Components.Schemas.EnrollCountDto;
export type Enrollment = Components.Schemas.Enrollment;
export type LoginCountDto = Components.Schemas.LoginCountDto;
export type MonthlyTrafficDataDto = Components.Schemas.MonthlyTrafficDataDto;
export type MonthlyTrafficResponseDto = Components.Schemas.MonthlyTrafficResponseDto;
export type patchUserByIdDto = Components.Schemas.PatchUserByIdDto;
export type PopularContentDto = Components.Schemas.PopularContentDto;
export type PopularContentsDataDto = Components.Schemas.PopularContentsDataDto;
export type PopularContentsResponseDto = Components.Schemas.PopularContentsResponseDto;
export type Project = Components.Schemas.Project;
export type ProjectCountDto = Components.Schemas.ProjectCountDto;
export type ProjectStatusDto = Components.Schemas.ProjectStatusDto;
export type ProjectSummaryDto = Components.Schemas.ProjectSummaryDto;
export type ProjectTypeDto = Components.Schemas.ProjectTypeDto;
export type ProjectsDashboardDataDto = Components.Schemas.ProjectsDashboardDataDto;
export type ProjectsDashboardResponseDto = Components.Schemas.ProjectsDashboardResponseDto;
export type ProjectsReportDto = Components.Schemas.ProjectsReportDto;
export type SdgTypeDto = Components.Schemas.SdgTypeDto;
export type SubmitProjectDto = Components.Schemas.SubmitProjectDto;
export type UpdateContentDto = Components.Schemas.UpdateContentDto;
export type UpdateProjectStatusDto = Components.Schemas.UpdateProjectStatusDto;
export type UpdateUserRoleDto = Components.Schemas.UpdateUserRoleDto;
export type User = Components.Schemas.User;
export type UsersReportDto = Components.Schemas.UsersReportDto;
export type VerifyTokenDto = Components.Schemas.VerifyTokenDto;
