import { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend , Line 
} from 'recharts';
import { ArrowDown, ArrowUp, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sampleData = {
  loginCount: {
    lastMonth: 105,
    thisMonth: 90,
  },
  enrollCount: {
    lastMonth: 95,
    thisMonth: 111,
  },
  monthlyTraffic: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    loginCount: i < 10 ? Math.floor(Math.random() * 40) + 10 : 0,
    enrollmentCount: i < 10 ? Math.floor(Math.random() * 10) + 1 : 0,
  })),
  categories: [
    { category: "Category 1", contentCount: 45, color: "#D6E8A8" },
    { category: "Category 2", contentCount: 25, color: "#9BCAA8" },
    { category: "Category 3", contentCount: 20, color: "#94A6D4" },
    { category: "Category 4", contentCount: 16, color: "#D08C8C" },
  ],
  popularCourses: [
    { contentId: "content_id_1", contentName: "course 1", enrollmentCount: 50 },
    { contentId: "content_id_2", contentName: "course 2", enrollmentCount: 45 },
    { contentId: "content_id_3", contentName: "course 3", enrollmentCount: 35 },
    { contentId: "content_id_4", contentName: "course 3", enrollmentCount: 27 },
  ]
};

const months = ["Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023", "May 2023"];

export default function AdminDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Apr 2023");
  
  const loginDifference = sampleData.loginCount.thisMonth - sampleData.loginCount.lastMonth;
  const enrollDifference = sampleData.enrollCount.thisMonth - sampleData.enrollCount.lastMonth;
  
  const loginTrend = loginDifference < 0 ? 
    { icon: <ArrowDown className="w-6 h-6 text-red-500" />, color: "text-red-500" } : 
    { icon: <ArrowUp className="w-6 h-6 text-green-500" />, color: "text-green-500" };
    
  const enrollTrend = enrollDifference < 0 ? 
    { icon: <ArrowDown className="w-6 h-6 text-red-500" />, color: "text-red-500" } : 
    { icon: <ArrowUp className="w-6 h-6 text-green-500" />, color: "text-green-500" };

  // Filter data for month display (only showing first 10 days in sample)
  const monthlyData = sampleData.monthlyTraffic.filter(item => item.day <= 10);
  
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-36 bg-white">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select month" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Login Count Card */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full p-2 mr-3">
                <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">คนที่เข้าสู่ระบบ</p>
                <p className="text-2xl font-bold text-red-500">{sampleData.loginCount.thisMonth}</p>
              </div>
            </div>
            <div>
              {loginTrend.icon}
            </div>
          </div>
        </div>
        
        {/* Enrollment Count Card */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full p-2 mr-3">
                <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">คนที่ลงทะเบียนเรียน</p>
                <p className="text-2xl font-bold text-green-500">{sampleData.enrollCount.thisMonth}</p>
              </div>
            </div>
            <div>
              {enrollTrend.icon}
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Traffic Chart */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-4 text-center">Monthly Traffic</h2>
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
              <Bar dataKey="loginCount" name="ข้อมูลการเข้าถึงระบบ" fill="#8884d8" />
              <Bar dataKey="enrollmentCount" name="ข้อมูลการลงทะเบียน" fill="#82ca9d" />
              <Line 
                type="monotone" 
                dataKey="loginCount" 
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Category ยอดนิยม</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="contentCount"
                  nameKey="category"
                  label={(entry) => entry.category}
                >
                  {sampleData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Popular Courses */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">คอร์สยอดนิยม</h2>
          <div className="space-y-4">
            {sampleData.popularCourses.map((course, index) => (
              <div key={course.contentId} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span>{course.contentName}</span>
                  <span>{course.enrollmentCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded">
                  <div 
                    className="bg-blue-400 h-6 rounded text-xs leading-6 text-center text-white"
                    style={{ width: `${(course.enrollmentCount / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}