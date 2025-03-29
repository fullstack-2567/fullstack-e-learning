import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, BookOpen , SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import ContentCard from "./contentCard";
import { Badge } from "@/components/ui/badge";

export default function ContentTable()  {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [showAllCategories, setShowAllCategories] = useState(false);
    
    const mockContents = [
        {
          "contentID": "py001",
          "contentName": "Python ใน 4 ชั่วโมง - คอร์สเรียนเต็มรูปแบบสำหรับผู้เริ่มต้น",
          "category": "การเขียนโปรแกรม",
          "contentThumbnail": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "description": "คอร์ส Python นี้ถูกออกแบบมาเพื่อผู้ที่เริ่มต้นหรือคนที่ไม่มีพื้นฐานในการเขียนโปรแกรมมาก่อน โดยมุ่งเน้นไปที่การเรียนรู้ที่เข้าใจง่ายและรวดเร็ว คุณจะได้เรียนรู้พื้นฐานของ Python โดยไม่ต้องมีประสบการณ์การเขียนโค้ดมาก่อน เริ่มต้นจากการเข้าใจพื้นฐานของตัวแปร, ประเภทข้อมูล, และวิธีการใช้ลูปในการทำงานที่ซับซ้อนมากขึ้น ซึ่งจะช่วยให้คุณพัฒนาความเข้าใจในการทำงานกับข้อมูลจำนวนมากได้เร็วขึ้นในโปรเจกต์ที่เกี่ยวข้องกับการวิเคราะห์ข้อมูล และการพัฒนาโปรแกรม นอกจากนี้ คอร์สยังรวมถึงการเรียนรู้ฟังก์ชันต่าง ๆ ที่จะช่วยให้คุณเขียนโปรแกรมที่มีโครงสร้างและสามารถทำงานได้ในระดับที่ซับซ้อนมากขึ้นในอนาคต อีกทั้งยังมีตัวอย่างและแบบฝึกหัดที่สามารถนำไปใช้ได้จริงจากโลกของการพัฒนาซอฟต์แวร์, วิทยาศาสตร์ข้อมูล และสาขาอื่นๆ ซึ่งคอร์สนี้เหมาะสมสำหรับคนที่ต้องการพัฒนาอาชีพในด้านการเขียนโปรแกรมหรือการพัฒนาซอฟต์แวร์ในเวลาที่รวดเร็วและมีประสิทธิภาพ"
        },
        {
          "contentID": "cs50",
          "contentName": "Harvard CS50 - คอร์สวิทยาการคอมพิวเตอร์เต็มรูปแบบระดับมหาวิทยาลัย",
          "category": "วิทยาการคอมพิวเตอร์",
          "contentThumbnail": "https://i.kym-cdn.com/photos/images/newsfeed/002/900/410/de2.jpg",
          "description": "CS50 คือหนึ่งในคอร์สที่มีชื่อเสียงที่สุดจาก Harvard University ที่เปิดโอกาสให้คุณสามารถสัมผัสการศึกษาวิทยาการคอมพิวเตอร์ระดับมหาวิทยาลัยได้จากที่บ้าน โดยที่ไม่จำเป็นต้องมีประสบการณ์ทางคณิตศาสตร์หรือวิทยาการคอมพิวเตอร์มาก่อน คอร์สนี้ออกแบบมาให้ผู้เรียนทุกระดับสามารถเข้าใจแนวคิดพื้นฐานที่สำคัญในวิทยาการคอมพิวเตอร์ เช่น อัลกอริธึม, โครงสร้างข้อมูล, และการจัดการทรัพยากรผ่านการใช้ภาษาโปรแกรมต่างๆ เช่น C, Python และ SQL คุณจะได้เรียนรู้ถึงการแก้ปัญหาที่ท้าทายผ่านชุดปัญหาที่ถูกออกแบบมาให้สามารถนำไปประยุกต์ใช้ในโลกจริงได้ ในส่วนของการพัฒนาเว็บ คุณจะได้เข้าใจการสร้างแอพพลิเคชันเว็บจากพื้นฐานไปจนถึงการใช้งานแบบเต็มรูปแบบ ซึ่งทำให้คุณมีความพร้อมในการเขียนโปรแกรม, การพัฒนาเว็บไซต์, และเข้าใจแนวคิดการทำงานของคอมพิวเตอร์ที่สำคัญอย่างลึกซึ้ง คุณยังจะได้เรียนรู้เกี่ยวกับการประยุกต์ใช้วิทยาการคอมพิวเตอร์ในสาขาต่างๆ เช่น วิศวกรรมซอฟต์แวร์ และเทคโนโลยีที่สำคัญในโลกปัจจุบัน"
        }
        ,
        {
          "contentID": "cs500",
          "contentName": "สอนทำกุ้งชุบแป้งทอด",
          "category": "อาหาร",
          "contentThumbnail": "https://s359.kapook.com/pagebuilder/c2b118ed-2478-4730-8228-bb58c18267fd.jpg",
          "description": "เรียนรู้เทคนิคการทำกุ้งชุบแป้งทอดให้กรอบนอกนุ่มในแบบมืออาชีพ! คอร์สนี้จะพาคุณไปตั้งแต่การเลือกวัตถุดิบคุณภาพ ทั้งกุ้งสดและส่วนผสมแป้งทอด หาความลับของสูตรแป้งกรอบอร่อยที่เก็บความชุ่มฉ่ำของกุ้งไว้ได้นาน พร้อมสาธิตวิธีการชุปแป้งและทอดให้ได้สีทองสวยได้ที่ทุกครั้งไม่ว่าคุณจะเป็นมือใหม่หรือมีประสบการณ์ในครัว คอร์สนี้จะช่วยให้คุณทำกุ้งทอดสมบูรณ์แบบ ด้วยการสอนอย่างละเอียดทุกขั้นตอน ตั้งแต่การแล่กุ้งให้สวย การผสมแป้งแบบต่าง ๆ ทั้งแป้งบางกรอบและแป้งหนานุ่ม รวมถึงเคล็ดลับการควบคุมไฟและน้ำมันเพื่อให้กุ้งสุกพอดี ไม่เละหรือแห้งเกินไปสุดท้ายนี้ คอร์สยังเพิ่มความพิเศษด้วยการแนะนำเครื่องจิ้มและเครื่องเคียงที่เข้ากันกับกุ้งทอด เช่น ซอสพริกมะขามหวาน หรือน้ำจิ้มซีฟู้ดรสเด็ด พร้อมเทคนิคการจัดเสิร์ฟให้ดูน่าทานเหมือนร้านอาหารระดับห้าดาว มาเริ่มสร้างเมนูสุดคลาสสิกที่ใครก็ต้องติดใจกันเลย!"
        },
        {
            "contentID": "cs501",
            "contentName": "สอนทำผัดไทยแบบต้นตำรับ",
            "category": "อาหาร",
            "contentThumbnail": "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            "description": "เรียนรู้การทำผัดไทยรสชาติกลมกล่อมแบบต้นตำรับ! คอร์สนี้จะสอนทุกขั้นตอน ตั้งแต่การเตรียมเส้นจันท์ คุณภาพสูง การปรุงน้ำปลาร้าสูตรพิเศษ และเทคนิคการผัดไฟแรงให้เส้นไม่ติดกระทะ พร้อมสาธิตการจัดวางหน้าผัดไทยให้สวยงามน่ารับประทาน คอร์สเหมาะสำหรับทั้งมือใหม่และคนที่อยากพัฒนาทักษะการทำอาหารไทยคลาสสิก"
          },
          {
            "contentID": "cs502",
            "contentName": "สอนทำส้มตำไทย 4 แบบ",
            "category": "อาหาร",
            "contentThumbnail": "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            "description": "มาเรียนรู้การทำส้มตำไทย 4 แบบยอดนิยม ได้แก่ ส้มตำปูปลาร้า ส้มตำไทยดั้งเดิม ส้มตำผลไม้ และส้มตำทะเล! คอร์สนี้จะสอนตั้งแต่การเลือกมะละกอที่เหมาะสม การตำเครื่องปรุงให้ได้รสชาติเปรี้ยว-เผ็ด-เค็มที่ลงตัว และเคล็ดลับการเพิ่มความอร่อยด้วยวัตถุดิบเสริม เช่น ปูม้าแห้งหรือถั่วลิสงคั่ว"
          }
        ,
        {
          "contentID": "excel01",
          "contentName": "การสอน Microsoft Excel สำหรับผู้เริ่มต้น - ครอบคลุม 6 โครงงานจริง",
          "category": "ทักษะสำนักงาน",
          "contentThumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "description": "การเรียนรู้ Microsoft Excel ผ่านคอร์สนี้จะช่วยให้คุณเชี่ยวชาญการใช้งาน Excel อย่างมีประสิทธิภาพไม่ว่าคุณจะทำงานในสายอาชีพใดก็ตาม คอร์สนี้ครอบคลุมถึงการทำงานจริงในสถานการณ์ที่พบได้ทั่วไปในสภาพแวดล้อมสำนักงาน เช่น การจัดทำงบประมาณ, การวิเคราะห์ข้อมูลยอดขาย, การจัดการสินค้าคงคลัง, การสร้างแผนภูมิ, และการสรุปข้อมูลอย่างมีประสิทธิภาพ ซึ่งจะช่วยเพิ่มประสิทธิภาพในการทำงานของคุณได้อย่างมาก คุณจะได้เรียนรู้การใช้ฟังก์ชันพื้นฐาน เช่น SUM, AVERAGE, IF, VLOOKUP และการใช้เครื่องมือที่ทันสมัยอย่างการสร้าง Pivot Tables และสูตรที่ซับซ้อนขึ้น นอกจากนี้คุณยังจะได้เรียนรู้เทคนิคต่างๆ ที่ช่วยให้การทำงานกับข้อมูลที่ซับซ้อนสามารถทำได้ง่ายขึ้น ไม่ว่าจะเป็นการจัดการข้อมูลจากหลายแหล่งที่มาหรือการจัดทำรายงานและกราฟเพื่อการนำเสนอข้อมูลอย่างมืออาชีพ คอร์สนี้ออกแบบมาให้เหมาะสำหรับผู้ที่ไม่มีประสบการณ์ในการใช้งาน Excel มาก่อน หรือผู้ที่ต้องการทบทวนการใช้เครื่องมือต่างๆ ที่อาจยังไม่เข้าใจหรือใช้งานได้เต็มที่"
        },
        {
          "contentID": "ml001",
          "contentName": "การเรียนรู้ของเครื่องสำหรับทุกคน และวิธีการใช้ TensorFlow",
          "category": "AI และการเรียนรู้ของเครื่อง",
          "contentThumbnail": "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "description": "ทำความเข้าใจโลกของปัญญาประดิษฐ์ด้วยบทนำที่เข้าถึงง่ายเกี่ยวกับการเรียนรู้ของเครื่อง คอร์สนี้อธิบายแนวคิดที่ซับซ้อนในรูปแบบง่ายๆ ครอบคลุมการเรียนรู้ภายใต้การดูแลและไม่มีการดูแล, เครือข่ายประสาทเทียม, และการเรียนรู้เชิงลึก คุณจะได้ประสบการณ์ปฏิบัติกับ TensorFlow, เฟรมเวิร์กการเรียนรู้ของเครื่องอันทรงพลังของ Google ผ่านแบบฝึกหัด ไม่จำเป็นต้องมีความรู้คณิตศาสตร์ขั้นสูง - แค่ความอยากรู้และความเต็มใจที่จะเรียนรู้เกี่ยวกับเทคโนโลยีที่เปลี่ยนแปลงโลกนี้"
        },
        {
          "contentID": "calc01",
          "contentName": "แคลคูลัสใน 12 ชั่วโมง - ทบทวนแนวคิดสำคัญของพีชคณิตและตรีโกณมิติ",
          "category": "คณิตศาสตร์",
          "contentThumbnail": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "description": "คอร์สแคลคูลัสแบบเร่งรัดนี้เริ่มต้นด้วยการทบทวนแนวคิดสำคัญของพีชคณิตและตรีโกณมิติก่อนที่จะเข้าสู่ลิมิต, อนุพันธ์, และอินทิกรัล ออกแบบมาสำหรับนักเรียนที่ต้องการทบทวนหรือเรียนรู้แบบเร่งรัด มันแบ่งแนวคิดทางคณิตศาสตร์ที่ซับซ้อนออกเป็นส่วนที่เข้าใจได้ ด้วยคำอธิบายที่ชัดเจนและตัวอย่างการทำงานมากมาย คุณจะมีความมั่นใจในการแก้ปัญหาทางแคลคูลัสและเข้าใจการประยุกต์ใช้ในโลกจริงในสาขาฟิสิกส์, วิศวกรรม, และเศรษฐศาสตร์"
        },
        {
          "contentID": "linux01",
          "contentName": "Linux สำหรับแฮ็กเกอร์จริยธรรม - เรียนรู้พื้นฐานของ Kali Linux",
          "category": "ความปลอดภัยทางไซเบอร์",
          "contentThumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "description": "เริ่มต้นการเดินทางสู่การแฮ็กอย่างมีจริยธรรมและความปลอดภัยทางไซเบอร์ด้วยคู่มือ Kali Linux นี้ เรียนรู้ทักษะ command line ที่จำเป็น, การบริหารระบบ, และเครื่องมือความปลอดภัยที่ใช้โดยมืออาชีพ คอร์สนี้ครอบคลุมการสแกนเครือข่าย, การประเมินช่องโหว่, พื้นฐานการทดสอบเจาะระบบ, และเทคนิคการป้องกัน เหมาะสำหรับผู้เชี่ยวชาญด้าน IT ที่ต้องการขยายความรู้ด้านความปลอดภัยหรือผู้เริ่มต้นที่สนใจประกอบอาชีพด้านความปลอดภัยทางไซเบอร์"
        }
      ]
      

    const categories = ["All", ...new Set(mockContents.map(content => content.category))];
    
    const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);
  
    const filteredContents = mockContents.filter(content => {
      const matchesSearch = 
        content.contentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeFilter === "All" || content.category === activeFilter;
      
      return matchesSearch && matchesCategory;
    });
  
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl font-prompt">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-prompt">Course Library</h1>
            <p className="text-gray-500 mb-4 md:mb-0 font-prompt">Discover your next learning journey</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 rounded-xl font-prompt"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <SlidersHorizontal size={18} className="mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 font-prompt">Filters:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {visibleCategories.map(category => (
              <Badge 
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 rounded-full font-prompt ${
                  activeFilter === category 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Badge>
            ))}
            
            {categories.length > 5 && (
              <button
                className="text-sm text-blue-500 hover:text-blue-700 font-prompt flex items-center ml-2"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? (
                  <>
                    <ChevronUp size={16} className="mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" />
                    Show all ({categories.length - 5} more)
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        {filteredContents.length === 0 ? (
          <div className="bg-gray-50 rounded-xl text-center p-12 mt-6">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2 font-prompt">No courses found</h3>
            <p className="text-gray-500 max-w-md mx-auto font-prompt">
              We couldn't find any courses matching your search criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4 font-prompt">Showing {filteredContents.length} of {mockContents.length} courses</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map((content) => (
                <ContentCard
                  key={content.contentID}
                  contentID={content.contentID}
                  contentName={content.contentName}
                  category={content.category}
                  contentThumbnail={content.contentThumbnail}
                  description={content.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };
  