import {
    Document,
    Font,
    Page,
    Text as PDFText,
    StyleSheet,
    View,
  } from "@react-pdf/renderer";
  import NotoSansThai from "../../assets/IBM_Plex_Sans_Thai_Looped/IBMPlexSansThaiLooped-Regular.ttf";
  
  // Register font
  Font.register({
    family: "NotoSansThai",
    src: NotoSansThai,
  });

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;
  };
  
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "NotoSansThai",
      fontSize: 9,
      backgroundColor: "#ffffff",
    },
    heading: {
      fontSize: 12,
      marginBottom: 15,
      fontWeight: "bold",
      textAlign: "center",
      color: "#2d3748",
    },
    table: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#cbd5e0",
      marginTop: 15,
    },
    tableRow: {
      flexDirection: "row",
      minHeight: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#cbd5e0",
    },
    tableHeader: {
      backgroundColor: "#f7fafc",
      fontWeight: "bold",
      fontSize: 10,
      color: "#4a5568",
    },
    tableCell: {
      padding: 4,
      borderRightWidth: 1,
      borderRightColor: "#cbd5e0",
      flexWrap: "wrap",
    },
    // Column specific widths
    colId: {
      width: "20%",
      textAlign: "center",
    },
    colName: {
      width: "35%",
      paddingLeft: 8,
      textAlign: "left",
    },
    colAuthor: {
      width: "25%",
      paddingLeft: 8,
    },
    colStatus: {
      width: "15%",
      textAlign: "center",
    },
    colDate: {
      width: "15%",
      textAlign: "center",
    },
  });
  
  const getProjectStatus = (project: any) => {
    if (project.rejectedDT) return "ถูกปฏิเสธ";
    if (project.thirdApprovedDT) return "ตรวจสอบสำเร็จ";
    if (project.secondApprovedDT) return "ผ่านรอบ 2";
    if (project.firstApprovedDT) return "ผ่านรอบ 1";
    return "รอตรวจสอบ";
  };

  const countByField = (data: any[], field: string) => {
    const counts: Record<string, number> = {};
  
    data.forEach((item) => {
      const key = item[field];
      if (key) {
        counts[key] = (counts[key] || 0) + 1;
      }
    });
  
    return Object.entries(counts)
      .map(([key, value]) => `${key} (${value})`)
      .join(", ");
  };
  
  const MyReport = ({ projectData, filteredProjectData, filters }: { projectData: any; filteredProjectData: any; filters: any }) => {
    // เช็คว่ามีการกรองหรือไม่ ถ้ามีให้ใช้ filteredProjectData
    const dataToUse = filters && Object.keys(filters).length > 0 ? filteredProjectData : projectData;
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <PDFText style={styles.heading}>รายงานโครงการ</PDFText>
  
          <PDFText style={{ marginBottom: 10 }}>
            {filters.startDate === "" && filters.endDate === ""
              ? "ระหว่างวันที่: - ถึง -"
              : `ระหว่างวันที่: ${filters.startDate} ถึง ${filters.endDate}`}
          </PDFText>
          <PDFText style={{ marginBottom: 10 }}>
            จำนวนโครงการทั้งหมด: {dataToUse.length} โครงการ
          </PDFText>
  
          {/* Table */}
          {dataToUse && dataToUse.length > 0 ? (
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <PDFText style={[styles.tableCell, styles.colId]}>รหัส</PDFText>
                <PDFText style={[styles.tableCell, styles.colName]}>ชื่อโปรเจกต์</PDFText>
                <PDFText style={[styles.tableCell, styles.colAuthor]}>ผู้ส่ง</PDFText>
                <PDFText style={[styles.tableCell, styles.colStatus]}>สถานะ</PDFText>
                <PDFText style={[styles.tableCell, styles.colDate]}>วันที่ส่ง</PDFText>
              </View>
  
              {/* Table Rows */}
              {dataToUse.map((project: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <PDFText style={[styles.tableCell, styles.colId]}>
                    {truncateText(project.projectId, 15)}
                  </PDFText>
                  <PDFText style={[styles.tableCell, styles.colName]}>
                    {project.projectThaiName}
                  </PDFText>
                  <PDFText style={[styles.tableCell, styles.colAuthor]}>
                    {project.submittedByUser.firstName} {project.submittedByUser.lastName}
                  </PDFText>
                  <PDFText style={[styles.tableCell, styles.colStatus]}>
                    {getProjectStatus(project)}
                  </PDFText>
                  <PDFText style={[styles.tableCell, styles.colDate]}>
                    {new Date(project.submittedDT).toLocaleDateString("th-TH")}
                  </PDFText>
                </View>
              ))}
            </View>
          ) : (
            <PDFText>ไม่มีข้อมูลในรายงานนี้</PDFText>
          )}

          {/* Footer */}
          <PDFText style={{ marginTop: 10 }}>สรุปผลรายงาน</PDFText>
          <PDFText >
            จำนวนโครงการทั้งหมด: {dataToUse.length} โครงการ
          </PDFText>
          <PDFText>
            ประเภทของโครงการทั้งหมด:{" "}
            {Array.isArray(filters?.projectType) && filters.projectType.length > 0
              ? filters.projectType.join(", ")
              : countByField(projectData, "projectType") || "ทั้งหมด"}
          </PDFText>

          <PDFText>
            ประเภท SDGs ทั้งหมด:{" "}
            {Array.isArray(filters?.sdgType) && filters.sdgType.length > 0
              ? filters.sdgType.join(", ")
              : countByField(projectData, "sdgType") || "ทั้งหมด"}
          </PDFText>

                  </Page>
                </Document>
              );
            };
  
  
  export default MyReport;