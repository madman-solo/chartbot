const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config(); // 仅本地开发时使用，部署时会被环境变量覆盖
app.use(cors())
app.use(express.json())
// 替换为你的API Key
// const apikey = `bce-v3/ALTAK-3w8FlwqtMBWeSPEJ9Ugy0/42784748a4f0d011c4401b55d81a353bd158ac4a`
const apikey = process.env.QIANFAN_API_KEY
// 千帆模型的API端点：
const apiurl = 'https://qianfan.baidubce.com/v2/chat/completions'
const requestData = {
  model: "ernie-speed-8k",
  messages: [
    {
      role: "user", content: "你好"
    }
  ],
}
// 发送请求
app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message;
    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }
    requestData.messages.push({ role: 'user', content: message });
    // 调用API
    const apires = await axios.post(apiurl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      }
    })
    // const reply = apires.data.choices[0].message.content;
    const reply = apires.data.choices[0].message.content

    // 将回复存入消息列表
    requestData.messages.push({ role: 'assistant', content: reply });
    res.send(reply);
  }
  catch (err) {
    console.log('请求处理失败', err);
    res.status(500).json({ error: '服务器错误' });
  }
})
app.listen(3400, () => {
  console.log('服务器运行在http://')
})