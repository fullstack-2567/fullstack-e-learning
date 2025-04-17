const projectTypeMap: Record<string, string> = {
	energy_and_environment: "พลังงานและสิ่งแวดล้อม",
	construction_and_infrastructure: "การก่อสร้างและโครงสร้าง",
	agriculture_and_food: "การเกษตรและอาหาร",
	materials_and_minerals: "วัสดุและแร่ธาตุ",
	finance_and_investment: "การเงินและการลงทุน",
	technology_and_innovation: "เทคโนโลยีและนวัตกรรม",
	medicine_and_health: "การแพทย์และสุขภาพ",
	human_resource_development: "การศึกษาและพัฒนาทรัพยากรมนุษย์",
	manufacturing_and_automotive: "อุตสาหกรรมการผลิตและหุ่นยนต์",
	electronics_and_retail: "พาณิชย์อิเล็กทรอนิกส์และค้าปลีก",
	real_estate_and_urban_development: "อสังหาริมทรัพย์และการพัฒนาเมือง",
	media_and_entertainment: "สื่อและบันเทิง",
	tourism_and_services: "การท่องเที่ยวและบริการ",
	society_and_community: "สังคมและชุมชน",
};

const contentCategoryMap: Record<string, string> = {
	cybersecurity: "Cybersecurity",
	frontend_development: "Frontend Development",
	backend_development: "Backend Development",
	fullstack_development: "Fullstack Development",
	food: "อาหาร",
	fashion: "แฟชั่น",
	language: "ภาษา",
}

export const getProjectTypeInThai = (type: string): string => {
	return projectTypeMap[type] || type || "";
};

export const getContentCategoryInThai = (type: string): string => {
	return contentCategoryMap[type] || type || "";
};