// / 2.点击确定,才上传+保存
// 一.更改图片，只预览不上传：
import { presetImages } from './img.js'
const creator = 'crazy-man'
let newfile = null
let selectedImageUrl = null;
let galleryVisible = false;

// 创建缩略图容器
const galleryContainer = document.createElement('div');
galleryContainer.style.display = 'none';
galleryContainer.style.gap = '10px';
galleryContainer.style.margin = '10px 0';
galleryContainer.style.padding = '10px';
galleryContainer.style.border = '1px solid #ddd';
galleryContainer.style.borderRadius = '6px';
galleryContainer.style.flexWrap = 'wrap';
galleryContainer.style.maxWidth = '600px';
document.body.insertBefore(galleryContainer, document.querySelector('#upload').nextSibling);

// 生成预设图片的缩略图
function renderPresetThumbnails() {
  galleryContainer.innerHTML = ''; // 清空容器

  // 使用预设图片数组创建缩略图
  presetImages.forEach((url, index) => {
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.alt = `预设图片 ${index + 1}`;
    thumb.style.width = '100px';
    thumb.style.height = '75px';
    thumb.style.objectFit = 'cover';
    thumb.style.cursor = 'pointer';
    thumb.style.border = '2px solid transparent';
    thumb.style.borderRadius = '4px';
    thumb.style.transition = 'all 0.2s';

    // 点击缩略图选择图片
    thumb.addEventListener('click', () => {
      selectedImageUrl = url;
      newfile = null; // 清除本地文件选择

      // 更新预览
      document.querySelector('img').src = url;
      updateBackground(url);

      // 高亮选中状态
      document.querySelectorAll('#upload + div img').forEach(i => {
        i.style.borderColor = 'transparent';
      });
      thumb.style.borderColor = '#2196F3';
    });

    thumb.addEventListener('mouseover', () => {
      thumb.style.transform = 'scale(1.05)';
    });

    thumb.addEventListener('mouseout', () => {
      thumb.style.transform = 'scale(1)';
    });

    galleryContainer.appendChild(thumb);
  });
}

// 更新背景图片
function updateBackground(url) {
  const container = document.body;
  container.style.backgroundImage = `url("${url}")`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundAttachment = "fixed";
}


document.querySelector('#upload').addEventListener('click', function () {
  // 如果是input[type="file"]，阻止默认行为
  if (this.type === 'file') {
    e.preventDefault();
  }

  // 切换画廊显示状态
  galleryVisible = !galleryVisible;
  galleryContainer.style.display = galleryVisible ? 'flex' : 'none';

  // 首次显示时渲染缩略图
  if (galleryVisible && galleryContainer.children.length === 0) {
    renderPresetThumbnails();
  }
})
// 二.保存图片
document.querySelector(".check").addEventListener('click', function () {
  // 检查是否有选中的图片
  if (!selectedImageUrl && !newfile) {
    alert('请先选择图片');
    return;
  }

  // 如果是选择的预设图片
  if (selectedImageUrl && !newfile) {
    // 直接保存预设图片URL
    document.querySelector('img').src = selectedImageUrl;
    localStorage.setItem('avatar', selectedImageUrl);
    alert('预设图片已保存');
    return;
  }
  // // 1.创建formData对象：
  // const data = new FormData()
  // data.append('avatar', newfile)
  // data.append('creator', creator)
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
