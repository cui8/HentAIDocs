import path from "node:path";
import fs from "node:fs";

// 是否是第一次
let isFirst = true;

// 文件根目录
const DIR_PATH = path.resolve();
// 黑名单：过滤不是文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
  "images",
];

// 过滤掉不是文章的文件和文件夹
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 中文数字映射
const CHINESE_NUMBERS = {
  '一': 1,
  '二': 2,
  '三': 3,
  '四': 4,
  '五': 5,
  '六': 6,
  '七': 7,
  '八': 8,
  '九': 9,
  '十': 10,
};

// 项目名称映射
let PROJECT_NAMES = {};
Object.keys(CHINESE_NUMBERS).forEach((key,index) => {
  PROJECT_NAMES[`项目${key}`] = index + 1;
});

// 映射表
const MAPPING_TABLE = {...CHINESE_NUMBERS, ...PROJECT_NAMES};

// 自定义排序函数
function chineseNumberSort(a, b) {
  const aNumber = MAPPING_TABLE[a.charAt(0)] || MAPPING_TABLE[a.substr(0,3)];
  const bNumber = MAPPING_TABLE[b.charAt(0)] || MAPPING_TABLE[b.substr(0,3)];

  if (aNumber !== undefined && bNumber !== undefined) {
    return aNumber - bNumber;
  } else {
    return a.localeCompare(b, 'zh-Hans-CN', { sensitivity: 'accent', ignorePunctuation: true });
  }
}

function generateSidebar(dirPath, pathname, isFirst = true) {
  let files = fs.readdirSync(dirPath);
  // 过滤掉不是文章的文件和文件夹
  let items = intersections(files, WHITE_LIST);
  // 对items进行排序
  items.sort(chineseNumberSort);
  // 存放结果
  const sidebar = [];

  items.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      let parts = filePath.split(path.sep);
      let dirName = parts.pop();
      sidebar.push({
        text: dirName,
        collapsed: !isFirst,
        items: generateSidebar(filePath, pathname, false)
      });
    } else if (stat.isFile() && path.extname(file) === '.md') {
      let parts = filePath.split(path.sep);
      let ddd = filePath.indexOf('docs') > -1 ? filePath.split('docs')[1] : filePath;
      ddd = ddd.replace('.md', '');
      let fileName = parts.pop().replace('.md', '');
      sidebar.push({
        text: fileName,
        link: ddd,
      });
    }
  });

  return sidebar;
}

export const set_sidebar = (pathname) => {
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  // 生成侧边栏配置
  return generateSidebar(dirPath, pathname);
};
