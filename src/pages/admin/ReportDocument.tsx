import {
    Document,
    Page,
    Text as PDFText,
    StyleSheet,
  } from "@react-pdf/renderer";
  

const styles = StyleSheet.create({
  page: { padding: 30 },
  heading: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12, marginBottom: 5 },
});

const MyReport = ({ courseData, userData, projectData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {courseData && courseData.length > 0 && (
        <>
          <PDFText style={styles.heading}>รายงานคอร์สเรียน</PDFText>
          {courseData.map((course: any, index: number) => (
            <PDFText key={index} style={styles.text}>
              {course.title} ({course.instructor}) - ผู้เรียน:{" "}
              {course.studentsEnrolled}, จบแล้ว: {course.studentsCompleted}
            </PDFText>
          ))}
        </>
      )}

      {userData && userData.length > 0 && (
        <>
          <PDFText style={styles.heading}>รายงานผู้ใช้</PDFText>
          {userData.map((user: any, index: number) => (
            <PDFText key={index} style={styles.text}>
              {user.username} - เรียน: {user.coursesTaken}, จบ:{" "}
              {user.coursesCompleted}
            </PDFText>
          ))}
        </>
      )}

      {projectData && projectData.length > 0 && (
        <>
          <PDFText style={styles.heading}>รายงานโปรเจกต์</PDFText>
          {projectData.map((project: any, index: number) => (
            <PDFText key={index} style={styles.text}>
              {project.projectName} โดย {project.submitter} - สถานะ:{" "}
              {project.status}
            </PDFText>
          ))}
        </>
      )}

      {(courseData.length === 0 &&
        userData.length === 0 &&
        projectData.length === 0) && (
        <PDFText style={styles.text}>ไม่มีข้อมูลในรายงานนี้</PDFText>
      )}
    </Page>
  </Document>
);

export default MyReport;
