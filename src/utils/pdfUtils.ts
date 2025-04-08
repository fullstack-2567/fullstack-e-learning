import { TDocumentDefinitions } from "pdfmake/interfaces";
// src/utils/pdfUtils.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Attach fonts to pdfMake
pdfMake.vfs = pdfFonts.vfs;

export default pdfMake;

export const generateDocumentDefinition = (
  courseData: any[],
  userData: any[],
  projectData: any[]
): TDocumentDefinitions => {
  const usersTableBody = [
    ["No.", "User", "Courses Taken", "Courses Completed"],
    ...userData.map((user) => [
      user.id,
      user.username,
      user.coursesTaken,
      user.coursesCompleted,
    ]),
  ];

  const projectsTableBody = [
    ["No.", "Project Name", "Submitter", "Status"],
    ...projectData.map((project) => [
      project.id,
      project.projectName,
      project.submitter,
      project.status,
    ]),
  ];

  console.log("PDF table body:", [
    ["Course", "User", "Project"],
    ...Array.from(
      { length: Math.max(courseData.length, userData.length, projectData.length) }
    ).map((_, i) => [
      courseData[i]?.name || "-",
      userData[i]?.username || "-",
      projectData[i]?.projectName || "-",
    ]),
  ]);
  

  return {
    content: [
      { text: "รายงานสถิติ", style: "header" },
      { text: "E-learning Report", style: "subheader" },
      { text: "E-learning / Project", style: "mainTabs" },
      { text: "คอร์สเรียน", style: "subheader" },
      {
        table: {
          widths: ["*", "*", "*"],
          body: [
            ["Course", "User", "Project"],
            ...Array.from(
              { length: Math.max(courseData.length, userData.length, projectData.length) }
            ).map((_, i) => [
              courseData[i]?.name || "-",
              userData[i]?.username || "-",
              projectData[i]?.projectName || "-",
            ]),
          ],
        },
        style: "table",
      },      
      { text: "ผู้ใช้", style: "subheader" },
      {
        table: {
          widths: ["*", "auto", "auto"],
          body: usersTableBody,
        },
        style: "table",
      },
      { text: "Project Content", style: "subheader" },
      {
        table: {
          widths: ["*", "auto", "auto"],
          body: projectsTableBody,
        },
        style: "table",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 20, 0, 20],
      },
      subheader: {
        fontSize: 14,
        margin: [0, 10, 0, 10],
      },
      mainTabs: {
        fontSize: 12,
        margin: [0, 10, 0, 10],
        italics: true,
      },
      table: {
        margin: [0, 5, 0, 15],
        fontSize: 10,
      },
      tableHeader: {
        fontSize: 12,
        bold: true,
        alignment: "center",
        fillColor: "#f2f2f2",
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };
};
