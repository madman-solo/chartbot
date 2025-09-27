// 事件绑定
const input = document.querySelector('.chat_input')
const sendBtn = document.querySelector('.send-btn')
const aiBox = document.querySelector('#response-box')
const userBox = document.querySelector('#input-box')
const chatBox = document.querySelector('.chat')
const ul = document.querySelector('.chat_list')
const chartname = document.querySelector('.chart_name')
const imagebox = document.querySelector('.graph-container')
function imageShow() {

  imagebox.style.position = 'fixed';
  // 距离顶部0像素
  imagebox.style.top = '0';
  // 距离右侧0像素
  imagebox.style.right = '0';
  // 可选：添加层级确保在其他内容上方
  imagebox.style.zIndex = '1000';
  // 可选：移除可能影响定位的margin/padding
  imagebox.style.margin = '0';
}
const show = async (e) => {
  try {
    if (e.key === 'Enter' || e.type === 'click') {  // 仅在按回车时发送
      const inputvalue = input.value
      // const res = await axios.post('http://127.0.0.1:3400/api/chat', {
      //   message: inputvalue
      // })
      const res = await axios.post('https://chartbot-oepeykmdyp.cn-hangzhou.fcapp.run', {
        message: inputvalue
      })
      console.log(res);
      const response = res.data
      chartname.style.display = 'none'
      chatBox.style.display = 'block'
      imageShow()
      ul.innerHTML += `
        <li class="right">
            <div class="input-box">${inputvalue}</div>
          </li>
          <li class="left">
            <div class="response-box">${response}</div>
          </li>
      `
      input.value = ''
    }

  }
  catch (err) {
    console.log('返回数据失败', err);

  }

}
input.addEventListener('keyup', function (e) {
  show(e)
})
sendBtn.addEventListener('click', function () {
  show({ type: 'click' })
})

// 请求API数据
// 渲染页面