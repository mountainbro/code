const uploadBox = document.querySelector('.upload-box'),
previewImg = uploadBox.querySelector('img'),
wrapper = document.querySelector('.wrapper'),
fileInput = uploadBox.querySelector('input'),
widthInput = document.querySelector('.width input'),
heightInput = document.querySelector('.height input'),
ratioInput = document.querySelector('.ratio input'),
qualityInput = document.querySelector('.quality input'),
downloadBtn = document.querySelector('.download-btn');

let ogImageRotio

const loadFile = (e) => {
  const file = e.target.files[0] // 获取用户选择文件
  if (!file) return // 如果用户未选择任何文件，则返回
  previewImg.classList.remove('svg-img')
  previewImg.src = URL.createObjectURL(file) //传递所选文件url到预览img url
  previewImg.addEventListener('load', () => { // 图片加载完毕
    widthInput.value = previewImg.naturalWidth
    heightInput.value = previewImg.naturalHeight
    ogImageRotio = previewImg.naturalWidth / previewImg.naturalHeight
    wrapper.classList.add('active')
  })

}
// 图片宽度发生变化时候
widthInput.addEventListener('keyup', () => {
  // 获取保持比例和不保持比例的图片高度
  const height = ratioInput.checked ? widthInput.value / ogImageRotio : widthInput.value
  heightInput.value = Math.floor(height)
})

// 图片高度发生变化时候
heightInput.addEventListener('keyup', () => {
  // 获取保持比例和不保持比例的图片宽度
  const width = ratioInput.checked ? heightInput.value / ogImageRotio : heightInput.value
  widthInput.value = Math.floor(width)
})

const resizeAndDownload = () => {
  const canvas = document.createElement('canvas')
  const a = document.createElement('a')
  const ctx = canvas.getContext('2d')

  // 压缩图片 选择压缩 压缩0.7 否则保持原尺寸
  const imgQuality = qualityInput.checked ? 0.7 : 1.0
  // 设置canvas的宽度和高度 = 设置后图片宽度和高度
  canvas.width = widthInput.value
  canvas.height = heightInput.value

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)
  // cavans data url 转 a标签
  a.href = canvas.toDataURL('image/jpeg', imgQuality)
  a.download = new Date().getTime() // 获取点击下载时间为下载文件名称
  a.click() // 执行a标签点击事件 来执行下载
}

downloadBtn.addEventListener('click', resizeAndDownload)
fileInput.addEventListener('change', loadFile)
uploadBox.addEventListener('click', () => {
  fileInput.click()
})