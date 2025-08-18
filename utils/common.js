//随机获取一个颜色
export function getRandomBrightColor() {
  // 预定义8种适合白色文字的柔和颜色
  const colorArray = [
    '#3498db', // 蓝色
    '#2ecc71', // 绿色
    '#9b59b6', // 紫色
    '#e74c3c', // 红色
    '#f39c12', // 橙色
    '#1abc9c', // 青绿色
    '#3eaf7c', // 深绿色
    '#8e44ad', // 深紫色
    '#499cef', // 深蓝色
    '#dcba33', // 黄色
    '#e67e22', // 棕色
    '#16a085', // 深青色
    '#2980b9', // 深蓝色
    '#95a6b8', // 浅蓝色
  ];
  // 随机获取数组中的颜色
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}