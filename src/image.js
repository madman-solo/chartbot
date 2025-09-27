// / 2.点击确定,才上传+保存
// 一.更改图片，只预览不上传：
const creator = 'crazy-man'
let newfile = null
document.querySelector('#upload').addEventListener('change', function () {
  // 1.获取选择的文件
  newfile = this.files[0]
  // 2.发送ajax请求：
  const url = URL.createObjectURL(newfile)
  console.log(url);

  url && (document.querySelector('img').src = url)
  if (url) {
    const container = document.body;
    container.style.backgroundImage = `url("${url}")`;
    container.style.backgroundSize = "cover"; // 图片覆盖整个容器
    container.style.backgroundPosition = "center"; // 图片居中
    container.style.backgroundRepeat = "no-repeat"; // 不重复平铺
    container.style.backgroundAttachment = "fixed"; // 背景固定，不随滚动变化
  }
})
// 二.保存图片
document.querySelector(".check").addEventListener('click', function () {
  // 1.创建formData对象：
  const data = new FormData()
  data.append('avatar', newfile)
  data.append('creator', creator)
  // 2.上传图片：
  axios({
    url: 'https://hmajax.itheima.net/api/avatar',
    method: 'put',
    data
  }).then(res => {
    console.log(res);
    const url = res.data.data.avatar
    document.querySelector('img').src = url
    // 二.保存图片
    localStorage.setItem('avatar', url)
  })
})
const url = localStorage.getItem('avatar')
url && (document.querySelector('img').src = url)
