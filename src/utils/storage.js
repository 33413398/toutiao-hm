// 封装本地存储操作模块
// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

// 存储
export const setItem = (name, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value);
};

// 删除
export const removeItem = name => {
  window.localStorage.removeItem(name);
};