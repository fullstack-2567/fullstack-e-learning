import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
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
            };
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
            parentProjectID?: {
                [key: string]: any;
            }; // uuid
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
            contentName: string;
            /**
             * Content category
             */
            contentCategory: string;
            /**
             * Content is public
             */
            isPublic: boolean;
        }
        export interface UpdateProjectStatusDto {
            /**
             * Action to perform on the project
             * example:
             * approve
             */
            action: "approve" | "reject";
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
        }
        export interface VerifyTokenDto {
        }
    }
}
declare namespace Paths {
    namespace AppControllerGetHello {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerGoogleAuth {
        namespace Responses {
            export interface $302 {
            }
        }
    }
    namespace AuthControllerGoogleAuthCallback {
        namespace Responses {
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
        }
    }
    namespace ContentControllerCompleteContent {
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
    namespace ContentControllerEnrollContent {
        namespace Parameters {
            export type ContentId = string;
        }
        export interface PathParameters {
            contentId: Parameters.ContentId;
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace ContentControllerGetAllContents {
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
    namespace GetAllProjects {
        namespace Responses {
            export type $200 = Components.Schemas.Project[];
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
    namespace GetProjectById {
        namespace Parameters {
            export type ProjectId = string;
        }
        export interface PathParameters {
            projectId: Parameters.ProjectId;
        }
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
    namespace ReportsControllerGetContentsReport {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ReportsControllerGetProjectsReport {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ReportsControllerGetUsersReport {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace SubmitProject {
        export type RequestBody = Components.Schemas.SubmitProjectDto;
        namespace Responses {
            export type $200 = Components.Schemas.Project;
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
            export type ProjectId = string;
        }
        export interface PathParameters {
            projectId: Parameters.ProjectId;
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
   * getProjectById - Get project by ID, returns projectDescriptionFile as accessible url.
   */
  'getProjectById'(
    parameters?: Parameters<Paths.GetProjectById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectById.Responses.$200>
  /**
   * getUserProjects - Get projects by user ID
   */
  'getUserProjects'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserProjects.Responses.$200>
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
  ): OperationResponse<Paths.SubmitProject.Responses.$200>
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
  ): OperationResponse<any>
  /**
   * AuthController_googleAuthCallback - Handle Google OAuth callback
   */
  'AuthController_googleAuthCallback'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * AuthController_verifyToken - Verify access token validity
   */
  'AuthController_verifyToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthControllerVerifyToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthControllerVerifyToken.Responses.$200>
  /**
   * ContentController_getAllContents - Get all contents
   */
  'ContentController_getAllContents'(
    parameters?: Parameters<Paths.ContentControllerGetAllContents.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContentControllerGetAllContents.Responses.$200>
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
   * ContentController_enrollContent
   */
  'ContentController_enrollContent'(
    parameters?: Parameters<Paths.ContentControllerEnrollContent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContentControllerEnrollContent.Responses.$201>
  /**
   * ContentController_completeContent
   */
  'ContentController_completeContent'(
    parameters?: Parameters<Paths.ContentControllerCompleteContent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ContentControllerCompleteContent.Responses.$200>
  /**
   * ReportsController_getUsersReport
   */
  'ReportsController_getUsersReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReportsControllerGetUsersReport.Responses.$200>
  /**
   * ReportsController_getContentsReport
   */
  'ReportsController_getContentsReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReportsControllerGetContentsReport.Responses.$200>
  /**
   * ReportsController_getProjectsReport
   */
  'ReportsController_getProjectsReport'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReportsControllerGetProjectsReport.Responses.$200>
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
    ): OperationResponse<Paths.SubmitProject.Responses.$200>
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
    ): OperationResponse<any>
  }
  ['/api/auth/google/callback']: {
    /**
     * AuthController_googleAuthCallback - Handle Google OAuth callback
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/api/auth/verify']: {
    /**
     * AuthController_verifyToken - Verify access token validity
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthControllerVerifyToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthControllerVerifyToken.Responses.$200>
  }
  ['/api/content']: {
    /**
     * ContentController_getAllContents - Get all contents
     */
    'get'(
      parameters?: Parameters<Paths.ContentControllerGetAllContents.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContentControllerGetAllContents.Responses.$200>
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
     * ContentController_enrollContent
     */
    'post'(
      parameters?: Parameters<Paths.ContentControllerEnrollContent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContentControllerEnrollContent.Responses.$201>
  }
  ['/api/content/complete/{contentId}']: {
    /**
     * ContentController_completeContent
     */
    'patch'(
      parameters?: Parameters<Paths.ContentControllerCompleteContent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ContentControllerCompleteContent.Responses.$200>
  }
  ['/api/reports/users']: {
    /**
     * ReportsController_getUsersReport
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReportsControllerGetUsersReport.Responses.$200>
  }
  ['/api/reports/contents']: {
    /**
     * ReportsController_getContentsReport
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReportsControllerGetContentsReport.Responses.$200>
  }
  ['/api/reports/projects']: {
    /**
     * ReportsController_getProjectsReport
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReportsControllerGetProjectsReport.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Content = Components.Schemas.Content;
export type CreateContentDto = Components.Schemas.CreateContentDto;
export type Project = Components.Schemas.Project;
export type SubmitProjectDto = Components.Schemas.SubmitProjectDto;
export type UpdateContentDto = Components.Schemas.UpdateContentDto;
export type UpdateProjectStatusDto = Components.Schemas.UpdateProjectStatusDto;
export type User = Components.Schemas.User;
export type VerifyTokenDto = Components.Schemas.VerifyTokenDto;
