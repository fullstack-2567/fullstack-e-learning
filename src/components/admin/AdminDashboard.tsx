import React, { useState, useEffect, JSX } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { ArrowDown, ArrowUp, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { openApiclient } from "@/utils/api-client";
import {
  ContentCategoryDto,
  DailyTrafficDto,
  DashboardSummaryDataDto,
  PopularContentDto,
} from "@/utils/backend-openapi";
import { getContentCategoryInThai } from "@/utils/enumMapping";

// Define colors for categories
const COLORS: string[] = [
  "#D6E8A8",
  "#9BCAA8",
  "#94A6D4",
  "#D08C8C",
  "#F2D096",
  "#F49A9A",
];

// Interface for trend display
interface TrendDisplay {
  icon: JSX.Element;
  color: string;
}

interface CategoryDataWithColor extends ContentCategoryDto {
  color: string;
}

interface MonthOption {
  value: string;
  label: string;
}

const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );
  const [summaryData, setSummaryData] =
    useState<DashboardSummaryDataDto | null>(null);
  const [monthlyData, setMonthlyData] = useState<DailyTrafficDto[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryDataWithColor[]>(
    []
  );
  const [popularCoursesData, setPopularCoursesData] = useState<
    PopularContentDto[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Generate last 12 months for dropdown
  const getMonthOptions = (): MonthOption[] => {
    const options: MonthOption[] = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      const value = `${year}-${month}`;
      const label = new Date(d).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
      });

      options.push({ value, label });
    }

    return options;
  };

  const monthOptions: MonthOption[] = getMonthOptions();

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all dashboard data in parallel
        const [
          summaryResponse,
          trafficResponse,
          categoriesResponse,
          coursesResponse,
        ] = await Promise.all([
          openApiclient.getDashboardSummary({
            month: selectedMonth,
          }),
          openApiclient.getDashboardMonthlyTraffic({
            month: selectedMonth,
          }),
          openApiclient.getDashboardPopularContentCategories({
            month: selectedMonth,
          }),
          openApiclient.getDashboardPopularContents({
            month: selectedMonth,
          }),
        ]);

        // Process and set the data
        setSummaryData(summaryResponse.data.data);
        setMonthlyData(trafficResponse.data.data.days);

        // Add colors to categories data
        const categoriesWithColors: CategoryDataWithColor[] =
          categoriesResponse.data.data.categories.map((category, index) => ({
            category: getContentCategoryInThai(category.category),
            contentCount: category.contentCount,
            color: COLORS[index % COLORS.length],
          }));
        setCategoriesData(categoriesWithColors);
        setPopularCoursesData(coursesResponse.data.data.courses);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth]);

  // Handle month change
  const handleMonthChange = (value: string): void => {
    setSelectedMonth(value);
  };

  // Calculate trends for login and enrollment counts
  const loginTrend: TrendDisplay =
    summaryData &&
    summaryData.loginCount.thisMonth >= summaryData.loginCount.lastMonth
      ? {
          icon: <ArrowUp className="w-6 h-6 text-green-500" />,
          color: "text-green-500",
        }
      : {
          icon: <ArrowDown className="w-6 h-6 text-red-500" />,
          color: "text-red-500",
        };

  const enrollTrend: TrendDisplay =
    summaryData &&
    summaryData.enrollCount.thisMonth >= summaryData.enrollCount.lastMonth
      ? {
          icon: <ArrowUp className="w-6 h-6 text-green-500" />,
          color: "text-green-500",
        }
      : {
          icon: <ArrowDown className="w-6 h-6 text-red-500" />,
          color: "text-red-500",
        };

  // Find max enrollment count for scaling the progress bars
  const maxEnrollmentCount: number =
    popularCoursesData.length > 0
      ? Math.max(...popularCoursesData.map((course) => course.enrollmentCount))
      : 50;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

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

      {summaryData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Login Count Card */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full p-2 mr-3">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    จำนวนผู้ใช้ที่เข้าสู่ระบบ
                  </p>
                  <p
                    className={`text-2xl font-bold ${summaryData.loginCount.thisMonth < summaryData.loginCount.lastMonth ? "text-red-500" : "text-green-500"}`}
                  >
                    {summaryData.loginCount.thisMonth}
                  </p>
                </div>
              </div>
              <div>{loginTrend.icon}</div>
            </div>
          </div>

          {/* Enrollment Count Card */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full p-2 mr-3">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    จำนวนผู้ใช้ที่ลงทะเบียนเรียน
                  </p>
                  <p
                    className={`text-2xl font-bold ${summaryData.enrollCount.thisMonth < summaryData.enrollCount.lastMonth ? "text-red-500" : "text-green-500"}`}
                  >
                    {summaryData.enrollCount.thisMonth}
                  </p>
                </div>
              </div>
              <div>{enrollTrend.icon}</div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Traffic Chart */}
      {monthlyData.length > 0 && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Monthly Traffic
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="loginCount"
                  name="ข้อมูลการเข้าถึงระบบ"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="enrollmentCount"
                  name="ข้อมูลการลงทะเบียนเรียน"
                  fill="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="loginCount"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ stroke: "#82ca9d", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Category ยอดนิยม</h2>
          {categoriesData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="contentCount"
                    nameKey="category"
                    label={(entry) => entry.category}
                  >
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                ยังไม่มีข้อมูลหมวดหมู่
              </p>
            </div>
          )}
        </div>

        {/* Popular Courses */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">คอร์สยอดนิยม</h2>
          {popularCoursesData.length > 0 ? (
            <div className="space-y-4">
              {popularCoursesData.map((course) => (
                <div key={course.contentId} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{course.contentName}</span>
                    <span>{course.enrollmentCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded">
                    <div
                      className="bg-blue-400 h-6 rounded text-xs leading-6 text-center text-white"
                      style={{
                        width: `${(course.enrollmentCount / maxEnrollmentCount) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                ยังไม่มีข้อมูลคอร์สยอดนิยม
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
