import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Users, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getProjectsDashboard, ProjectsDashboard }  from "@/api/DashboardAPI";

// Types
interface MonthOption {
  value: string;
  label: string;
}

interface SummaryCard {
  title: string;
  current: number;
  previous: number;
  icon: React.ReactNode;
  isNegative: boolean;
}

interface Indicator {
  icon: React.ReactNode | null;
  color: string;
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  realName: string;
}

interface StatusChartItem {
  name: string;
  value: number;
  fill: string;
}

interface ChildProjectChartItem {
  name: string;
  value: number;
  fill: string;
}

// Color constants
const COLORS: string[] = ["#D4E7A5", "#77C9A5", "#6C8DC6", "#D68383"];

const ApproverDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentYearMonth());
  const [dashboardData, setDashboardData] = useState<ProjectsDashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to get current year-month in YYYY-MM format
  function getCurrentYearMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  const handleMonthChange = (value: string): void => {
    setSelectedMonth(value);
  };

  // Generate month options for the last 12 months
  const monthOptions: MonthOption[] = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = new Intl.DateTimeFormat('th-TH', { year: 'numeric', month: 'long' }).format(date);
    return { value, label };
  });

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getProjectsDashboard(selectedMonth);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth]);

  // Format project types data for pie chart
  const projectTypesData: ChartDataItem[] = dashboardData?.data.popular_project_types.map((item, index) => ({
    name: `Category ${index + 1}`,
    value: item.count,
    color: COLORS[index % COLORS.length],
    realName: item.type
  })) || [];

  // Format SDG types data for pie chart
  const sdgTypesData: ChartDataItem[] = dashboardData?.data.popular_sdg_types.map((item, index) => ({
    name: `Category ${index + 1}`,
    value: item.count,
    color: COLORS[index % COLORS.length],
    realName: item.sdg
  })) || [];

  // Format project status data for bar chart
  const projectStatusData: StatusChartItem[] = dashboardData?.data.project_status ? [
    { name: "รอรีวิว", value: dashboardData.data.project_status.pending_first_approval, fill: "#77C9A5" },
    { name: "ผ่านการตรวจสอบครั้งที่1", value: dashboardData.data.project_status.first_approved, fill: "#6C8DC6" },
    { name: "ผ่านการตรวจสอบครั้งที่2", value: dashboardData.data.project_status.second_approved, fill: "#6C8DC6" },
    { name: "ผ่านการตรวจสอบครั้งที่3", value: dashboardData.data.project_status.third_approved, fill: "#6C8DC6" },
    { name: "ถูกปฏิเสธ", value: dashboardData.data.project_status.rejected, fill: "#D68383" }
  ] : [];

  // Format child projects data for bar chart
  const childProjectsData: ChildProjectChartItem[] = dashboardData?.data.child_projects ? [
    { name: "โครงการต้นแบบ", value: dashboardData.data.child_projects.normal, fill: "#6C8DC6" },
    { name: "โครงการต่อยอด", value: dashboardData.data.child_projects.child, fill: "#6C8DC6" }
  ] : [];

  // Helper for determining up/down indicator and color
  const getIndicator = (current: number, previous: number): Indicator => {
    if (current === previous) return { icon: null, color: "text-gray-500" };
    if (current > previous) return { icon: <ArrowUp className="text-green-500" />, color: "text-green-500" };
    return { icon: <ArrowDown className="text-red-500" />, color: "text-red-500" };
  };

  // Summary card data
  const summaryCards: SummaryCard[] = [
    {
      title: "คงค้างระเบียนโปรเจคใหม่",
      current: dashboardData?.data.summary.pending_projects.thisMonth || 0,
      previous: dashboardData?.data.summary.pending_projects.lastMonth || 0,
      icon: <Users className="h-8 w-8 text-gray-500" />,
      isNegative: true
    },
    {
      title: "จำนวนโปรเจคท์ที่อยู่ในระบบ",
      current: dashboardData?.data.summary.total_projects.thisMonth || 0,
      previous: dashboardData?.data.summary.total_projects.lastMonth || 0,
      icon: <Users className="h-8 w-8 text-gray-500" />,
      isNegative: false
    },
    {
      title: "จำนวนโปรเจคท์ที่โดนตีตก",
      current: dashboardData?.data.summary.rejected_projects.thisMonth || 0,
      previous: dashboardData?.data.summary.rejected_projects.lastMonth || 0,
      icon: <Users className="h-8 w-8 text-gray-500" />,
      isNegative: true
    }
  ];

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-36 bg-white">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select month" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded shadow">
          <p className="text-lg text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {summaryCards.map((card, index) => {
              const indicator = getIndicator(card.current, card.previous);
              return (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{card.title}</p>
                        <p className={`text-2xl font-bold ${card.isNegative ? 'text-red-500' : 'text-green-500'}`}>
                          {card.current}
                        </p>
                      </div>
                    </div>
                    <div>
                      {indicator.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Project Types Pie Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">ประเภทของโครงการ</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={(entry: any) => entry.realName}
                    >
                      {projectTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      formatter={(value: string, entry: any, index: number) => {
                        const item = projectTypesData[index];
                        return item ? item.realName : value;
                      }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => {
                        const item = projectTypesData.find(item => item.name === name);
                        return [`${value} projects`, item?.realName || name];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Project Status Bar Chart */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">สถานะโครงการ</h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="แสดงทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">แสดงทั้งหมด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={projectStatusData}
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" background={{ fill: "#eee" }}>
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SDG Types Pie Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">เป้าหมายการพัฒนาโครงการ</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sdgTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={(entry: any) => entry.realName}
                    >
                      {sdgTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      formatter={(value: string, entry: any, index: number) => {
                        const item = sdgTypesData[index];
                        return item ? item.realName : value;
                      }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => {
                        const item = sdgTypesData.find(item => item.name === name);
                        return [`${value} projects`, item?.realName || name];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Child Projects Chart */}
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">โครงการต่อยอด</h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue placeholder="แสดงทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">แสดงทั้งหมด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={childProjectsData}
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" background={{ fill: "#eee" }}>
                      {childProjectsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApproverDashboard;