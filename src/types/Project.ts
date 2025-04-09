import { User } from "./User";

export enum SDGType {
  SDG1 = "SDG1",
  SDG2 = "SDG2",
  SDG3 = "SDG3",
  SDG4 = "SDG4",
  SDG5 = "SDG5",
  SDG6 = "SDG6",
  SDG7 = "SDG7",
  SDG8 = "SDG8",
  SDG9 = "SDG9",
  SDG10 = "SDG10",
  SDG11 = "SDG11",
  SDG12 = "SDG12",
  SDG13 = "SDG13",
  SDG14 = "SDG14",
  SDG15 = "SDG15",
  SDG16 = "SDG16",
  SDG17 = "SDG17",
}

export enum ProjectType {
  ENERGY_AND_ENVIRONMENT = "energy_and_environment",
  CONSTRUCTION_AND_INFRASTRUCTURE = "construction_and_infrastructure",
  AGRICULTURE_AND_FOOD = "agriculture_and_food",
  MATERIALS_AND_MINERALS = "materials_and_minerals",
  FINANCE_AND_INVESTMENT = "finance_and_investment",
}

export enum ProjectActionOptions {
  APPROVE = "approve",
  REJECT = "reject",
}

export type Project = {
  projectId: string;
  submittedByUserId: string;
  submittedByUser: User;
  projectThaiName: string;
  projectEngName: string;
  projectSummary: string;
  startDate: Date;
  endDate: Date;
  sdgType: SDGType;
  projectDescriptionFile: string;
  projectType: ProjectType;
  parentProjectID?: string;
  parentProject?: Project;
  childProjects?: Project[];
  firstApprovedDT?: Date;
  firstApprovedByUserId?: string;
  firstApprovedByUser?: User;
  secondApprovedDT?: Date;
  secondApprovedByUserId?: string;
  secondApprovedByUser?: User;
  thirdApprovedDT?: Date;
  thirdApprovedByUserId?: string;
  thirdApprovedByUser?: User;
  rejectedDT?: string;
  rejectedByUserId?: string;
  rejectedByUser?: User;
};

export type ProjectAction = {
  action: ProjectActionOptions;
  projectThaiName: string;
  projectEngName: string;
  projectSummary: string;
  startDate: Date;
  endDate: Date;
  sdgType: SDGType;
  projectDescriptionFile: string;
  projectType: ProjectType;
  parentProjectID?: string;
  userInfo: Record<string, unknown>;
};

export type UpdateProjectStatusDto = {
  action: ProjectActionOptions;
};

export type SubmitProjectDto = {
  projectThaiName: string;
  projectEngName: string;
  projectSummary: string;
  startDate: Date;
  endDate: Date;
  sdgType: SDGType;
  projectDescriptionFile: string;
  projectType: ProjectType;
  parentProjectID?: string;
  userInfo: Record<string, unknown>;
};
